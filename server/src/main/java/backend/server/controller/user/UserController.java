package backend.server.controller.user;

import backend.server.controller.RestException;
import backend.server.controller.blog.BlogResponse;
import backend.server.entity.blog.Blog;
import backend.server.entity.user.User;
import backend.server.service.blog.BlogService;
import backend.server.service.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final BlogService blogService;

    private List<UserResponse> convertUserList(List<User> users) {
        return users.stream().map(r -> new UserResponse(r.getId(), r.getRole(), r.getEmail(), r.getFirstName(), r.getLastName(), r.getUsername())).toList();
    }

    private UserResponse convertUser(User user) {
        return new UserResponse(user.getId(), user.getRole(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getUsername());
    }

    private List<BlogResponse> convertBlogList(List<Blog> blogs) {
        // TODO: convert image from string to multipart
        return blogs.stream().map(b -> new BlogResponse()).toList();
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> findAll() {
        return new ResponseEntity<>(convertUserList(userService.findAll()), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponse> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(convertUser(userService.findById(id)));
    }

    @GetMapping("/users/{id}/blogs")
    public ResponseEntity<List<BlogResponse>> findAllBlogs(@PathVariable UUID id, @RequestParam(name = "sort", required = false) String sort, @RequestParam(name = "like", required = false) String like) {
        if (like != null) {
            return ResponseEntity.ok(convertBlogList(blogService.findBlogsLikedByUserId(id)));
        }
        if (sort != null) {
            return ResponseEntity.ok(convertBlogList(blogService.findBlogsByUserIdSortByPostDate(id)));
        }
        return ResponseEntity.ok(convertBlogList(blogService.findBlogsByUserId(id)));
    }

    @PutMapping("/users")
    @PreAuthorize("hasRole('ADMIN') or authentication.principal.id == #userRequest.id")
    public ResponseEntity<UserResponse> editUser(@Valid @RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(convertUser(userService.update(userRequest)));
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN') or authentication.principal.id == #id")
    public ResponseEntity<String> deleteUser(@PathVariable UUID id) {
        userService.deleteById(id);
        return ResponseEntity.ok("Deleted user with id " + id);
    }

    @PostMapping("/users/{id}/edit-profile-picture")
    @PreAuthorize("hasRole('ADMIN') or authentication.principal.id == id")
    public ResponseEntity<String> editProfilePicture(@RequestParam MultipartFile image, @PathVariable UUID id) {
        User user = userService.findById(id);

        try {
            user.setImageName(image.getName());
            user.setImage(Base64.getEncoder()
                    .encodeToString(image.getBytes()));
            user.setImageType(image.getContentType());

            userService.save(user);

            return ResponseEntity.ok("Profile picture updated!");
        } catch (IOException e) {
            throw new RestException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    e.getMessage(),
                    System.currentTimeMillis()
            );
        }
    }

    @GetMapping("/users/search")
    public ResponseEntity<List<UserResponse>> searchUsers(
            @RequestParam String q,
            @RequestParam(required = false) boolean less) {
        if (less) {
            return ResponseEntity.ok(convertUserList(userService.findUsersTopTen(q)));
        }
        return ResponseEntity.ok(convertUserList(userService.findUsers(q)));
    }
}
