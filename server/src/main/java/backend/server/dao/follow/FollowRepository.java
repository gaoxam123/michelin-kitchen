package backend.server.dao.follow;

import backend.server.entity.follow.Follow;
import backend.server.entity.follow.FollowId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, FollowId> {
}
