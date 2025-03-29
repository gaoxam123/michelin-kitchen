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
import backend.server.service.blog.BlogService;
import backend.server.service.email.EmailService;
import backend.server.service.user.UserService;
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
    private final BlogService blogService;
    private final EmailService emailService;
    private final UserService userService;

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
        User user = userService.findById(userId);
        UUID blogId = commentRequest.getBlogId();
        Blog blog = blogService.findById(blogId);
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

            // notify users who commented on or own the blog
            String subjectForOwner = blog.getUser().getUsername() + " commented on your blog";
            String blogUrl = "http://localhost:8080/api/blogs/" + blog.getId();
            String body = "Check it out at " + blogUrl;

            if (!user.getId().equals(blog.getUser().getId())) {
                // no email when comment on owned blogs
                emailService.sendGeneralEmail(blog.getUser().getEmail(), subjectForOwner, body);
            }

            String subjectForOthers = blog.getUser().getUsername() + " commented on the blog that you are interested in";
            List<User> others = userService
                    .findUsersCommentedOnBlogByBlogId(blogId)
                    .stream()
                    .filter(u -> !u.getId().equals(userId))
                    .toList();
            for (User other : others) {
                emailService.sendGeneralEmail(blog.getUser().getEmail(), subjectForOthers, body);
            }
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
        Blog blog = blogService.findById(blogId);
        UUID userId = commentId.getUserId();
        User user = userService.findById(userId);
        List<Comment> blogComments = new ArrayList<>(blog.getComments().stream().filter(c -> !c.getId().equals(commentId)).toList());
        List<Comment> userComments = new ArrayList<>(user.getComments().stream().filter(c -> !c.getId().equals(commentId)).toList());
        blog.setComments(blogComments);
        user.setComments(userComments);
        commentRepository.deleteById(commentId);
    }

    @Override
    public boolean isOwner(UUID userId, UUID blogId, String username) {
        CommentId commentId = new CommentId(userId, blogId);
        return commentRepository.findById(commentId)
                .map(comment -> comment.getUser().getUsername().equals(username))
                .orElse(false);
    }
}
