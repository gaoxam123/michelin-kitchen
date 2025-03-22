package backend.server.dao.user;

import backend.server.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);

    List<User> findAllByUsernameContainingOrFirstNameContainingOrLastNameContaining(
            String username,
            String firstName,
            String lastName
    );

    List<User> findTop10ByUsernameContainingOrFirstNameContainingOrLastNameContaining(
            String username,
            String firstName,
            String lastName
    );
}
