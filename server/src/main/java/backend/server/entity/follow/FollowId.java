package backend.server.entity.follow;

import backend.server.entity.like.LikeId;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;
import java.io.Serializable;
import java.util.UUID;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class FollowId implements Serializable {
    private UUID followerId;
    private UUID followedId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FollowId that = (FollowId) o;
        return Objects.equals(followerId, that.followerId) &&
                Objects.equals(followedId, that.followedId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(followedId, followerId);
    }
}
