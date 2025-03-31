package backend.server.controller.auth;

import backend.server.service.auth.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid
            @RequestBody
            RegisterRequest request
    ) {
        String token = authenticationService.register(request);

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, createAuthCookie(token))
                .body("Created new account!");
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(
            @Valid @RequestBody AuthenticationRequest request
    ) {

        String token = authenticationService.authenticate(request);

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, createAuthCookie(token))
                .body("Login successful");
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
