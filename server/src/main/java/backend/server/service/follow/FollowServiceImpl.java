package backend.server.service.follow;

import backend.server.controller.RestException;
import backend.server.controller.follow.FollowRequest;
import backend.server.dao.follow.FollowRepository;
import backend.server.entity.follow.Follow;
import backend.server.entity.follow.FollowId;
import backend.server.entity.user.User;
import backend.server.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {
    private final FollowRepository followRepository;
    private final UserService userService;

    @Override
    public void addFollow(FollowRequest followRequest) {

        if (followRequest.getFollowerId().equals(followRequest.getFollowedId())) {
            throw new IllegalArgumentException("You can't follow yourself");
        }

        User follower = userService.findById(followRequest.getFollowerId());
        User followed = userService.findById(followRequest.getFollowedId());

        FollowId followId = new FollowId(followRequest.getFollowerId(), followRequest.getFollowedId());
        Follow newFollow = new Follow(followId, follower, followed);

        boolean authorized = follower.getUsername().equals(SecurityContextHolder.getContext().getAuthentication().getName());
        if (!authorized) {
            throw new RestException(
                    HttpStatus.UNAUTHORIZED,
                    "Unauthorized to follow user with id " + followRequest.getFollowedId(),
                    System.currentTimeMillis()
            );
        }

//        follower.getFollowed().add(newFollow);
//        followed.getFollowers().add(newFollow);

        followRepository.save(newFollow);
    }

    @Override
    public void removeFollow(FollowRequest followRequest) {
        FollowId followId = new FollowId(followRequest.getFollowerId(), followRequest.getFollowedId());
        followRepository.findById(followId).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + followId + " found!",
                        System.currentTimeMillis()
                )
        );

        User follower = userService.findById(followRequest.getFollowerId());
//        User followed = userService.findById(followRequest.getFollowedId());

        boolean authorized = follower.getUsername().equals(SecurityContextHolder.getContext().getAuthentication().getName());
        if (!authorized) {
            throw new RestException(
                    HttpStatus.UNAUTHORIZED,
                    "Unauthorized to unfollow user with id " + followRequest.getFollowedId(),
                    System.currentTimeMillis()
            );
        }

//        List<Follow> newFollowedList = follower.getFollowed().stream().filter(f -> !f.getId().equals(followId)).toList();
//        List<Follow> newFollowerList = followed.getFollowers().stream().filter(f -> !f.getId().equals(followId)).toList();
//        follower.setFollowed(newFollowedList);
//        followed.setFollowers(newFollowerList);

        followRepository.deleteById(followId);
    }

    @Override
    public boolean isOwner(UUID followerId, UUID followedId, String username) {
        FollowId followId = new FollowId(followerId, followedId);
        return followRepository.findById(followId)
                               .map(follow -> follow.getFollower().getUsername().equals(username))
                               .orElse(false);
    }
}
