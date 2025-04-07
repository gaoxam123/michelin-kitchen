package backend.server.controller.comment;

import backend.server.entity.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CommentResponse {
    private String content;
    private Long commentDate;
    private UUID userId;
    private UUID blogId;

    public CommentResponse(Comment comment) {
        this.content = comment.getContent();
        this.blogId = comment.getBlog().getId();
        this.userId = comment.getUser().getId();
        this.commentDate = comment.getId().getCommentDate();
    }
}
