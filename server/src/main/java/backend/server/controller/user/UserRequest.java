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
public class UserRequest {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private Role role;
    private UUID id;
}
