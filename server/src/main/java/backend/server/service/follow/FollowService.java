package backend.server.service.follow;


import backend.server.controller.follow.FollowRequest;
import backend.server.entity.follow.FollowId;

import java.util.UUID;

public interface FollowService {
    void addFollow(FollowRequest followRequest);

    void removeFollow(FollowRequest followRequest);

    boolean isOwner(UUID followerId, UUID followedId, String username);
}
