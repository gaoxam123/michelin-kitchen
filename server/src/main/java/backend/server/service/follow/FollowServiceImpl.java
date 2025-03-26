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
        followRepository.save(new Follow(followId, follower, followed));
    }

    @Override
    public void removeFollow(FollowId followId) {
        followRepository.deleteById(followId);
    }
}
