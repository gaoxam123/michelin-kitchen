package backend.server.service.follow;

import backend.server.controller.RestException;
import backend.server.controller.follow.FollowRequest;
import backend.server.dao.follow.FollowRepository;
import backend.server.dao.user.UserRepository;
import backend.server.entity.follow.Follow;
import backend.server.entity.follow.FollowId;
import backend.server.entity.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {
    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    @Override
    public void addFollow(FollowRequest followRequest) {
        User follower = userRepository.findById(followRequest.getFollowerId()).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + followRequest.getFollowerId() + " found!",
                        System.currentTimeMillis()
                )
        );
        User followed = userRepository.findById(followRequest.getFollowedId()).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + followRequest.getFollowedId() + " found!",
                        System.currentTimeMillis()
                )
        );
        FollowId followId = new FollowId(followRequest.getFollowerId(), followRequest.getFollowedId());
        Follow newFollow = new Follow(followId, follower, followed);
        follower.getFollowed().add(newFollow);
        followed.getFollowers().add(newFollow);
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
        User follower = userRepository.findById(followRequest.getFollowerId()).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + followRequest.getFollowerId() + " found!",
                        System.currentTimeMillis()
                )
        );
        User followed = userRepository.findById(followRequest.getFollowedId()).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + followRequest.getFollowedId() + " found!",
                        System.currentTimeMillis()
                )
        );
        List<Follow> newFollowedList = follower.getFollowed().stream().filter(f -> !f.getId().equals(followId)).toList();
        List<Follow> newFollowerList = followed.getFollowers().stream().filter(f -> !f.getId().equals(followId)).toList();
        follower.setFollowed(newFollowedList);
        followed.setFollowers(newFollowerList);
        followRepository.deleteById(followId);
    }
}
