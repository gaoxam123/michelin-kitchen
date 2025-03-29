package backend.server.service.email;

public interface EmailService {
    void sendVerificationEmail(String to, String token, String subject, String body);

    void sendGeneralEmail(String to, String subject, String body);
}
