package backend.server.controller.user;

import backend.server.entity.user.Role;
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
}
