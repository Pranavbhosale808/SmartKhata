package com.smartkhata.product.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ProductResponseDTO {
	 private Long id;

	    private String name;

	    private BigDecimal price;

	    private String unit;

	    private Integer stockQty;

	    private Boolean isActive;
}
