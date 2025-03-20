package backend.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalRestExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleException(RestException e) {
        return new ResponseEntity<>(new ErrorResponse(
                e.getHttpStatusCode(),
                e.getMessage(),
                e.getTimestamp()
        ), e.getHttpStatusCode());
    }
}
