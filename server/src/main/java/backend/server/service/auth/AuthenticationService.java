package backend.server.service.auth;

import backend.server.controller.auth.AuthenticationRequest;
import backend.server.controller.auth.RegisterRequest;

public interface AuthenticationService {
    String register(RegisterRequest request);

    String authenticate(AuthenticationRequest request);

    String verifyEmail(String token);

    String resendVerificationEmail(String email);
}
