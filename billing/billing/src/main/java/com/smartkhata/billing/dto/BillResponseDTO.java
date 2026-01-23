package com.smartkhata.billing.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BillResponseDTO {

    private Integer invoiceId;
    private Integer vendorId;
    private Integer customerId;
    private String invoiceNumber;
    private LocalDate invoiceDate;
    private BigDecimal totalAmount;
    private String status;
    private List<BillItemResponseDTO> items;
}
