package com.smartkhata.billing.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(
    name = "bill",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"vendor_id", "bill_number"})
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long billId;

    @Column(name = "vendor_id", nullable = false)
    private Long vendorId;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "bill_number", nullable = false)
    private String billNumber;

    @Column(name = "bill_date", nullable = false)
    private LocalDate billDate;

    private BigDecimal totalAmount;

    private String status;

    @OneToMany(
        mappedBy = "bill",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<BillItem> items;
}
