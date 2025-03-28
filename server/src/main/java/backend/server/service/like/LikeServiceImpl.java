package backend.server.service.like;

import backend.server.controller.RestException;
import backend.server.controller.like.LikeRequest;
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
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {
    private final LikeRepository likeRepository;
    private final BlogService blogService;
    private final UserService userService;
    private final EmailService emailService;

    @Override
    public void addLike(LikeRequest likeRequest) {
        LikeId likeId = new LikeId(likeRequest.getUserId(), likeRequest.getBlogId());
        Blog blog = blogService.findById(likeRequest.getBlogId());
        User user = userService.findById(likeRequest.getUserId());
        Like like = new Like(likeId, blog, user);
        blog.getLikes().add(like);
        user.getLikes().add(like);
        likeRepository.save(like);

        // notify user who own the blog
        User blogOwner = userService.findById(blog.getUser().getId());
        String subject = user.getUsername() + " liked your blog";
        String blogUrl = "http://localhost:8080/api/blogs/" + blog.getId();
        String body = "Check it out! " + blogUrl;
        emailService.sendGeneralEmail(blogOwner.getEmail(), subject, body);
    }

    @Override
    public void removeLike(LikeRequest likeRequest) {
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

        List<Like> blogLikes = blog.getLikes().stream().filter(l -> !l.getId().equals(likeId)).toList();
        List<Like> userLikes = user.getLikes().stream().filter(l -> !l.getId().equals(likeId)).toList();
        blog.setLikes(blogLikes);
        user.setLikes(userLikes);
        likeRepository.deleteById(likeId);
    }
}
