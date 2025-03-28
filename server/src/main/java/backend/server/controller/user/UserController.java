package backend.server.controller.user;

import backend.server.controller.RestException;
import backend.server.entity.blog.Blog;
import backend.server.entity.user.User;
import backend.server.service.blog.BlogService;
import backend.server.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @GetMapping("/users")
    public List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping("/users/{id}")
    public User findById(@PathVariable UUID id) {
        return userService.findById(id);
    }

    @GetMapping("/users/{id}/blogs")
    public List<Blog> findAllBlogs(@PathVariable UUID id, @RequestParam(name = "sort", required = false) String sort, @RequestParam(name = "like", required = false) String like) {
        if (like != null) {
            return blogService.findBlogsLikedByUserId(id);
        }
        if (sort != null) {
            return blogService.findBlogsByUserIdSortByPostDate(id);
        }
        return blogService.findBlogsByUserId(id);
    }

    @PutMapping("/users")
    public User editUser(@RequestBody UserRequest userRequest) {
        return userService.update(userRequest);
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable UUID id) {
        userService.deleteById(id);

        return "Deleted user with id " + id;
    }

    @PostMapping("/users/{id}/edit-profile-picture")
    public String editProfilePicture(@RequestParam MultipartFile image, @PathVariable UUID id) {
        User user = userService.findById(id);

        try {
            user.setImageName(image.getName());
            user.setImage(Base64.getEncoder()
                    .encodeToString(image.getBytes()));
            user.setImageType(image.getContentType());

            userService.save(user);

            return "Profile picture updated!";
        } catch (IOException e) {
            throw new RestException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    e.getMessage(),
                    System.currentTimeMillis()
            );
        }
    }

    @GetMapping("/users/search")
    public List<User> searchUsers(
            @RequestParam String q,
            @RequestParam(required = false) boolean less) {
        if (less) {
            return userService.findUsersTopTen(q);
        }
        return userService.findUsers(q);
    }
}
