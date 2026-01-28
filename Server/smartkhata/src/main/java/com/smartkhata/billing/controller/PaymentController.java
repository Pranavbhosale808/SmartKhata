package com.smartkhata.billing.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartkhata.billing.dto.CashPaymentRequest;
import com.smartkhata.billing.dto.RazorpayOrderRequest;
import com.smartkhata.billing.dto.RazorpayOrderResponse;
import com.smartkhata.billing.dto.RazorpayVerifyRequest;
import com.smartkhata.billing.service.impl.PaymentService;
import com.smartkhata.common.response.ApiResponse;
import com.smartkhata.common.security.VendorContext;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping(
    	    value = "/cash",
    	    consumes = "application/json",
    	    produces = "application/json"
    	)
    	public ApiResponse<Void> cash(@RequestBody CashPaymentRequest dto) {

    	    System.out.println("👉 RAW BILL ID = " + dto.getBillId());
    	    System.out.println("👉 RAW AMOUNT = " + dto.getAmount());

    	    paymentService.recordCashPayment(dto, VendorContext.getVendorId());
    	    return ApiResponse.success(null);
    	}



    @PostMapping("/razorpay/verify")
    public ApiResponse<Void> verify(@RequestBody RazorpayVerifyRequest dto) {
        paymentService.verifyRazorpayPayment(dto, VendorContext.getVendorId());
        return ApiResponse.success(null);
    }
    
    @PostMapping("/razorpay/order")
    public ApiResponse<RazorpayOrderResponse> createOrder(
            @RequestBody RazorpayOrderRequest dto
    ) {
        return ApiResponse.success(
            paymentService.createRazorpayOrder(dto, VendorContext.getVendorId())
        );
    }

}
