package com.smartkhata.billing.service.impl;

import org.springframework.stereotype.Service;

import com.smartkhata.billing.dto.CashPaymentRequest;
import com.smartkhata.billing.dto.RazorpayOrderRequest;
import com.smartkhata.billing.dto.RazorpayOrderResponse;
import com.smartkhata.billing.dto.RazorpayVerifyRequest;
import com.smartkhata.billing.entity.Bill;
import com.smartkhata.billing.entity.Payment;
import com.smartkhata.billing.repository.BillRepository;
import com.smartkhata.billing.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import java.math.BigDecimal;

import org.json.JSONObject;


@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final BillRepository billRepository;
    private final PaymentRepository paymentRepository;
    private final RazorpayClient razorpayClient;


    @Override
    public void recordCashPayment(CashPaymentRequest dto, Long vendorId) {

        Bill bill = billRepository
            .findByBillIdAndVendorId(dto.getBillId(), vendorId)
            .orElseThrow();

        Payment p = new Payment();
        p.setVendorId(vendorId);
        p.setBill(bill);
        p.setAmount(dto.getAmount());
        p.setMethod("CASH");
        p.setStatus("SUCCESS");

        paymentRepository.save(p);

        bill.setStatus("PAID");
        billRepository.save(bill);
    }

    @Override
    public void verifyRazorpayPayment(RazorpayVerifyRequest dto, Long vendorId) {

        Bill bill = billRepository
            .findByBillIdAndVendorId(dto.getBillId(), vendorId)
            .orElseThrow();

        // ✅ TODO (real step in next message):
        // verify signature using Razorpay SDK

        Payment p = new Payment();
        p.setVendorId(vendorId);
        p.setBill(bill);
        p.setAmount(bill.getTotalAmount());
        p.setMethod("RAZORPAY");
        p.setRazorpayOrderId(dto.getRazorpayOrderId());
        p.setRazorpayPaymentId(dto.getRazorpayPaymentId());
        p.setRazorpaySignature(dto.getRazorpaySignature());
        p.setStatus("SUCCESS");

        paymentRepository.save(p);

        bill.setStatus("PAID");
        billRepository.save(bill);
    }
    
    @Override
    public RazorpayOrderResponse createRazorpayOrder(RazorpayOrderRequest dto, Long vendorId) {

        System.out.println("👉 Razorpay order start");

        Bill bill = billRepository
                .findByBillIdAndVendorId(dto.getBillId(), vendorId)
                .orElseThrow(() -> new RuntimeException("Bill not found"));

        try {
            JSONObject options = new JSONObject();
            options.put("amount", dto.getAmount().multiply(new BigDecimal(100)).intValue());
            options.put("currency", "INR");
            options.put("receipt", "bill_" + bill.getBillId());

            System.out.println("👉 Sending to Razorpay: " + options);

            Order order = razorpayClient.orders.create(options);

            System.out.println("👉 Razorpay response: " + order);

            bill.setLatestPaymentOrderId(order.get("id"));
            billRepository.save(bill);

            return RazorpayOrderResponse.builder()
                    .orderId(order.get("id"))
                    .currency(order.get("currency"))
                    .amount(order.get("amount"))
                    .razorpayKey("rzp_test_xxxxx")
                    .build();

        } catch (Exception e) {
            e.printStackTrace(); // 🔥 THIS LINE IS IMPORTANT
            throw new RuntimeException("Razorpay order creation failed");
        }
    }


}

