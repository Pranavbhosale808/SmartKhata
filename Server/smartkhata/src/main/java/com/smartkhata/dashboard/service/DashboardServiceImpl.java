//package com.smartkhata.dashboard.service;
//
//import com.smartkhata.dashboard.dto.*;
//import com.smartkhata.dashboard.repository.DashboardRepository;
//import com.smartkhata.dashboard.service.DashboardService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class DashboardServiceImpl implements DashboardService {
//
//    private final DashboardRepository repo;
//
//    @Override
//    public DashboardStatsDto getStats(Long vendorId) {
//        return DashboardStatsDto.builder()
//                .totalBills(repo.totalBills(vendorId))
//                .paidBills(repo.paidBills(vendorId))
//                .totalRevenue(repo.totalRevenue(vendorId))
//                .pendingCredit(repo.pendingCredit(vendorId))
//                .build();
//    }
//
////    @Override
////    public List<RevenueChartDto> getRevenueChart(
////            Long vendorId,
////            LocalDate from,
////            LocalDate to
////    ) {
////        return repo.revenueChart(vendorId, from, to)
////                .stream()
////                .map(r -> RevenueChartDto.builder()
////                        .month(r[0].toString())
////                        .amount((java.math.BigDecimal) r[1])
////                        .build())
////                .toList();
////    }
//
//    @Override
//    public List<TopProductDto> getTopProducts(Long vendorId) {
//        return repo.topProducts(vendorId)
//                .stream()
//                .map(r -> TopProductDto.builder()
//                        .productId((Long) r[0])
//                        .quantity((Long) r[1])
//                        .build())
//                .toList();
//    }
//
////    @Override
////    public List<PaymentMethodDto> getPaymentMethods(Long vendorId) {
////        return repo.paymentMethods(vendorId)
////                .stream()
////                .map(r -> PaymentMethodDto.builder()
////                        .name(r[0].toString())
////                        .value((Long) r[1])
////                        .build())
////                .toList();
////    }
//
//    @Override
//    public List<AlertDto> getAlerts(Long vendorId) {
//        return List.of(
//                new AlertDto("Pending credit exceeds safe limit"),
//                new AlertDto("Multiple partial payments detected"),
//                new AlertDto("High revenue concentration in top products")
//        );
//    }
//}
