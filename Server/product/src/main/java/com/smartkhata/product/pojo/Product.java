package com.smartkhata.product.pojo;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "products",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"vendor_id", "name"})
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(name = "vendor_id", nullable = false)
	    private Long vendorId;

	    @Column(nullable = false, length = 150)
	    private String name;

	    @Column(nullable = false, precision = 10, scale = 2)
	    private BigDecimal price;

	    @Column(nullable = false, length = 20)
	    private String unit;

	    @Column(name = "stock_qty", nullable = false)
	    private Integer stockQty;

	    @Column(name = "is_active", nullable = false)
	    private Boolean isActive;

	    @Column(name = "created_at", nullable = false, updatable = false)
	    private LocalDateTime createdAt;

	    @Column(name = "updated_at")
	    private LocalDateTime updatedAt;

	    @PrePersist
	    protected void onCreate() {
	        this.createdAt = LocalDateTime.now();
	        this.isActive = true;
	    }

	    @PreUpdate
	    protected void onUpdate() {
	        this.updatedAt = LocalDateTime.now();
	    }
}
