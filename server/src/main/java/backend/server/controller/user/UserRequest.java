package backend.server.controller.user;

import backend.server.entity.user.Role;
import backend.server.service.utils.Utils;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @NotNull(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;

    @NotNull
    private boolean passwordIsChanged;

    private String newPassword;

    private String oldPassword;

    @NotNull(message = "Firstname is required")
    private String firstName;

    @NotNull(message = "Lastname is required")
    private String lastName;

    @NotNull
    private UUID id;

    @NotNull
    @Email
    private String email;

    public boolean validOldPassword() {
        return Utils.Password.validPassword(oldPassword);
    }

    public boolean validNewPassword() {
        return Utils.Password.validPassword(newPassword);
    }
}
