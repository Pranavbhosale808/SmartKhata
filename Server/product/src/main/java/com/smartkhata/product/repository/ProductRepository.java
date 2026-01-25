package com.smartkhata.product.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.smartkhata.product.pojo.Product;


import java.util.List;
import java.util.Optional;


public interface ProductRepository extends JpaRepository<Product, Long> {
	    Optional<Product> findByIdAndVendorId(Long id, Long vendorId);

	    Page<Product> findAllByVendorIdAndIsActiveTrue(Long vendorId,Pageable pageable);

	    boolean existsByVendorIdAndNameIgnoreCase(Long vendorId, String name);
	    
	    
	    
	    
	    
}
