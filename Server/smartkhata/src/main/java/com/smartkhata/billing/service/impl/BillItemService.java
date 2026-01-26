package com.smartkhata.billing.service.impl;

import com.smartkhata.billing.dto.BillItemDto;

import java.util.List;

public interface BillItemService {

    BillItemDto create(BillItemDto dto);

    List<BillItemDto> getByBill(Long billId);

    void delete(Long id);
}
