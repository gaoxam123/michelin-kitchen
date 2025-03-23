package backend.server.entity.like;

import backend.server.entity.blog.Blog;
import backend.server.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "likes")
public class Like {
    @EmbeddedId
    private LikeId id;

    @ManyToOne
    @MapsId("blogId")
    @JoinColumn(name = "blog_id", nullable = false)
    private Blog blog;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
