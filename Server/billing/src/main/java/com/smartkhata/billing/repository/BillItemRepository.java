package com.smartkhata.billing.repository;

import com.smartkhata.billing.pojo.BillItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillItemRepository extends JpaRepository<BillItem, Integer> {
}
