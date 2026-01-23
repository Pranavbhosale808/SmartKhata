package com.smartkhata.billing.repository;

import com.smartkhata.billing.pojo.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BillRepository extends JpaRepository<Bill, Integer> {

    List<Bill> findByVendorId(Integer vendorId);

    Optional<Bill> findByVendorIdAndInvoiceId(Integer vendorId, Integer invoiceId);
}
