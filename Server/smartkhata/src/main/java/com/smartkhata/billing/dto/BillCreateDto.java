package com.smartkhata.billing.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillCreateDto {

    @NotNull(message = "Vendor ID is required")
    private Long vendorId;

    private Long customerId;

    @NotBlank(message = "Bill number is required")
    private String billNumber;

    @NotNull(message = "Bill date is required")
    private LocalDate billDate;

    @NotNull(message = "Total amount is required")
    @DecimalMin(value = "0.01", message = "Total amount must be greater than zero")
    private BigDecimal totalAmount;

    @NotBlank(message = "Status is required")
    private String status;

    @NotEmpty(message = "Bill must contain at least one item")
    private List<@Valid BillItemCreateDto> items;
}
