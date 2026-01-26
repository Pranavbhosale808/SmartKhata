package com.smartkhata.billing.service.impl;

import com.smartkhata.billing.dto.BillItemDto;
import com.smartkhata.billing.entity.BillItem;
import com.smartkhata.billing.repository.BillItemRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BillItemServiceImpl implements BillItemService {

    private final BillItemRepository billItemRepository;
    private final ModelMapper mapper;

    @Override
    public BillItemDto create(BillItemDto dto) {
        BillItem item = mapper.map(dto, BillItem.class);
        return mapper.map(billItemRepository.save(item), BillItemDto.class);
    }

    @Override
    public List<BillItemDto> getByBill(Long billId) {
        return billItemRepository.findByBillBillId(billId)
                .stream()
                .map(i -> mapper.map(i, BillItemDto.class))
                .toList();
    }

    @Override
    public void delete(Long id) {
        billItemRepository.deleteById(id);
    }
}
