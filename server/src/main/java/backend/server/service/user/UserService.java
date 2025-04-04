package backend.server.service.user;

import backend.server.controller.user.UserRequest;
import backend.server.entity.user.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<User> findAll();

    User findById(UUID id);

    User findByUsername(String username);

    User save(User user);

    User update(UserRequest userRequest);

    void deleteById(UUID id);

    List<User> findUsers(String query);

    List<User> findUsersTopTen(String query);

    List<User> findUsersCommentedOnBlogByBlogId(UUID blogId);

    List<User> findUsersLikedByBlogId(UUID blogId);

    List<User> findFollowedByUserId(UUID userId);
}
