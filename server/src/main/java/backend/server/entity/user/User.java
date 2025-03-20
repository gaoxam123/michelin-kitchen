package backend.server.entity.user;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "second_name")
    private String lastName;

    @Column(name = "username")
    private String username;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "image", columnDefinition = "LONGBLOB")
    private String image;

    @Column(name = "image_type")
    private String imageType;

    public User() {
    }

    public User(String firstName, String lastName, String username, String imageName, String image, String imageType) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.imageName = imageName;
        this.image = image;
        this.imageType = imageType;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }
}
