package backend.server.service.blog;

import backend.server.controller.RestException;
import backend.server.controller.blog.BlogRequest;
import backend.server.dao.blog.BlogRepository;
import backend.server.entity.blog.Blog;
import backend.server.entity.follow.Follow;
import backend.server.entity.user.User;
import backend.server.service.email.EmailService;
import backend.server.service.user.UserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {
    private final BlogRepository blogRepository;
    private final EmailService emailService;
    private final UserService userService;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Blog> findAll() {
        return blogRepository.findAll();
    }

    @Override
    public Blog findById(UUID id) {
        return blogRepository.findById(id).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No blog with id " + id + " found!",
                        System.currentTimeMillis()
                )
        );
    }

    @Override
    public void deleteById(UUID id) {
        Blog blog = blogRepository.findById(id).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No blog with id " + id + " found!",
                        System.currentTimeMillis()
                )
        );
        User user = userService.findById(blog.getUser().getId());
        // update blog list of user after deleting
        List<Blog> updatedBlogList = new ArrayList<>(user.getBlogs().stream().filter(b -> !b.getId().equals(id)).toList());
        user.setBlogs(updatedBlogList);
        blogRepository.deleteById(id);
    }

    @Override
    public void createAndUpdate(BlogRequest blogRequest, boolean create) {
        UUID userId = blogRequest.getUserId();
        User user = userService.findById(userId);
        Blog blog = Blog
                .builder()
                .user(user)
                .content(blogRequest.getContent())
                .blogDate(blogRequest.getBlogDate())
                .build();
        try {
            MultipartFile image = blogRequest.getImage();
            blog.setImageName(image.getName());
            blog.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
            blog.setImageType(image.getContentType());

            if (!create) {
                // set old id if updating and modify existing blog
                blog.setId(blogRequest.getId());
                List<Blog> updatedBlogList = new ArrayList<>(user.getBlogs().stream().filter(b -> !b.getId().equals(blogRequest.getId())).toList());
                updatedBlogList.add(blog);
                user.setBlogs(updatedBlogList);

                blogRepository.save(blog);
            }
            else {
                // add new blog
                UUID blogId = blogRepository.save(blog).getId();
                blog.setId(blogId);
                user.getBlogs().add(blog);

                // notify users who follow the blog owner
                List<User> followers = user.getFollowers().stream().map(Follow::getFollower).toList();
                for (User u : followers) {
                    String subject = "New blog from " + user.getUsername();
                    String blogUrl = "http://localhost:8080/api/blogs/" + blogId;
                    String body = user.getUsername() + " just posted a new blog, check it out! " + blogUrl;
                    emailService.sendGeneralEmail(u.getEmail(), subject, body);
                }
            }
        }
        catch (IOException e) {
            throw new RestException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    e.getMessage(),
                    System.currentTimeMillis()
            );
        }
    }

    @Override
    public List<Blog> findBlogsByUserId(UUID userId) {
        userService.findById(userId);
        return blogRepository.findBlogsByUserId(userId);
    }

    @Override
    public List<Blog> findAllSortByPostDate() {
        String query = "SELECT b from Blog b ORDER BY b.blogDate DESC";
        return entityManager.createQuery(query, Blog.class)
                            .getResultList();
    }

    @Override
    public List<Blog> findBlogsByUserIdSortByPostDate(UUID userId) {
        String query = "SELECT b from Blog b WHERE b.user.id = :userId ORDER BY b.blogDate DESC";
        return entityManager.createQuery(query, Blog.class)
                            .setParameter("userId", userId)
                            .getResultList();
    }

    @Override
    public List<Blog> findBlogsLikedByUserId(UUID userId) {
        String query = "SELECT b from Blog b JOIN b.likes l WHERE l.user.id = :userId ORDER BY b.blogDate DESC";
        return entityManager.createQuery(query, Blog.class)
                            .setParameter("userId", userId)
                            .getResultList();
    }
}
