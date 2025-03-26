package backend.server.service.user;

import backend.server.controller.RestException;
import backend.server.controller.user.UserRequest;
import backend.server.dao.user.UserRepository;
import backend.server.entity.user.User;
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
}
