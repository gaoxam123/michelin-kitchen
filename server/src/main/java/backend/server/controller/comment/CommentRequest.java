package backend.server.controller.comment;

import jakarta.validation.constraints.NotNull;
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

    @NotNull
    private String content;

    @NotNull
    private Long commentDate;

    @NotNull
    private UUID userId;

    @NotNull
    private UUID blogId;
}
