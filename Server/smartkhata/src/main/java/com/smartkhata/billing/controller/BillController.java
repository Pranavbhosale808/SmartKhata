package com.smartkhata.billing.controller;

import com.smartkhata.billing.dto.BillCreateDto;
import com.smartkhata.billing.dto.BillDto;
import com.smartkhata.billing.dto.BillUpdateDto;
import com.smartkhata.billing.service.impl.BillService;
import com.smartkhata.common.response.ApiResponse;
import com.smartkhata.common.response.PageResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/bills")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;

    @PostMapping
    public ApiResponse<BillDto> create(@Valid @RequestBody BillCreateDto dto) {
        return ApiResponse.<BillDto>builder()
                .success(true)
                .message("Bill created")
                .data(billService.create(dto))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<BillDto> getById(@PathVariable Long id) {
        return ApiResponse.<BillDto>builder()
                .success(true)
                .message("Bill fetched")
                .data(billService.getById(id))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<BillDto> update(
            @PathVariable Long id,
            @RequestBody BillUpdateDto  dto
    ) {
        return ApiResponse.<BillDto>builder()
                .success(true)
                .message("Bill updated")
                .data(billService.update(id, dto))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        billService.delete(id);
        return ApiResponse.<Void>builder()
                .success(true)
                .message("Bill deleted")
                .build();
    }

    @GetMapping
    public ApiResponse<PageResponse<BillDto>> getBills(
            @RequestParam Long vendorId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "billDate") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Page<BillDto> billPage =
                billService.getBillsWithSort(
                        vendorId, page, size, sortBy, sortDir
                );

        return buildPageResponse(billPage, "Bills fetched");
    }

    @GetMapping("/status")
    public ApiResponse<PageResponse<BillDto>> getByStatus(
            @RequestParam Long vendorId,
            @RequestParam String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<BillDto> billPage =
                billService.getBillsByStatus(
                        vendorId, status, page, size
                );

        return buildPageResponse(billPage, "Bills by status fetched");
    }

    @GetMapping("/date-range")
    public ApiResponse<PageResponse<BillDto>> getByDateRange(
            @RequestParam Long vendorId,
            @RequestParam LocalDate start,
            @RequestParam LocalDate end,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<BillDto> billPage =
                billService.getBillsByDateRange(
                        vendorId, start, end, page, size
                );

        return buildPageResponse(billPage, "Bills by date fetched");
    }

    private ApiResponse<PageResponse<BillDto>> buildPageResponse(
            Page<BillDto> page,
            String message
    ) {
        PageResponse<BillDto> response =
                PageResponse.<BillDto>builder()
                        .content(page.getContent())
                        .page(page.getNumber())
                        .size(page.getSize())
                        .totalElements(page.getTotalElements())
                        .totalPages(page.getTotalPages())
                        .last(page.isLast())
                        .build();

        return ApiResponse.<PageResponse<BillDto>>builder()
                .success(true)
                .message(message)
                .data(response)
                .build();
    }
}
