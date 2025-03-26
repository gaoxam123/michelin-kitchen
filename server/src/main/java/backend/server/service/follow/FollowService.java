package backend.server.service.follow;


import backend.server.controller.follow.FollowRequest;
import backend.server.entity.follow.FollowId;

public interface FollowService {
    void addFollow(FollowRequest followRequest);

    void removeFollow(FollowId followId);
}
