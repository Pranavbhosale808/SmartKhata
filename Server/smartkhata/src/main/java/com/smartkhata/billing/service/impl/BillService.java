package com.smartkhata.billing.service.impl;

import com.smartkhata.billing.dto.BillCreateDto;
import com.smartkhata.billing.dto.BillDto;
import com.smartkhata.billing.dto.BillUpdateDto;

import org.springframework.data.domain.Page;

import java.time.LocalDate;

public interface BillService {

    BillDto create(BillCreateDto dto);

    BillDto update(Long id, BillUpdateDto  dto);

    BillDto getById(Long id);

    void delete(Long id);

    Page<BillDto> getBills(
            Long vendorId,
            int page,
            int size
    );

    Page<BillDto> getBillsWithSort(
            Long vendorId,
            int page,
            int size,
            String sortBy,
            String sortDir
    );

    Page<BillDto> getBillsByStatus(
            Long vendorId,
            String status,
            int page,
            int size
    );

    Page<BillDto> getBillsByDateRange(
            Long vendorId,
            LocalDate start,
            LocalDate end,
            int page,
            int size
    );
}
