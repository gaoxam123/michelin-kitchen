package backend.server.controller.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CommentRequest {
    private String content;
    private Long commentDate;
    private UUID userId;
    private UUID blogId;
}
