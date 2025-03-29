package backend.server.controller.follow;

import backend.server.service.follow.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api")
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;

    @PostMapping("/follows")
    @PreAuthorize("@followServiceImpl.isOwner(#followRequest.followerId, #followRequest.followedId, authentication.name)")
    public void addFollow(@RequestBody FollowRequest followRequest) {
        followService.addFollow(followRequest);
    }

    @DeleteMapping("/follows")
    @PreAuthorize("@followServiceImpl.isOwner(#followRequest.followerId, #followRequest.followedId, authentication.name)")
    public void deleteFollow(@RequestBody FollowRequest followRequest) {
        followService.removeFollow(followRequest);
    }
}
