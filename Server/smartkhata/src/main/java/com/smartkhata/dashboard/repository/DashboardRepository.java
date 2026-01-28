//package com.smartkhata.dashboard.repository;
//
//import com.smartkhata.billing.entity.Bill;
//import com.smartkhata.billing.entity.BillItem;
////import com.smartkhata.payment.entity.Payment;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.Repository;
//
//import java.math.BigDecimal;
//import java.time.LocalDate;
//import java.util.List;
//
//public interface DashboardRepository extends Repository<Bill, Long> {
//
//    /* ------------------- STATS ------------------- */
//
//    @Query("""
//        SELECT COUNT(b)
//        FROM Bill b
//        WHERE b.vendorId = :vendorId
//    """)
//    Long totalBills(Long vendorId);
//
//    @Query("""
//        SELECT COUNT(b)
//        FROM Bill b
//        WHERE b.vendorId = :vendorId
//          AND b.status = 'PAID'
//    """)
//    Long paidBills(Long vendorId);
//
////    @Query("""
////        SELECT COALESCE(SUM(p.amount), 0)
////        FROM Payment p
////        WHERE p.vendorId = :vendorId
////          AND p.status = 'PAID'
////    """)
//    BigDecimal totalRevenue(Long vendorId);
//
//    @Query("""
//        SELECT COALESCE(SUM(b.totalAmount), 0)
//        FROM Bill b
//        WHERE b.vendorId = :vendorId
//          AND b.status = 'CREDIT'
//    """)
//    BigDecimal pendingCredit(Long vendorId);
//
//    /* ------------------- REVENUE CHART ------------------- */
//
////    @Query("""
////    	    SELECT FUNCTION('MONTHNAME', b.billDate),
////    	           SUM(p.amount)
////    	    FROM Payment p
////    	    JOIN p.bill b
////    	    WHERE b.vendorId = :vendorId
////    	      AND p.status = 'PAID'
////    	      AND b.billDate BETWEEN :from AND :to
////    	    GROUP BY FUNCTION('MONTHNAME', b.billDate),
////    	             FUNCTION('MONTH', b.billDate)
////    	    ORDER BY FUNCTION('MONTH', b.billDate)
////    	""")
////    	List<Object[]> revenueChart(
////    	        Long vendorId,
////    	        LocalDate from,
////    	        LocalDate to
////    	);
//
//
//    /* ------------------- TOP PRODUCTS ------------------- */
//
//    @Query("""
//        SELECT i.productId, SUM(i.quantity)
//        FROM BillItem i
//        JOIN i.bill b
//        WHERE b.vendorId = :vendorId
//        GROUP BY i.productId
//        ORDER BY SUM(i.quantity) DESC
//    """)
//    List<Object[]> topProducts(Long vendorId);
//
//    /* ------------------- PAYMENT METHODS ------------------- */
//
////    @Query("""
////        SELECT p.method, COUNT(p)
////        FROM Payment p
////        WHERE p.vendorId = :vendorId
////          AND p.status = 'PAID'
////        GROUP BY p.method
////    """)
////    List<Object[]> paymentMethods(Long vendorId);
//}
