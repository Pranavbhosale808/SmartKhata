package com.smartkhata.dashboard.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RevenueChartDto {

    private String month;
    private BigDecimal amount;
}
