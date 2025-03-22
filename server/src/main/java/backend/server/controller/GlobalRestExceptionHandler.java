package backend.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalRestExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleRestException(RestException e) {
        return new ResponseEntity<>(new ErrorResponse(
                e.getHttpStatusCode(),
                e.getMessage(),
                e.getTimestamp()
        ), e.getHttpStatusCode());
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        return new ResponseEntity<>(new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                e.getMessage(),
                System.currentTimeMillis()
        ), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
