package backend.server.controller.blog;

import backend.server.entity.blog.Blog;
import backend.server.entity.user.User;
import backend.server.service.blog.BlogService;
import backend.server.service.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BlogController {
    private final BlogService blogService;
    private final UserService userService;

    @GetMapping("/blogs")
    public ResponseEntity<List<BlogResponse>> getAllBlogs(@RequestParam(name = "sort", required = false) boolean sort) {
        if (sort) {
            return ResponseEntity.ok(blogService.findAllSortByPostDate().stream().map(BlogResponse::new).toList());
        }
        return ResponseEntity.ok(blogService.findAll().stream().map(BlogResponse::new).toList());
    }

    @GetMapping("/blogs/{blogId}")
    public ResponseEntity<BlogResponse> getBlogById(@PathVariable UUID blogId) {
        return ResponseEntity.ok(new BlogResponse(blogService.findById(blogId)));
    }

    @DeleteMapping("/blogs")
    @PreAuthorize("hasRole('ADMIN') or @blogServiceImpl.isOwner(#blogRequest.id, authentication.name)")
    public ResponseEntity<String> deleteBlogById(@Valid @RequestBody BlogRequest blogRequest) {
        blogService.deleteById(blogRequest.getId());
        return ResponseEntity.ok("Deleted blog with id " + blogRequest.getId());
    }

    @PutMapping("/blogs")
    @PreAuthorize("hasRole('ADMIN') or @blogServiceImpl.isOwner(#request.id, authentication.name)")
    public ResponseEntity<BlogResponse> updateBlog(@Valid @ModelAttribute BlogRequest request) {
        Blog blog = blogService.update(getBlogFromRequest(request));
        return ResponseEntity.ok(new BlogResponse(blog));
    }

    @PostMapping("/blogs")
    @PreAuthorize("hasRole('ADMIN') or authentication.principal.id == #request.userId")
    public ResponseEntity<BlogResponse> createBlog(@Valid @ModelAttribute BlogRequest request) {
        Blog blog = blogService.create(getBlogFromRequest(request));
        return ResponseEntity.ok(new BlogResponse(blog));
    }

    private byte[] getImageDataFromMultipartParam(MultipartFile image) {
        if (image == null) {
            return null;
        }

        try {
            return image.getBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private Blog getBlogFromRequest(BlogRequest request) {
        UUID id = request.getId();

        User user = userService.findById(request.getUserId());
        if (user == null) {
            throw new NoSuchElementException("No user with id " + request.getUserId() + " found!");
        }

        byte[] image = getImageDataFromMultipartParam(request.getImage());

        String content = request.getContent();

        if (image == null && content == null) {
            throw new IllegalArgumentException("At least blog content or image is required!");
        }

        return Blog.builder()
                .id(id)
                .user(user)
                .image(image)
                .content(content)
                .blogDate(System.currentTimeMillis())
                .build();
    }
}
