package com.smartkhata.billing.service.impl;

import com.smartkhata.billing.dto.BillCreateDto;
import com.smartkhata.billing.dto.BillDto;
import com.smartkhata.billing.dto.BillUpdateDto;
import com.smartkhata.billing.entity.Bill;
import com.smartkhata.billing.entity.BillItem;
import com.smartkhata.billing.repository.BillRepository;
import com.smartkhata.common.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional
public class BillServiceImpl implements BillService {

    private final BillRepository billRepository;
    private final ModelMapper mapper;

    @Override
    public BillDto create(BillCreateDto dto) {
        Bill bill = mapper.map(dto, Bill.class);
        return mapper.map(billRepository.save(bill), BillDto.class);
    }

    @Override
    public BillDto update(Long id, BillUpdateDto dto) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bill not found"));

        bill.setCustomerId(dto.getCustomerId());
        bill.setStatus(dto.getStatus());
        bill.setTotalAmount(dto.getTotalAmount());

        bill.getItems().clear();

        dto.getItems().forEach(itemDto -> {
            BillItem item = new BillItem();
            item.setBill(bill);
            item.setProductId(itemDto.getProductId());
            item.setDescription(itemDto.getDescription());
            item.setUnitPriceSnapshot(itemDto.getUnitPriceSnapshot());
            item.setQuantity(itemDto.getQuantity());
            item.setLineTotal(itemDto.getLineTotal());
            bill.getItems().add(item);
        });

        Bill savedBill = billRepository.save(bill);
        return mapper.map(savedBill, BillDto.class);
    }


    @Override
    public BillDto getById(Long id) {
        return mapper.map(
                billRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Bill not found")),
                BillDto.class
        );
    }

    @Override
    public void delete(Long id) {
        billRepository.deleteById(id);
    }

    @Override
    public Page<BillDto> getBills(Long vendorId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return billRepository.findByVendorId(vendorId, pageable)
                .map(b -> mapper.map(b, BillDto.class));
    }

    @Override
    public Page<BillDto> getBillsWithSort(
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

        return billRepository.findByVendorId(vendorId, pageable)
                .map(b -> mapper.map(b, BillDto.class));
    }

    @Override
    public Page<BillDto> getBillsByStatus(
            Long vendorId,
            String status,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        return billRepository
                .findByVendorIdAndStatus(vendorId, status, pageable)
                .map(b -> mapper.map(b, BillDto.class));
    }

    @Override
    public Page<BillDto> getBillsByDateRange(
            Long vendorId,
            LocalDate start,
            LocalDate end,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        return billRepository
                .findByVendorIdAndBillDateBetween(
                        vendorId, start, end, pageable
                )
                .map(b -> mapper.map(b, BillDto.class));
    }
}
