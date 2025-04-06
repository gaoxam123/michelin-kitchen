package backend.server.controller.blog;

import backend.server.entity.blog.Blog;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class BlogResponse {
    private UUID id;
    private UUID userId;
    private String content;
    private Long blogDate;

    public BlogResponse(Blog blog) {
        id = blog.getId();
        userId = blog.getUser().getId();
        content = blog.getContent();
        blogDate = blog.getBlogDate();
    }
}
