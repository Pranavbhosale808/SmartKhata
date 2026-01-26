package com.smartkhata.billing.repository;

import com.smartkhata.billing.entity.BillItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillItemRepository extends JpaRepository<BillItem, Long> {

    List<BillItem> findByBillBillId(Long billId);

    List<BillItem> findByProductId(Long productId);
}
