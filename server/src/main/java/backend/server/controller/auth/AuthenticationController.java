package backend.server.controller.auth;

import backend.server.service.auth.AuthenticationService;
import backend.server.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return new ResponseEntity<>(
                AuthenticationResponse
                        .builder()
                        .token(authenticationService.register(request))
                        .build(),
                HttpStatus.OK
        );
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return new ResponseEntity<>(
                AuthenticationResponse
                        .builder()
                        .token(authenticationService.authenticate(request))
                        .build(),
                HttpStatus.OK
        );
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyToken(@RequestParam("token") String token) {
        return ResponseEntity.ok(authenticationService.verifyEmail(token));
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<String> resendVerification(@RequestParam("email") String email) {
        return ResponseEntity.ok(authenticationService.resendVerificationEmail(email));
    }

}
