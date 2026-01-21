package com.smartkhata.product.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@AllArgsConstructor
public class ApiErrorResponse {
	private String errorCode;
    private String message;
    private Map<String, String> errors;
    private LocalDateTime timestamp;

}
