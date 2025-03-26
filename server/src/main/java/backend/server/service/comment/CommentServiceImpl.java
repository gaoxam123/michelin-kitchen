package backend.server.service.comment;

import backend.server.controller.RestException;
import backend.server.controller.comment.CommentRequest;
import backend.server.dao.blog.BlogRepository;
import backend.server.dao.comment.CommentRepository;
import backend.server.dao.user.UserRepository;
import backend.server.entity.blog.Blog;
import backend.server.entity.comment.Comment;
import backend.server.entity.comment.CommentId;
import backend.server.entity.user.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Comment> getAllCommentsByBlogId(UUID blogId) {
        String query = "SELECT c FROM Comment c WHERE c.blog.id = :blogId";
        return entityManager.createQuery(query, Comment.class)
                            .setParameter("blogId", blogId)
                            .getResultList();
    }

    @Override
    public List<Comment> get10CommentsByBlogId(UUID userId) {
        String query = "SELECT c FROM Comment c WHERE c.blog.id = :blogId ORDER BY c.commentDate DESC";
        return entityManager
                .createQuery(query, Comment.class)
                .setParameter("blogId", userId)
                .getResultList()
                .stream()
                .limit(10)
                .toList();
    }

    @Override
    public void createAndUpdateComment(CommentRequest commentRequest, boolean create) {
        UUID userId = commentRequest.getUserId();
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + userId + " found!",
                        System.currentTimeMillis()
                )
        );
        UUID blogId = commentRequest.getBlogId();
        Blog blog = blogRepository.findById(blogId).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No blog with id " + blogId + " found!",
                        System.currentTimeMillis()
                )
        );
        CommentId commentId = new CommentId(userId, blogId);
        Comment comment = Comment
                .builder()
                .user(user)
                .blog(blog)
                .content(commentRequest.getContent())
                .commentDate(commentRequest.getCommentDate())
                .id(commentId)
                .build();
        if (!create) {
            comment.setId(commentId);
            List<Comment> blogComments = new ArrayList<>(blog.getComments().stream().filter(c -> !c.getId().equals(commentId)).toList());
            blogComments.add(comment);
            blog.setComments(blogComments);

            List<Comment> userComments = new ArrayList<>(user.getComments().stream().filter(c -> !c.getId().equals(commentId)).toList());
            userComments.add(comment);
            user.setComments(userComments);
        }
        else {
            blog.getComments().add(comment);
            user.getComments().add(comment);
        }
        commentRepository.save(comment);
    }

    @Override
    public void deleteCommentById(CommentId commentId) {
        commentRepository.findById(commentId).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + commentId + " found!",
                        System.currentTimeMillis()
                )
        );
        UUID blogId = commentId.getBlogId();
        Blog blog = blogRepository.findById(blogId).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No blog with id " + blogId + " found!",
                        System.currentTimeMillis()
                )
        );
        UUID userId = commentId.getUserId();
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + userId + " found!",
                        System.currentTimeMillis()
                )
        );
        List<Comment> blogComments = new ArrayList<>(blog.getComments().stream().filter(c -> !c.getId().equals(commentId)).toList());
        List<Comment> userComments = new ArrayList<>(user.getComments().stream().filter(c -> !c.getId().equals(commentId)).toList());
        blog.setComments(blogComments);
        user.setComments(userComments);
        commentRepository.deleteById(commentId);
    }
}
