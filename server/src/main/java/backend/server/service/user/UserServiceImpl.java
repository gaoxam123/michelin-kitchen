package backend.server.service.user;

import backend.server.dao.user.UserRepository;
import backend.server.entity.user.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(UUID id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteById(UUID id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> findByUsername(String name) {
        return entityManager.createQuery(
                        "SELECT u FROM User u WHERE u.username LIKE :name"
                ).setParameter("name", "%" + name + "%")
                .getResultList();
    }

    @Override
    public List<User> findByUsernameTopTen(String name) {
        return entityManager.createQuery(
                        "SELECT u FROM User u WHERE u.username LIKE :name"
                ).setParameter("name", "%" + name + "%")
                .setMaxResults(10)
                .getResultList();
    }

}
