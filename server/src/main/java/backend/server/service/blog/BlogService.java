package backend.server.service.blog;

import backend.server.controller.blog.BlogRequest;
import backend.server.entity.blog.Blog;

import java.util.List;
import java.util.UUID;

public interface BlogService {
    List<Blog> findAll();

    List<Blog> findBlogsByUserId(UUID userId);

    List<Blog> findAllSortByPostDate();

    List<Blog> findBlogsByUserIdSortByPostDate(UUID userId);

    Blog findById(UUID id);

    void deleteById(UUID id);

    void save(Blog blog);

    void createAndUpdate(BlogRequest blogRequest);
}
