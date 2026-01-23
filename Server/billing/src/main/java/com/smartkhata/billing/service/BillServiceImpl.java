package com.smartkhata.billing.service;

import com.smartkhata.billing.dto.*;
import com.smartkhata.billing.exception.ResourceNotFoundException;
import com.smartkhata.billing.pojo.Bill;
import com.smartkhata.billing.pojo.BillItem;
import com.smartkhata.billing.repository.BillRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BillServiceImpl implements BillService {

    private final BillRepository billRepository;
    private final ModelMapper mapper;

    @Override
    public BillResponseDTO createBill(Integer vendorId, BillRequestDTO dto) {

        Bill bill = mapper.map(dto, Bill.class);
        bill.setVendorId(vendorId);

        if (bill.getItems() != null) {
            bill.getItems().forEach(item -> item.setBill(bill));
        }

        return mapper.map(billRepository.save(bill), BillResponseDTO.class);
    }

    @Override
    public List<BillResponseDTO> getBillsByVendor(Integer vendorId) {
        return billRepository.findByVendorId(vendorId)
                .stream()
                .map(b -> mapper.map(b, BillResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public BillResponseDTO getBill(Integer vendorId, Integer invoiceId) {

        Bill bill = billRepository
                .findByVendorIdAndInvoiceId(vendorId, invoiceId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Bill not found for vendor"));

        return mapper.map(bill, BillResponseDTO.class);
    }

    @Override
    public BillResponseDTO updateBill(Integer vendorId, Integer invoiceId, BillRequestDTO dto) {

        Bill bill = billRepository
                .findByVendorIdAndInvoiceId(vendorId, invoiceId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Bill not found for vendor"));

        mapper.map(dto, bill);
        bill.getItems().clear();

        if (dto.getItems() != null) {
            dto.getItems().forEach(i -> {
                BillItem item = mapper.map(i, BillItem.class);
                item.setBill(bill);
                bill.getItems().add(item);
            });
        }

        return mapper.map(billRepository.save(bill), BillResponseDTO.class);
    }

    @Override
    public void deleteBill(Integer vendorId, Integer invoiceId) {

        Bill bill = billRepository
                .findByVendorIdAndInvoiceId(vendorId, invoiceId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Bill not found for vendor"));

        billRepository.delete(bill);
    }
}
