package com.smartkhata.billing.pojo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(
    name = "bill",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"vendor_id", "invoice_number"})
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
    private Integer invoiceId;

    @NotNull
    @Column(nullable = false)
    private Integer vendorId;

    private Integer customerId;

    @NotBlank
    @Column(nullable = false)
    private String invoiceNumber;

    @NotNull
    @Column(nullable = false)
    private LocalDate invoiceDate;

    @NotNull
    private BigDecimal totalAmount;

    @NotBlank
    private String status;

    @NotNull
    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BillItem> items;
}
