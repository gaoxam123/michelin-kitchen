package backend.server.controller.like;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class LikeRequest {

    @NotNull
    private UUID userId;

    @NotNull
    private UUID blogId;
}
