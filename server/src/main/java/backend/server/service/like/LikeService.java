package backend.server.service.like;

import backend.server.controller.like.LikeRequest;
import backend.server.controller.like.LikeResponse;
import backend.server.entity.like.Like;

import java.util.UUID;

public interface LikeService {
    LikeResponse addLike(LikeRequest likeRequest);

    LikeResponse removeLike(LikeRequest likeRequest);

    boolean isOwner(UUID userId, UUID blogId, String username);
}
