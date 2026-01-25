package com.smartkhata.billing.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillDto {

    private Long billId;
    private Long vendorId;
    private Long customerId;
    private String billNumber;
    private LocalDate billDate;
    private BigDecimal totalAmount;
    private String status;
    private List<BillItemDto> items;
}
