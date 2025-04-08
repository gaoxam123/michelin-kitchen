package backend.server.config;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        if (request.getRequestURI().startsWith("/api/auth") || (request.getMethod().equals("GET") && !request.getRequestURI().startsWith("/api/users/auth-me"))) {
            filterChain.doFilter(request, response);
            return;
        }

        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("auth_token")) {
                token = cookie.getValue();
                break;
            }
        }

        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            final String username = jwtService.extractUsername(token);

            if (username == null || SecurityContextHolder.getContext().getAuthentication() != null) {
                filterChain.doFilter(request, response);
                return;
            }

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(token, userDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        } catch (ExpiredJwtException e) {
            // could be useful
            if (request.getMethod().equals("GET") && request.getRequestURI().startsWith("/api/users/auth-me")) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return;
        }

        filterChain.doFilter(request, response);

    }

//    *** OLD CODE USING BEARER AUTH HEADER ***
//    @Override
//    protected void doFilterInternal(
//            @NonNull HttpServletRequest request,
//            @NonNull HttpServletResponse response,
//            @NonNull FilterChain filterChain
//    ) throws ServletException, IOException {
//        final String authHeader = request.getHeader("Authorization");
//        String AUTHORIZATION_HEADER_PREFIX = "Bearer ";
//        if (authHeader == null || !authHeader.startsWith(AUTHORIZATION_HEADER_PREFIX)) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        final String jwt = authHeader.substring(AUTHORIZATION_HEADER_PREFIX.length());
//        final String username = jwtService.extractUsername(jwt);
//
//        if (username == null || SecurityContextHolder.getContext().getAuthentication() != null) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//        if (jwtService.isTokenValid(jwt, userDetails)) {
//            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//                    userDetails,
//                    null,
//                    userDetails.getAuthorities()
//            );
//            authenticationToken.setDetails(
//                    new WebAuthenticationDetailsSource().buildDetails(request)
//            );
//            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//        }
//
//        filterChain.doFilter(request, response);
//    }
}
