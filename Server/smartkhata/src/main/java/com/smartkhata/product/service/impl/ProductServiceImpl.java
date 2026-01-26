package com.smartkhata.product.service.impl;

import com.smartkhata.common.exception.ResourceNotFoundException;
import com.smartkhata.product.dto.ProductDto;
import com.smartkhata.product.dto.ProductUpdateDto;
import com.smartkhata.product.entity.Product;
import com.smartkhata.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ModelMapper mapper;

    // CREATE
    @Override
    public ProductDto create(ProductDto dto) {
        Product product = mapper.map(dto, Product.class);
        return mapper.map(productRepository.save(product), ProductDto.class);
    }

    // UPDATE
    @Override
    public ProductDto update(Long id, ProductUpdateDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());

        return mapper.map(productRepository.save(product), ProductDto.class);
    }


    // DELETE
    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    // PAGINATION (BASIC)
    @Override
    public Page<ProductDto> getProductsByVendor(
            Long vendorId,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        return productRepository.findByVendorId(vendorId, pageable)
                .map(p -> mapper.map(p, ProductDto.class));
    }

    // PAGINATION + SORTING
    @Override
    public Page<ProductDto> getProductsWithSort(
            Long vendorId,
            int page,
            int size,
            String sortBy,
            String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return productRepository.findByVendorId(vendorId, pageable)
                .map(p -> mapper.map(p, ProductDto.class));
    }

    // SEARCH BY NAME
    @Override
    public Page<ProductDto> searchProducts(
            Long vendorId,
            String keyword,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        return productRepository
                .findByVendorIdAndNameContainingIgnoreCase(
                        vendorId, keyword, pageable
                )
                .map(p -> mapper.map(p, ProductDto.class));
    }

    //FILTER BY PRICE RANGE
    @Override
    public Page<ProductDto> filterByPrice(
            Long vendorId,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        return productRepository
                .findByVendorIdAndPriceBetween(
                        vendorId, minPrice, maxPrice, pageable
                )
                .map(p -> mapper.map(p, ProductDto.class));
    }

    // LOW STOCK (PAGINATED)
    @Override
    public Page<ProductDto> getLowStockProducts(
            Long vendorId,
            Integer threshold,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        return productRepository
                .findLowStockProducts(vendorId, threshold, pageable)
                .map(p -> mapper.map(p, ProductDto.class));
    }
}
