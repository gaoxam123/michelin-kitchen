package backend.server.entity.blog;

import backend.server.entity.comment.Comment;
import backend.server.entity.like.Like;
import backend.server.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "blogs")
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "id")
    private User user;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "image", columnDefinition = "LONGBLOB")
    private String image;

    @Column(name = "image_type")
    private String imageType;

    @Column(name = "content")
    private String content;

    @Column(name = "blog_date")
    private Long blogDate;

    @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Like> likes;

    @OneToMany(mappedBy = "blog", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;
}
