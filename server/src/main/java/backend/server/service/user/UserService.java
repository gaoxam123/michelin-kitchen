package backend.server.service.user;

import backend.server.entity.user.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<User> findAll();

    User findById(UUID id);

    User save(User user);

    void deleteById(UUID id);

    List<User> findByUsername(String name);

    List<User> findByUsernameTopTen(String name);
}
