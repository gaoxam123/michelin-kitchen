package backend.server.service.blog;

import backend.server.controller.RestException;
import backend.server.controller.blog.BlogRequest;
import backend.server.dao.blog.BlogRepository;
import backend.server.dao.user.UserRepository;
import backend.server.entity.blog.Blog;
import backend.server.entity.user.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

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
                        "No user with id " + id + " found!",
                        System.currentTimeMillis()
                )
        );
    }

    @Override
    public void deleteById(UUID id) {
        blogRepository.findById(id).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + id + " found!",
                        System.currentTimeMillis()
                )
        );
        blogRepository.deleteById(id);
    }

    @Override
    public void save(Blog blog) {
        blogRepository.save(blog);
    }

    @Override
    public void createAndUpdate(BlogRequest blogRequest) {
        UUID userId = blogRequest.getUserId();
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + userId + " found!",
                        System.currentTimeMillis()
                )
        );
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

            blogRepository.save(blog);
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
        userRepository.findById(userId).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + userId + " found!",
                        System.currentTimeMillis()
                )
        );
        return blogRepository.findBlogsByUserId(userId);
    }

    @Override
    public List<Blog> findAllSortByPostDate() {
        String query = "SELECT b from Blog b ORDER BY b.blogDate DESC";
        return entityManager.createQuery(query, Blog.class).getResultList();
    }

    @Override
    public List<Blog> findBlogsByUserIdSortByPostDate(UUID userId) {
        String query = "SELECT b from Blog b WHERE b.user.id = :userId ORDER BY b.blogDate DESC";
        return entityManager.createQuery(query, Blog.class).setParameter("userId", userId).getResultList();
    }
}
