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

@CrossOrigin("http://localhost:8080")
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // ---------------- CREATE ----------------
    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(
            @RequestHeader("X-Tenant-Id") Long tenantId,
            @Valid @RequestBody ProductRequestDTO request
    ) {
        ProductResponseDTO response =
                productService.createProduct(tenantId, request);
        response.setIsActive(true);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // ---------------- GET BY ID ----------------
    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponseDTO> getProductById(
            @RequestHeader("X-Tenant-Id") Long tenantId,
            @PathVariable Long productId
    ) {
        ProductResponseDTO response =
                productService.getProductById(tenantId, productId);
        return ResponseEntity.ok(response);
    }

    // ---------------- GET ALL ----------------
    @GetMapping
    public ResponseEntity<Page<ProductResponseDTO>> getAllProducts(
            @RequestHeader("X-Tenant-Id") Long tenantId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        Page<ProductResponseDTO> response =
                productService.getAllProducts(tenantId, pageNumber, pageSize);
        return ResponseEntity.ok(response);
    }

    // ---------------- DELETE ----------------
    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(
            @RequestHeader("X-Tenant-Id") Long tenantId,
            @PathVariable Long productId
    ) {
        productService.deleteProduct(productId, tenantId);
        return ResponseEntity.noContent().build();
    }

    // ---------------- UPDATE ----------------
    @PutMapping("/{productId}")
    public ResponseEntity<ProductResponseDTO> updateProduct(
            @RequestHeader("X-Tenant-Id") Long tenantId,
            @PathVariable Long productId,
            @Valid @RequestBody UpdateProductDTO request
    ) {
        ProductResponseDTO response =
                productService.updateProduct(productId, tenantId, request);
        return ResponseEntity.ok(response);
    }
}
