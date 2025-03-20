package backend.server.controller.user;

import backend.server.controller.RestException;
import backend.server.entity.user.User;
import backend.server.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping("/users/{id}")
    public User findById(@PathVariable UUID id) {
        User user = userService.findById(id);

        if (user == null) {
            throw new RestException(
                    HttpStatus.NOT_FOUND,
                    "No user with id " + id + " found!",
                    System.currentTimeMillis()
            );
        }

        return user;
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        user.setId(null);
        return userService.save(user);
    }

    @PutMapping("/users")
    public User editUser(@RequestBody User user) {
        return userService.save(user);
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable UUID id) {
        if (userService.findById(id) == null) {
            throw new RestException(
                    HttpStatus.NOT_FOUND,
                    "No user with id " + id + " found!",
                    System.currentTimeMillis()
            );
        }

        userService.deleteById(id);

        return "Deleted user with id " + id;
    }

    @PostMapping("/users/{id}/edit-profile-picture")
    public String addProfilePicture(@RequestParam MultipartFile image, @PathVariable UUID id) {
        User user = userService.findById(id);

        if (user == null) {
            throw new RestException(
                    HttpStatus.NOT_FOUND,
                    "No user with id " + id + " found!",
                    System.currentTimeMillis()
            );
        }

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
    public List<User> findByUsername(
            @RequestParam String name,
            @RequestParam(required = false) boolean less) {
        if (less) {
            return userService.findByUsernameTopTen(name);
        }
        return userService.findByUsername(name);
    }
}
