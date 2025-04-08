package backend.server.controller.user;

import backend.server.controller.RestException;
import backend.server.controller.blog.BlogResponse;
import backend.server.entity.blog.Blog;
import backend.server.entity.user.User;
import backend.server.service.blog.BlogService;
import backend.server.service.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final BlogService blogService;


    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> findAll() {
        return new ResponseEntity<>(userService.findAll().stream().map(UserResponse::new).toList(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponse> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(new UserResponse(userService.findById(id)));
    }

    @GetMapping("/users/{id}/blogs")
    public ResponseEntity<List<BlogResponse>> findAllBlogs(@PathVariable UUID id, @RequestParam(name = "sort", required = false) String sort, @RequestParam(name = "like", required = false) String like) {
        if (like != null) {
            return ResponseEntity.ok(blogService.findBlogsLikedByUserId(id).stream().map(BlogResponse::new).toList());
        }
        if (sort != null) {
            return ResponseEntity.ok(blogService.findBlogsByUserIdSortByPostDate(id).stream().map(BlogResponse::new).toList());
        }
        return ResponseEntity.ok(blogService.findBlogsByUserId(id).stream().map(BlogResponse::new).toList());
    }

    @GetMapping("/users/auth-me")
    public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(new UserResponse(userService.findByUsername(username)));
    }

    @PutMapping("/users")
    @PreAuthorize("hasRole('ADMIN') or authentication.principal.id == #userRequest.id")
    public ResponseEntity<UserResponse> editUser(@Valid @RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(new UserResponse(userService.update(userRequest)));
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN') or authentication.principal.id == #id")
    public ResponseEntity<String> deleteUser(@PathVariable UUID id) {
        userService.deleteById(id);
        return ResponseEntity.ok("Deleted user with id " + id);
    }

    @GetMapping("/profile-picture/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable UUID id) {
        User user = userService.findById(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(user.getImage(), headers, HttpStatus.OK);
    }

    @PostMapping("/users/{id}/edit-profile-picture")
    @PreAuthorize("hasRole('ADMIN') or authentication.principal.id == #id")
    public ResponseEntity<String> editProfilePicture(@RequestParam MultipartFile image, @PathVariable UUID id) {
        User user = userService.findById(id);

        try {
            user.setImage(image.getBytes());

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
            return ResponseEntity.ok(userService.findUsersTopTen(q).stream().map(UserResponse::new).toList());
        }
        return ResponseEntity.ok(userService.findUsers(q).stream().map(UserResponse::new).toList());
    }

    @GetMapping("/users/{id}/followed")
    public ResponseEntity<List<UserResponse>> getFollowedByUserId(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.findFollowedByUserId(id).stream().map(UserResponse::new).toList());
    }

    @GetMapping("/users/{id}/followers")
    public ResponseEntity<List<UserResponse>> getFollowersByUserId(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.findFollowersByUserId(id).stream().map(UserResponse::new).toList());
    }

    @GetMapping("/blogs/{id}/likes")
    public ResponseEntity<List<UserResponse>> getLikesByBlogId(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.findUsersLikedByBlogId(id).stream().map(UserResponse::new).toList());
    }
}
