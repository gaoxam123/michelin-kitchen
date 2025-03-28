package backend.server.controller.follow;

import backend.server.service.follow.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api")
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;

    @PostMapping("/follows")
    public void addFollow(@RequestBody FollowRequest followRequest) {
        followService.addFollow(followRequest);
    }

    @DeleteMapping("/follows")
    public void deleteFollow(@RequestBody FollowRequest followRequest) {
        followService.removeFollow(followRequest);
    }
}
