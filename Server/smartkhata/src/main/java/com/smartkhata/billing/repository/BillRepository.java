package com.smartkhata.billing.repository;

import com.smartkhata.billing.entity.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface BillRepository extends JpaRepository<Bill, Long> {

    Page<Bill> findByVendorId(Long vendorId, Pageable pageable);

    Page<Bill> findByVendorIdAndStatus(
            Long vendorId,
            String status,
            Pageable pageable
    );

    Page<Bill> findByVendorIdAndBillDateBetween(
            Long vendorId,
            LocalDate start,
            LocalDate end,
            Pageable pageable
    );
}
