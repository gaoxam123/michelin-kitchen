package backend.server.controller.blog;

import backend.server.entity.blog.Blog;
import backend.server.service.blog.BlogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    private List<BlogResponse> convertBlogList(List<Blog> blogs) {
        // TODO: convert image from string to multipart
        return blogs.stream().map(b -> new BlogResponse()).toList();
    }

    private BlogResponse convertBlog(Blog blog) {
        // TODO: convert image from string to multipart
        return new BlogResponse();
    }

    @GetMapping("/blogs")
    public ResponseEntity<List<BlogResponse>> getAllBlogs(@RequestParam(name = "sort", required = false) boolean sort) {
        if (sort) {
            return ResponseEntity.ok(convertBlogList(blogService.findAllSortByPostDate()));
        }
        return ResponseEntity.ok(convertBlogList(blogService.findAll()));
    }

    @GetMapping("/blogs/{blogId}")
    public ResponseEntity<BlogResponse> getBlogById(@PathVariable UUID blogId) {
        return ResponseEntity.ok(convertBlog(blogService.findById(blogId)));
    }

    @DeleteMapping("/blogs")
    @PreAuthorize("hasRole('ADMIN') or @blogServiceImpl.isOwner(#blogRequest.id, authentication.name)")
    public ResponseEntity<String> deleteBlogById(@Valid @RequestBody BlogRequest blogRequest) {
        blogService.deleteById(blogRequest.getId());
        return ResponseEntity.ok("Deleted blog with id " + blogRequest.getId());
    }

    @PutMapping("/blogs")
    @PreAuthorize("hasRole('ADMIN') or @blogServiceImpl.isOwner(#blogRequest.id, authentication.name)")
    public ResponseEntity<BlogResponse> updateBlog(@Valid @RequestBody BlogRequest blogRequest) {
        Blog blog = blogService.update(blogRequest);
        return ResponseEntity.ok(new BlogResponse(blog.getId(), blog.getUser().getId(), blog.getContent(), blog.getBlogDate(), blogRequest.getImage()));
    }

    @PostMapping("/blogs")
    public ResponseEntity<BlogResponse> createBlog(@RequestParam("image") MultipartFile image, @RequestParam("userId") UUID userId, @RequestParam("content") String content, @RequestParam("blogDate") Long blogDate, @RequestParam("id") UUID id) {
        BlogRequest blogRequest = new BlogRequest(content, userId, id, blogDate, image);
        Blog blog = blogService.create(blogRequest);
        return ResponseEntity.ok(new BlogResponse(blog.getId(), blog.getUser().getId(), blog.getContent(), blog.getBlogDate(), blogRequest.getImage()));
    }
}
