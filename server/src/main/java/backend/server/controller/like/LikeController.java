package backend.server.controller.like;

import backend.server.service.like.LikeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/likes")
    @PreAuthorize("@likeServiceImpl.isOwner(#likeRequest.userId, #likeRequest.blogId, authentication.name)")
    public void addLike(@Valid @RequestBody LikeRequest likeRequest) {
        likeService.addLike(likeRequest);
    }

    @DeleteMapping("/likes")
    @PreAuthorize("@likeServiceImpl.isOwner(#likeRequest.userId, #likeRequest.blogId, authentication.name)")
    public void removeLike(@Valid @RequestBody LikeRequest likeRequest) {
        likeService.removeLike(likeRequest);
    }
}
