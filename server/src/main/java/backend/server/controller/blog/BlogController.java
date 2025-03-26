package backend.server.controller.blog;

import backend.server.entity.blog.Blog;
import backend.server.service.blog.BlogService;
import lombok.RequiredArgsConstructor;
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
    public List<Blog> getAllBlogs(@RequestParam(name = "sort", required = false) String sort) {
        if (sort != null) {
            return blogService.findAllSortByPostDate();
        }
        return blogService.findAll();
    }

    @GetMapping("/blogs/{blogId}")
    public Blog getBlogById(@PathVariable UUID blogId) {
        return blogService.findById(blogId);
    }

    @DeleteMapping("/blogs/{blogId}")
    public void deleteBlogById(@PathVariable UUID blogId) {
        blogService.deleteById(blogId);
    }

    @PutMapping("/blogs")
    public void updateBlog(@RequestBody BlogRequest blogRequest) {
        blogService.createAndUpdate(blogRequest);
    }

    @PostMapping("/blogs")
    public void createBlog(@RequestParam("image") MultipartFile image, @RequestParam("userId") UUID userId, @RequestParam("content") String content, @RequestParam("blogDate") Long blogDate) {
        BlogRequest blogRequest = new BlogRequest(content, userId, blogDate, image);
        blogService.createAndUpdate(blogRequest);
    }
}
