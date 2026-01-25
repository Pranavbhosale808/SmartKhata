package com.smartkhata.billing.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillItemCreateDto {

    @NotNull(message = "Product ID is required")
    private Long productId;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Unit price is required")
    @DecimalMin(value = "0.01", message = "Unit price must be greater than zero")
    private BigDecimal unitPriceSnapshot;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    @NotNull(message = "Line total is required")
    @DecimalMin(value = "0.01", message = "Line total must be greater than zero")
    private BigDecimal lineTotal;
}
