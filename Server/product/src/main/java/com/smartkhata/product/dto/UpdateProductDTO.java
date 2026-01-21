package com.smartkhata.product.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateProductDTO {
	
	@Size(max=50)
	private String name;
	
	@DecimalMin(value = "0.01")
	private BigDecimal price;
	
	
	private String unit;
	
	@Min(0)
	private Integer stockQty;
	

	
}
