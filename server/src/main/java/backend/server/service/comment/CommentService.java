package backend.server.service.comment;

import backend.server.controller.comment.CommentRequest;
import backend.server.entity.comment.Comment;
import backend.server.entity.comment.CommentId;

import java.util.List;
import java.util.UUID;

public interface CommentService {
    List<Comment> getAllCommentsByBlogId(UUID blogId);

    List<Comment> get10CommentsByBlogId(UUID userId);

    Comment findById(CommentId id);

    Comment create(Comment comment);

    Comment update(Comment comment);

    void deleteCommentById(CommentId commentId);

    boolean isOwner(UUID userId, UUID blogId, Long commentDate, String username);
}
