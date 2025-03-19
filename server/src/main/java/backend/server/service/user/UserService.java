package backend.server.service.user;

import backend.server.entity.user.User;

import java.util.List;

public interface UserService {
    List<User> findByUsername(String name);
    List<User> findByUsernameTopTen(String name);
}
