package backend.server.controller.follow;

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
public class FollowRequest {

    @NotNull
    private UUID followerId;

    @NotNull
    private UUID followedId;
}
