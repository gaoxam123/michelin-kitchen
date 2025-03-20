package backend.server.controller;

import org.springframework.http.HttpStatusCode;

public class RestException extends RuntimeException {
    private final HttpStatusCode httpStatusCode;
    private final Long timestamp;

    public RestException(HttpStatusCode httpStatusCode, String message, Long timestamp) {
        super(message);
        this.httpStatusCode = httpStatusCode;
        this.timestamp = timestamp;
    }

    public HttpStatusCode getHttpStatusCode() {
        return httpStatusCode;
    }

    public Long getTimestamp() {
        return timestamp;
    }
}
