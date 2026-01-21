package com.smartkhata.product.service;

import com.smartkhata.product.dto.ProductRequestDTO;
import com.smartkhata.product.dto.ProductResponseDTO;
import com.smartkhata.product.dto.UpdateProductDTO;
import com.smartkhata.product.exception.DuplicateProductException;
import com.smartkhata.product.exception.InvalidProductException;
import com.smartkhata.product.exception.ProductNotFoundException;
import com.smartkhata.product.pojo.Product;
import com.smartkhata.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ModelMapper mapper;

    @Override
    public ProductResponseDTO createProduct(Long vendorId, ProductRequestDTO request) {

        if (productRepository.existsByVendorIdAndNameIgnoreCase(vendorId, request.getName())) {
            throw new DuplicateProductException(
                    "Product already exists for vendorId=" + vendorId
            );
        }

        Product product = mapper.map(request, Product.class);
        product.setVendorId(vendorId); 

        Product savedProduct = productRepository.save(product);

        return mapToResponse(savedProduct);
    }

    @Override
    public ProductResponseDTO getProductById(Long vendorId, Long productId) {

        Product product = productRepository
                .findByIdAndVendorId(productId, vendorId)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found for vendorId=" + vendorId +
                                " and productId=" + productId
                        )
                );

        return mapToResponse(product);
    }

    @Override
    public Page<ProductResponseDTO> getAllProducts(Long vendorId,int pageNumber,int pageSize) {
    	
    	Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Product> productPage =
                productRepository.findAllByVendorIdAndIsActiveTrue(vendorId, pageable);

        return productPage.map(this::mapToResponse);
    }
    
	@Override
	public void deleteProduct(Long productId,Long vendorId) {
Product product = productRepository.findByIdAndVendorId(productId, vendorId).orElseThrow(()->
		 new ProductNotFoundException(
                 "Product not found for vendorId=" + vendorId +
                 " and productId=" + productId
         )
				);
		
		if(!product.getIsActive()) {
			throw new InvalidProductException("Product deleted");
		}
		
		if(product.getStockQty()>0) {
			throw new InvalidProductException("Cannot Delete Product Qunatity is greater than zero");
		}
		
		product.setIsActive(false);
		productRepository.save(product);
		
	}
	
	@Override
	public ProductResponseDTO updateProduct(Long productId, Long vendorId, UpdateProductDTO request) {
		Product product = productRepository.findByIdAndVendorId(productId, vendorId).orElseThrow(()->
		 new ProductNotFoundException(
                "Product not found for vendorId=" + vendorId +
                " and productId=" + productId
        )
				);
		
		if(!product.getIsActive()) {
			throw new InvalidProductException("Cannot update deleted product");
		}
		
		if(request.getName()!=null) {
			product.setName(request.getName());
		}
		
		if(request.getPrice()!=null) {
			product.setPrice(request.getPrice());
		}
		
		if(request.getStockQty()!=null) {
			product.setStockQty(request.getStockQty());
		}
		
		if(request.getUnit()!=null) {
			product.setUnit(request.getUnit());
		}
		
		productRepository.save(product);
		
		return mapToResponse(product);
		
	}
    

    private ProductResponseDTO mapToResponse(Product product) {
        return mapper.map(product, ProductResponseDTO.class);
    }

	

	
	


    
    
}
