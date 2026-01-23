package com.smartkhata.billing.service;

import com.smartkhata.billing.dto.*;

import java.util.List;

public interface BillService {

    BillResponseDTO createBill(Integer vendorId, BillRequestDTO dto);

    List<BillResponseDTO> getBillsByVendor(Integer vendorId);

    BillResponseDTO getBill(Integer vendorId, Integer invoiceId);

    BillResponseDTO updateBill(Integer vendorId, Integer invoiceId, BillRequestDTO dto);

    void deleteBill(Integer vendorId, Integer invoiceId);
}
