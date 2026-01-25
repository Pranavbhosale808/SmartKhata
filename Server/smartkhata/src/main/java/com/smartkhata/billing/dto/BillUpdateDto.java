package com.smartkhata.billing.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillUpdateDto {

    private Long customerId;

    @NotNull(message = "Total amount is required")
    @DecimalMin(value = "0.01", message = "Total amount must be greater than zero")
    private BigDecimal totalAmount;

    @NotBlank(message = "Status is required")
    private String status;

    @NotEmpty(message = "Bill must contain at least one item")
    private List<@Valid BillItemUpdateDto> items;
}
