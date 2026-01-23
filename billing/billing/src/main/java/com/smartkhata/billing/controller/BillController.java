package com.smartkhata.billing.controller;

import com.smartkhata.billing.dto.*;
import com.smartkhata.billing.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors/{vendorId}/bills")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;

    @PostMapping
    public ResponseEntity<BillResponseDTO> create(
            @PathVariable Integer vendorId,
            @RequestBody BillRequestDTO dto) {

        return new ResponseEntity<>(
                billService.createBill(vendorId, dto),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<BillResponseDTO>> getAll(
            @PathVariable Integer vendorId) {

        return ResponseEntity.ok(
                billService.getBillsByVendor(vendorId)
        );
    }

    @GetMapping("/{invoiceId}")
    public ResponseEntity<BillResponseDTO> getOne(
            @PathVariable Integer vendorId,
            @PathVariable Integer invoiceId) {

        return ResponseEntity.ok(
                billService.getBill(vendorId, invoiceId)
        );
    }

    @PutMapping("/{invoiceId}")
    public ResponseEntity<BillResponseDTO> update(
            @PathVariable Integer vendorId,
            @PathVariable Integer invoiceId,
            @RequestBody BillRequestDTO dto) {

        return ResponseEntity.ok(
                billService.updateBill(vendorId, invoiceId, dto)
        );
    }

    @DeleteMapping("/{invoiceId}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer vendorId,
            @PathVariable Integer invoiceId) {

        billService.deleteBill(vendorId, invoiceId);
        return ResponseEntity.noContent().build();
    }
}
