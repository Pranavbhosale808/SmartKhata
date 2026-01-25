package com.smartkhata.billing.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillItemDto {

    private Long billItemId;
    private Long productId;
    private String description;
    private BigDecimal unitPriceSnapshot;
    private Integer quantity;
    private BigDecimal lineTotal;
}
