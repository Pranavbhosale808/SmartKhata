package com.smartkhata.product.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.smartkhata.product.dto.ApiErrorResponse;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleProductNotFound(ProductNotFoundException ex) {
        return buildError(
                HttpStatus.NOT_FOUND,
                "PRODUCT_NOT_FOUND",
                ex.getMessage(),
                null
        );
    }

    @ExceptionHandler(DuplicateProductException.class)
    public ResponseEntity<ApiErrorResponse> handleDuplicateProduct(DuplicateProductException ex) {
        return buildError(
                HttpStatus.CONFLICT,
                "DUPLICATE_PRODUCT",
                ex.getMessage(),
                null
        );
    }

    @ExceptionHandler(InvalidProductException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidProduct(InvalidProductException ex) {
        return buildError(
                HttpStatus.BAD_REQUEST,
                "INVALID_PRODUCT",
                ex.getMessage(),
                null
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationErrors(MethodArgumentNotValidException ex) {

        Map<String, String> fieldErrors = new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        fieldErrors.put(error.getField(), error.getDefaultMessage())
                );

        return buildError(
                HttpStatus.BAD_REQUEST,
                "VALIDATION_ERROR",
                "Validation failed",
                fieldErrors
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGenericException(Exception ex) {
        return buildError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "INTERNAL_SERVER_ERROR",
                "Something went wrong",
                null
        );
    }

    private ResponseEntity<ApiErrorResponse> buildError(
            HttpStatus status,
            String errorCode,
            String message,
            Map<String, String> errors
    ) {
        ApiErrorResponse response = new ApiErrorResponse(
                errorCode,
                message,
                errors,
                LocalDateTime.now()
        );
        return new ResponseEntity<>(response, status);
    }
}
