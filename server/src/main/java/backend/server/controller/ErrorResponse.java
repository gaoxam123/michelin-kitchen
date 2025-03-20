package backend.server.controller;

import org.springframework.http.HttpStatusCode;

public record ErrorResponse(HttpStatusCode httpStatusCode, String message, Long timestamp) {
}
