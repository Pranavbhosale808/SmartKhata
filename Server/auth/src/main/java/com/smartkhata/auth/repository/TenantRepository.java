package com.smartkhata.auth.repository;

import com.smartkhata.auth.entity.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TenantRepository extends JpaRepository<Tenant, Long> {
}
