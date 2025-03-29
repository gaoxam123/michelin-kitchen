package backend.server.service.like;

import backend.server.controller.like.LikeRequest;

import java.util.UUID;

public interface LikeService {
    void addLike(LikeRequest likeRequest);

    void removeLike(LikeRequest likeRequest);

    boolean isOwner(UUID userId, UUID blogId, String username);
}
