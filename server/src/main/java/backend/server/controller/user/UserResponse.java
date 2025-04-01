package backend.server.controller.user;

import backend.server.entity.user.Role;
import backend.server.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserResponse {
    private UUID id;
    private Role role;
    private String email;
    private String firstName;
    private String lastName;
    private String username;

    public UserResponse(User user) {
        this.id = user.getId();
        this.role = user.getRole();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.username = user.getUsername();
    }
}
