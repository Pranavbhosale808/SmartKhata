package com.smartkhata.product.controller;
import com.smartkhata.product.dto.ProductRequestDTO;
import com.smartkhata.product.dto.ProductResponseDTO;
import com.smartkhata.product.dto.UpdateProductDTO;
import com.smartkhata.product.service.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor

public class ProductController {
	private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(
            @RequestHeader("X-Vendor-Id") Long vendorId,
            @Valid @RequestBody ProductRequestDTO request
    ) {
        ProductResponseDTO response = productService.createProduct(vendorId, request);
        response.setIsActive(true);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponseDTO> getProductById(
            @RequestHeader("X-Vendor-Id") Long vendorId,
            @PathVariable Long productId
    ) {
        ProductResponseDTO response = productService.getProductById(vendorId, productId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<ProductResponseDTO>> getAllProducts(
            @RequestHeader("X-Vendor-Id") Long vendorId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize
            
    ) {
    	 Page<ProductResponseDTO> response =
    	            productService.getAllProducts(vendorId, pageNumber, pageSize);
    	    return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(
    		  @RequestHeader("X-Vendor-Id") Long vendorId,
              @PathVariable Long productId
    		){
    	productService.deleteProduct(productId, vendorId);
    	return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{productId}")
    public ResponseEntity<ProductResponseDTO> updateProduct(
    		@RequestHeader("X-Vendor-Id") Long vendorId,
            @PathVariable Long productId,
            @Valid @RequestBody UpdateProductDTO request
    		){
    	
    	ProductResponseDTO productResponseDTO = productService.updateProduct(productId, vendorId, request);
    	return ResponseEntity.ok(productResponseDTO);
    }
    
    
   
}
