package backend.server.controller.auth;

import backend.server.controller.user.UserResponse;
import backend.server.entity.user.User;
import backend.server.service.auth.AuthenticationService;
import backend.server.service.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid
            @RequestBody
            RegisterRequest request
    ) {
        String token = authenticationService.register(request);

        return ResponseEntity
                .ok()
                .body("Created new account!");
    }

    @PostMapping("/authenticate")
    public ResponseEntity<UserResponse> authenticate(
            @Valid @RequestBody AuthenticationRequest request
    ) {

        String token = authenticationService.authenticate(request);

        User authenticatedUser = userService.findByUsername(request.getUsername());
        UserResponse response = new UserResponse(authenticatedUser);

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, createAuthCookie(token))
                .body(response);
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyToken(@RequestParam("token") String token) {
        return ResponseEntity.ok(authenticationService.verifyEmail(token));
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<String> resendVerification(@RequestParam("email") String email) {
        return ResponseEntity.ok(authenticationService.resendVerificationEmail(email));
    }

    private String createAuthCookie(String token) {
        return "token=" + token + "; " +
                "HttpOnly; " +
                "Secure; " +
                "Path=/; " +
                "Max-Age=3600; " +
                "SameSite=Strict";
    }
}
