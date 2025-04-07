package backend.server.controller.comment;

import backend.server.entity.blog.Blog;
import backend.server.entity.comment.Comment;
import backend.server.entity.comment.CommentId;
import backend.server.entity.user.User;
import backend.server.service.blog.BlogService;
import backend.server.service.comment.CommentService;
import backend.server.service.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    private final UserService userService;
    private final BlogService blogService;

    @GetMapping("/comments/{blogId}")
    public ResponseEntity<List<CommentResponse>> getAllCommentsByBlogId(@PathVariable UUID blogId, @RequestParam(name = "less", required = false) boolean less) {
        if (less) {
            return ResponseEntity.ok(commentService.get10CommentsByBlogId(blogId).stream().map(CommentResponse::new).toList());
        }
        return ResponseEntity.ok(commentService.getAllCommentsByBlogId(blogId).stream().map(CommentResponse::new).toList());
    }

    @PutMapping("/comments")
    @PreAuthorize("hasRole('ADMIN') or @commentServiceImpl.isOwner(#commentRequest.userId, #commentRequest.blogId, #commentRequest.commentDate, authentication.name)")
    public ResponseEntity<CommentResponse> updateComment(@Valid @RequestBody CommentRequest commentRequest) {
        return ResponseEntity.ok(new CommentResponse(commentService.update(getCommentFromRequest(commentRequest, true))));
    }

    @PostMapping("/comments")
    @PreAuthorize("authentication.principal.id.equals(#commentRequest.userId)")
    public ResponseEntity<CommentResponse> addComment(@Valid @RequestBody CommentRequest commentRequest) {
        return ResponseEntity.ok(new CommentResponse(commentService.create(getCommentFromRequest(commentRequest, false))));
    }

    @DeleteMapping("/comments")
    @PreAuthorize("hasRole('ADMIN') or @commentServiceImpl.isOwner(#commentRequest.userId, #commentRequest.blogId, #commentRequest.commentDate, authentication.name)")
    public ResponseEntity<String> deleteComment(@Valid @RequestBody CommentRequest commentRequest) {
        CommentId commentId = new CommentId(commentRequest.getUserId(), commentRequest.getBlogId(), commentRequest.getCommentDate());
        commentService.deleteCommentById(commentId);
        return ResponseEntity.ok("Comment with id " + commentId + " deleted");
    }

    private Comment getCommentFromRequest(CommentRequest commentRequest, boolean update) {
        if (update) {
            if (commentRequest.getCommentDate() == null) {
                throw new IllegalArgumentException("Comment date cannot be null");
            }
        }

        Long commentDate = commentRequest.getCommentDate();

        if (!update) {
            commentDate = System.currentTimeMillis();
        }

        CommentId commentId = new CommentId(commentRequest.getUserId(), commentRequest.getBlogId(), commentDate);

        User user = userService.findById(commentRequest.getUserId());
        if (user == null) {
            throw new NoSuchElementException("No user with id " + commentRequest.getUserId() + " found!");
        }

        Blog blog = blogService.findById(commentRequest.getBlogId());
        if (blog == null) {
            throw new NoSuchElementException("No blog with id " + commentRequest.getBlogId() + " found!");
        }

        if (commentRequest.getContent() == null) {
            throw new IllegalArgumentException("Content is required!");
        }

        return Comment.builder()
                .id(commentId)
                .content(commentRequest.getContent())
                .user(user)
                .blog(blog)
                .build();
    }
}
