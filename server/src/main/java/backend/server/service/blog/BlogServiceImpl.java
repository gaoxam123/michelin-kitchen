package backend.server.service.blog;

import backend.server.controller.RestException;
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

import java.util.*;

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

        blogRepository.deleteById(id);
    }

    @Override
    public Blog create(Blog blog) {
        blog = blogRepository.save(blog);

        User user = blog.getUser();
        // notify users who follow the blog owner
        List<User> followers = user.getFollowers()
                .stream()
                .map(Follow::getFollower)
                .toList();
        for (User u : followers) {
            String subject = "New blog from " + user.getUsername();
            String blogUrl = "http://localhost:8080/api/blogs/" + blog.getId();
            String body = user.getUsername() + " just posted a new blog, check it out! " + blogUrl;
            emailService.sendGeneralEmail(u.getEmail(), subject, body);
        }
        return blog;
    }

    @Override
    public Blog update(Blog blog) {
        String newContent = blog.getContent();
        byte[] newImage = blog.getImage();

        // method findById already threw an error
        blog = findById(blog.getId());

        boolean authorized = blog.getUser().getUsername().equals(
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName()
        );

        if (!authorized) {
            throw new RestException(
                    HttpStatus.UNAUTHORIZED,
                    "Unauthorized to edit blog with id " + blog.getId(),
                    System.currentTimeMillis()
            );
        }

        blog.setContent(newContent);
        blog.setImage(newImage);

        return blogRepository.save(blog);
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
