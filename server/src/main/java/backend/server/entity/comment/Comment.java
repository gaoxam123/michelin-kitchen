package backend.server.entity.comment;

import backend.server.entity.blog.Blog;
import backend.server.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "comments")
public class Comment {
    @EmbeddedId
    private CommentId id;

    @Column(name = "comment_date")
    private Long commentDate;

    @Column(name = "content")
    private String content;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @MapsId("blogId")
    @JoinColumn(name = "blog_id", nullable = false)
    private Blog blog;
}
