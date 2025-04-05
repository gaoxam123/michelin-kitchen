package backend.server.service.user;

import backend.server.controller.RestException;
import backend.server.controller.user.UserRequest;
import backend.server.dao.user.UserRepository;
import backend.server.entity.user.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

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
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with username " + username + " found!",
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
        User user = findById(id);

        boolean authorized = user
                .getUsername()
                .equals(
                        SecurityContextHolder
                                .getContext()
                                .getAuthentication()
                                .getName()
                );
        if (!authorized) {
            throw new RestException(
                    HttpStatus.UNAUTHORIZED,
                    "Unauthorized to update user with id " + id,
                    System.currentTimeMillis()
            );
        }

        if (userRequest.isPasswordIsChanged()) {
            if (!userRequest.validOldPassword() || !userRequest.validNewPassword()) {
                throw new RestException(
                        HttpStatus.BAD_REQUEST,
                        "Credentials invalid",
                        System.currentTimeMillis()
                );
            }

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userRequest.getUsername(),
                            userRequest.getOldPassword()
                    )
            );
            user.setPassword(passwordEncoder.encode(userRequest.getNewPassword()));
        }

        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setUsername(userRequest.getUsername());
        user.setEmail(userRequest.getEmail());

        return userRepository.save(user);
    }

    @Override
    public void deleteById(UUID id) {
        User user = findById(id);

        boolean authorized = user.getUsername().equals(SecurityContextHolder.getContext().getAuthentication().getName())
                || SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"));
        if (!authorized) {
            throw new RestException(
                    HttpStatus.UNAUTHORIZED,
                    "Unauthorized to delete user with id " + id,
                    System.currentTimeMillis()
            );
        }

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
        String query = "SELECT DISTINCT l.user FROM Like l WHERE l.blog.id = :blogId";
        return entityManager.createQuery(query, User.class)
                .setParameter("blogId", blogId)
                .getResultList();
    }

    @Override
    public List<User> findFollowedByUserId(UUID userId) {
        String query = "SELECT f.followed FROM Follow f WHERE f.follower.id = :userId";
        return entityManager
                .createQuery(query, User.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    @Override
    public List<User> findFollowersByUserId(UUID userId) {
        String query = "SELECT f.follower FROM Follow f WHERE f.followed.id = :userId";
        return entityManager
                .createQuery(query, User.class)
                .setParameter("userId", userId)
                .getResultList();
    }
}
