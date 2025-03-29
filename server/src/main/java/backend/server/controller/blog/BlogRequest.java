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

    @NotNull
    private String content;

    @NotNull
    private UUID userId;

    @NotNull
    private UUID id;

    private Long blogDate;
    private MultipartFile image;
}
