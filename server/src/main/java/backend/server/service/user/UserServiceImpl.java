package backend.server.service.user;

import backend.server.entity.user.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @PersistenceContext
    private EntityManager entityManager;

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
