package backend.server.dao.like;

import backend.server.entity.like.Like;
import backend.server.entity.like.LikeId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, LikeId> {
}
