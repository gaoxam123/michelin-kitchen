package backend.server.service.like;

import backend.server.controller.RestException;
import backend.server.controller.like.LikeRequest;
import backend.server.controller.like.LikeResponse;
import backend.server.dao.like.LikeRepository;
import backend.server.entity.blog.Blog;
import backend.server.entity.like.Like;
import backend.server.entity.like.LikeId;
import backend.server.entity.user.User;
import backend.server.service.blog.BlogService;
import backend.server.service.email.EmailService;
import backend.server.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {
    private final LikeRepository likeRepository;
    private final BlogService blogService;
    private final UserService userService;
    private final EmailService emailService;

    @Override
    public LikeResponse addLike(LikeRequest likeRequest) {
        LikeId likeId = new LikeId(likeRequest.getUserId(), likeRequest.getBlogId());
        Blog blog = blogService.findById(likeRequest.getBlogId());
        User user = userService.findById(likeRequest.getUserId());
        Like like = new Like(likeId, blog, user);

        boolean authorized = user.getUsername().equals(SecurityContextHolder.getContext().getAuthentication().getName());
        if (!authorized) {
            throw new RestException(
                    HttpStatus.UNAUTHORIZED,
                    "Unauthorized to like blog id " + blog.getId(),
                    System.currentTimeMillis()
            );
        }

        // notify user who own the blog
        User blogOwner = userService.findById(blog.getUser().getId());
        String subject = user.getUsername() + " liked your blog";
        String blogUrl = "http://localhost:8080/api/blogs/" + blog.getId();
        String body = "Check it out! " + blogUrl;
        emailService.sendGeneralEmail(blogOwner.getEmail(), subject, body);

        likeRepository.save(like);

        return new LikeResponse(likeId.getUserId(), likeId.getBlogId());
    }

    @Override
    public LikeResponse removeLike(LikeRequest likeRequest) {
        LikeId likeId = new LikeId(likeRequest.getUserId(), likeRequest.getBlogId());
        likeRepository.findById(likeId).orElseThrow(
                () -> new RestException(
                        HttpStatus.NOT_FOUND,
                        "No like with id " + likeId + " found!",
                        System.currentTimeMillis()
                )
        );

        Blog blog = blogService.findById(likeRequest.getBlogId());
        User user = userService.findById(likeRequest.getUserId());

        boolean authorized = user.getUsername().equals(SecurityContextHolder.getContext().getAuthentication().getName());
        if (!authorized) {
            throw new RestException(
                    HttpStatus.UNAUTHORIZED,
                    "Unauthorized to unlike blog with id " + blog.getId(),
                    System.currentTimeMillis()
            );
        }

        likeRepository.deleteById(likeId);

        return new LikeResponse(likeId.getUserId(), likeId.getBlogId());
    }

    @Override
    public boolean isOwner(UUID userId, UUID blogId, String username) {
        LikeId likeId = new LikeId(userId, blogId);
        return likeRepository.findById(likeId)
                .map(like -> like.getUser().getUsername().equals(username))
                .orElse(false);
    }
}
