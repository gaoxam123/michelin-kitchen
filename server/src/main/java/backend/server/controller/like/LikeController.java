package backend.server.controller.like;

import backend.server.service.like.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/likes")
    public void addLike(@RequestBody LikeRequest likeRequest) {
        likeService.addLike(likeRequest);
    }

    @DeleteMapping("/likes")
    public void removeLike(@RequestBody LikeRequest likeRequest) {
        likeService.removeLike(likeRequest);
    }
}
