package backend.server.controller.comment;

import backend.server.entity.comment.Comment;
import backend.server.entity.comment.CommentId;
import backend.server.service.comment.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/comments/{blogId}")
    public List<Comment> getAllCommentsByBlogId(@PathVariable UUID blogId, @RequestParam(name = "less", required = false) boolean less) {
        if (less) {
            return commentService.get10CommentsByBlogId(blogId);
        }
        return commentService.getAllCommentsByBlogId(blogId);
    }

    @PutMapping("/comments")
    @PreAuthorize("hasRole('ADMIN') or @commentServiceImpl.isOwner(#commentRequest.userId, #commentRequest.blogId, authentication.name)")
    public void updateComment(@RequestBody CommentRequest commentRequest) {
        commentService.update(commentRequest);
    }

    @PostMapping("/comments")
    @PreAuthorize("hasRole('ADMIN') or @commentServiceImpl.isOwner(#commentRequest.userId, #commentRequest.blogId, authentication.name)")
    public void addComment(@RequestBody CommentRequest commentRequest) {
        commentService.create(commentRequest);
    }

    @DeleteMapping("/comments")
    @PreAuthorize("hasRole('ADMIN') or @commentServiceImpl.isOwner(#commentId.userId, #commentId.blogId, authentication.name)")
    public void deleteComment(@RequestBody CommentId commentId) {
        commentService.deleteCommentById(commentId);
    }
}
