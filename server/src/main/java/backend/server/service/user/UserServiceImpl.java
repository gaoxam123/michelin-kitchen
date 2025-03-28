package backend.server.service.user;

import backend.server.controller.RestException;
import backend.server.controller.user.UserRequest;
import backend.server.dao.blog.BlogRepository;
import backend.server.dao.user.UserRepository;
import backend.server.entity.user.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PersistenceContext
    private final EntityManager entityManager;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(UUID id) {
        return userRepository.findById(id).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + id + " found!",
                        System.currentTimeMillis()
                )
        );
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User update(UserRequest userRequest) {
        UUID id = userRequest.getId();
        User user = userRepository.findById(id).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + id + " found!",
                        System.currentTimeMillis()
                )
        );
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setUsername(userRequest.getUsername());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setRole(userRequest.getRole());
        user.setEmail(userRequest.getEmail());
        return userRepository.save(user);
    }

    @Override
    public void deleteById(UUID id) {
        userRepository.findById(id).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + id + " found!",
                        System.currentTimeMillis()
                )
        );
        userRepository.deleteById(id);
    }

    @Override
    public List<User> findUsers(String query) {
        return userRepository.findAllByUsernameContainingOrFirstNameContainingOrLastNameContaining(query, query, query);
    }

    @Override
    public List<User> findUsersTopTen(String query) {
        return userRepository.findTop10ByUsernameContainingOrFirstNameContainingOrLastNameContaining(query, query, query);
    }

    @Override
    public List<User> findUsersCommentedOnBlogByBlogId(UUID blogId) {
        String query = "SELECT DISTINCT c.user FROM Comment c WHERE c.blog.id = :blogId";
        return entityManager.createQuery(query, User.class)
                            .setParameter("blogId", blogId)
                            .getResultList();
    }

    @Override
    public List<User> findUsersLikedByBlogId(UUID blogId) {
        String query = "SELECT DISTINCT l.user FROM Like l WHERE l.blog = :blogId";
        return entityManager.createQuery(query, User.class)
                .setParameter("blogId", blogId)
                .getResultList();
    }
}
