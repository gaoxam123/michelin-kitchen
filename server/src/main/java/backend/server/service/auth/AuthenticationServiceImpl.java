package backend.server.service.auth;

import backend.server.config.JwtService;
import backend.server.dao.user.UserRepository;
import backend.server.controller.auth.AuthenticationRequest;
import backend.server.controller.auth.AuthenticationResponse;
import backend.server.controller.auth.RegisterRequest;
import backend.server.entity.user.Role;
import backend.server.entity.user.User;
import backend.server.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final int tokenExpirationInMinutes = 15;

    @Override
    public String register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username is already in use");
        }

        String token = UUID.randomUUID().toString();
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(tokenExpirationInMinutes);

        User user = User
                .builder()
                .username(request.getUsername())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .enabled(false)
                .locked(false)
                .tokenExpiry(expiryTime)
                .verificationToken(token)
                .role(Role.USER)
                .build();

        userRepository.save(user);
        String body = "Click here to verify your account. \n This link expires in " + tokenExpirationInMinutes + " minutes. \n";
        String subject = request.getFirstName() + " " + request.getLastName() + "'s activation link";

        // Email Service sends email
        emailService.sendVerificationEmail(user.getEmail(), token, subject, body);

        return jwtService.generateToken(user);
    }

    @Override
    public String authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return jwtService.generateToken(user);
    }

    @Override
    public String verifyEmail(String token) {

        User user = userRepository.findByVerificationToken(token)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (user.getTokenExpiry().isBefore(LocalDateTime.now())) {
            return "Verification link has expired. Request a new verification email.";
        }

        user.setVerificationToken(null);
        user.setEnabled(true);
        user.setTokenExpiry(null);
        userRepository.save(user);

        return "Email verified successfully";
    }

    @Override
    public String resendVerificationEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (user.getEnabled()) {
            return "Your account is already verified. Please log in.";
        }

        String newToken = UUID.randomUUID().toString();
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(tokenExpirationInMinutes);

        user.setTokenExpiry(expiryTime);
        user.setVerificationToken(newToken);
        userRepository.save(user);

        String body = "Click here to verify your account. \n This link expires in " + tokenExpirationInMinutes + " minutes. \n";
        String subject = "Your new activation link";

        emailService.sendVerificationEmail(user.getEmail(), newToken, subject, body);

        return "A new verification email has been sent to your account.";
    }
}
