package backend.server.service.like;

import backend.server.controller.RestException;
import backend.server.controller.like.LikeRequest;
import backend.server.dao.blog.BlogRepository;
import backend.server.dao.like.LikeRepository;
import backend.server.dao.user.UserRepository;
import backend.server.entity.blog.Blog;
import backend.server.entity.like.Like;
import backend.server.entity.like.LikeId;
import backend.server.entity.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {
    private final LikeRepository likeRepository;
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    @Override
    public void addLike(LikeRequest likeRequest) {
        LikeId likeId = new LikeId(likeRequest.getUserId(), likeRequest.getBlogId());
        Blog blog = blogRepository.findById(likeId.getBlogId()).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + likeRequest.getBlogId() + " found!",
                        System.currentTimeMillis()
                )
        );
        User user = userRepository.findById(likeRequest.getUserId()).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No user with id " + likeRequest.getUserId() + " found!",
                        System.currentTimeMillis()
                )
        );
        Like like = new Like(likeId, blog, user);
        likeRepository.save(like);
    }

    @Override
    public void removeLike(LikeRequest likeId) {
        likeRepository.deleteById(new LikeId(likeId.getUserId(), likeId.getBlogId()));
    }
}
