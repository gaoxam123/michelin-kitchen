package backend.server.controller.user;

import backend.server.entity.user.User;
import backend.server.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/search")
    public List<User> findByUsername(@RequestParam String name, @RequestParam(required = false) boolean less) {
        if (less) {
            return userService.findByUsernameTopTen(name);
        }
        return userService.findByUsername(name);
    }
}
