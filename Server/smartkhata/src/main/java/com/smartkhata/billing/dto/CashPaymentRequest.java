package com.smartkhata.billing.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CashPaymentRequest {
	@NotNull
    private Long billId;
	@NotNull
    private BigDecimal amount;
}
