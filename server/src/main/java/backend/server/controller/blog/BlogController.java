package backend.server.controller.blog;

import backend.server.entity.blog.Blog;
import backend.server.service.blog.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api")
@RequiredArgsConstructor
public class BlogController {
    private final BlogService blogService;

    @GetMapping("/blogs")
    public List<Blog> getAllBlogs(@RequestParam(name = "sort", required = false) boolean sort) {
        if (sort) {
            return blogService.findAllSortByPostDate();
        }
        return blogService.findAll();
    }

    @GetMapping("/blogs/{blogId}")
    public Blog getBlogById(@PathVariable UUID blogId) {
        return blogService.findById(blogId);
    }

    @DeleteMapping("/blogs")
    @PreAuthorize("hasRole('ADMIN') or @blogServiceImpl.isOwner(#blogRequest.id, authentication.name)")
    public void deleteBlogById(@RequestBody BlogRequest blogRequest) {
        blogService.deleteById(blogRequest.getId());
    }

    @PutMapping("/blogs")
    @PreAuthorize("hasRole('ADMIN') or @blogServiceImpl.isOwner(#blogRequest.id, authentication.name)")
    public void updateBlog(@RequestBody BlogRequest blogRequest) {
        blogService.update(blogRequest);
    }

    @PostMapping("/blogs")
    public void createBlog(@RequestParam("image") MultipartFile image, @RequestParam("userId") UUID userId, @RequestParam("content") String content, @RequestParam("blogDate") Long blogDate, @RequestParam("id") UUID id) {
        BlogRequest blogRequest = new BlogRequest(content, userId, id, blogDate, image);
        blogService.create(blogRequest);
    }
}
