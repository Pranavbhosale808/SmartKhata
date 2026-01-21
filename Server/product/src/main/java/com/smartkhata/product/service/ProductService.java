package com.smartkhata.product.service;

import org.springframework.data.domain.Page;

import com.smartkhata.product.dto.ProductRequestDTO;
import com.smartkhata.product.dto.ProductResponseDTO;
import com.smartkhata.product.dto.UpdateProductDTO;
public interface ProductService {
	ProductResponseDTO createProduct(Long vendorId, ProductRequestDTO request);

    ProductResponseDTO getProductById(Long vendorId, Long productId);

    Page<ProductResponseDTO> getAllProducts(Long vendorId,int pageNumber,int pageSize);
    
    void deleteProduct(Long productId,Long vendorId);
    
    ProductResponseDTO updateProduct(Long productId,Long vendorId,UpdateProductDTO request);
    

}
