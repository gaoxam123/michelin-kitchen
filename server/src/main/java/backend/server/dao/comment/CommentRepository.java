package backend.server.dao.comment;

import backend.server.entity.comment.Comment;
import backend.server.entity.comment.CommentId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, CommentId> {
}
