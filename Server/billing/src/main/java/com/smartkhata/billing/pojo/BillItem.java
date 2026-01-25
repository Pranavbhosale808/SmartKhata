package com.smartkhata.billing.pojo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "bill_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", nullable = false)
    private Bill bill;

    @NotNull
    private Integer productId;

    @NotBlank
    private String description;

    @NotNull
    private BigDecimal unitPriceSnapshot;

    @NotNull
    private Integer quantity;

    @NotNull
    private BigDecimal lineTotal;
}
