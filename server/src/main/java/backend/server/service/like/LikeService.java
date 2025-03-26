package backend.server.service.like;

import backend.server.controller.like.LikeRequest;

public interface LikeService {
    void addLike(LikeRequest likeRequest);

    void removeLike(LikeRequest likeId);
}
