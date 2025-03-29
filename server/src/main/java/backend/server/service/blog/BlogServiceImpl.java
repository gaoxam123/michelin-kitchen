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
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
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
        Blog blog = findById(id);

        User user = userService.findById(blog.getUser().getId());
        boolean authorized = user.getUsername().equals(SecurityContextHolder.getContext().getAuthentication().getName())
                || SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"));
        if (!authorized) {
            throw new RestException(
                    HttpStatus.UNAUTHORIZED,
                    "Unauthorized to delete blog with id " + id,
                    System.currentTimeMillis()
            );
        }
        // update blog list of user after deleting
        List<Blog> updatedBlogList = new ArrayList<>(user.getBlogs().stream().filter(b -> !b.getId().equals(id)).toList());
        user.setBlogs(updatedBlogList);

        blogRepository.deleteById(id);
    }

    @Override
    public Blog create(BlogRequest blogRequest) {
        UUID userId = blogRequest.getUserId();
        User user = userService.findById(userId);

        if (blogRequest.getBlogDate() == null) {
            throw new RestException(
                    HttpStatus.BAD_REQUEST,
                    "No blog date found",
                    System.currentTimeMillis()
            );
        }

        Blog blog = Blog
                .builder()
                .user(user)
                .content(blogRequest.getContent())
                .blogDate(blogRequest.getBlogDate())
                .build();

        try {
            if (blog.getImage() != null) {
                MultipartFile image = blogRequest.getImage();
                blog.setImageName(image.getName());
                blog.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
                blog.setImageType(image.getContentType());
            }

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
            return blog;
        } catch (IOException e) {
            throw new RestException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    e.getMessage(),
                    System.currentTimeMillis()
            );
        }
    }

    @Override
    public Blog update(BlogRequest blogRequest) {
        Blog blog = findById(blogRequest.getId());
        blog.setContent(blogRequest.getContent());

        UUID userId = blogRequest.getUserId();
        User user = userService.findById(userId);

        boolean authorized = user.getUsername().equals(SecurityContextHolder.getContext().getAuthentication().getName());
        if (!authorized) {
            throw new RestException(
                    HttpStatus.UNAUTHORIZED,
                    "Unauthorized to edit blog with id " + blog.getId(),
                    System.currentTimeMillis()
            );
        }

        try {
            if (blog.getImage() != null) {
                MultipartFile image = blogRequest.getImage();
                blog.setImageName(image.getName());
                blog.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
                blog.setImageType(image.getContentType());
            }

            // set old id if updating and modify existing blog
            List<Blog> updatedBlogList = new ArrayList<>(user.getBlogs().stream().filter(b -> !b.getId().equals(blogRequest.getId())).toList());
            updatedBlogList.add(blog);
            user.setBlogs(updatedBlogList);

            return blogRepository.save(blog);

        } catch (IOException e) {
            throw new RestException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    e.getMessage(),
                    System.currentTimeMillis()
            );
        }
    }

    @Override
    public boolean isOwner(UUID blogId, String username) {
        return blogRepository.findById(blogId)
                             .map(blog -> blog.getUser().getUsername().equals(username))
                             .orElse(false);
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
