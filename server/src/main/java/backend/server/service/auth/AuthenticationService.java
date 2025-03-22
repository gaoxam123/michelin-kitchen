package backend.server.service.auth;

import backend.server.entity.auth.AuthenticationRequest;
import backend.server.entity.auth.AuthenticationResponse;
import backend.server.entity.auth.RegisterRequest;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse authenticate(AuthenticationRequest request);
}
