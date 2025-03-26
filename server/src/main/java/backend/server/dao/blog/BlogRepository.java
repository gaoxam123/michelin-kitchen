package backend.server.dao.blog;

import backend.server.entity.blog.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BlogRepository extends JpaRepository<Blog, UUID> {
    List<Blog> findBlogsByUserId(UUID userId);
}
