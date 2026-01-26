package com.smartkhata.product.repository;

import com.smartkhata.product.entity.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

	Page<Product> findByVendorId(Long vendorId, Pageable pageable);

    Page<Product> findByVendorIdAndNameContainingIgnoreCase(
            Long vendorId,
            String name,
            Pageable pageable
    );

    List<Product> findByVendorIdAndPriceBetween(
            Long vendorId, BigDecimal min, BigDecimal max
    );

    @Query("""
        SELECT p FROM Product p
        WHERE p.vendorId = :vendorId
        AND p.quantity <= :threshold
    """)
    List<Product> findLowStockProducts(Long vendorId, Integer threshold);
    
    Page<Product> findByVendorIdAndPriceBetween(
            Long vendorId,
            BigDecimal min,
            BigDecimal max,
            Pageable pageable
    );

    @Query("""
        SELECT p FROM Product p
        WHERE p.vendorId = :vendorId
        AND p.quantity <= :threshold
    """)
    Page<Product> findLowStockProducts(
            Long vendorId,
            Integer threshold,
            Pageable pageable
    );

}
