package com.smartkhata.billing.service.impl;

import com.smartkhata.billing.dto.CashPaymentRequest;
import com.smartkhata.billing.dto.RazorpayOrderRequest;
import com.smartkhata.billing.dto.RazorpayOrderResponse;
import com.smartkhata.billing.dto.RazorpayVerifyRequest;

public interface PaymentService {

    void recordCashPayment(CashPaymentRequest dto, Long vendorId);

    void verifyRazorpayPayment(RazorpayVerifyRequest dto, Long vendorId);
 

    RazorpayOrderResponse createRazorpayOrder(RazorpayOrderRequest dto, Long vendorId);

}

