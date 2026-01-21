package com.smartkhata.product.dto;
import lombok.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ProductRequestDTO {
	 @NotBlank
	    @Size(max = 150)
	    private String name;

	    @NotNull
	    @DecimalMin(value = "0.01")
	    private BigDecimal price;

	    @NotBlank
	    private String unit;

	    @NotNull
	    @Min(0)
	    private Integer stockQty;
}
