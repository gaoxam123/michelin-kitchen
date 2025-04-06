package backend.server.controller.blog;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class BlogRequest {

    private UUID id;

    @NotNull
    private UUID userId;

    private String content;

    private MultipartFile image;
}
