package com.smartkhata.auth.service;

import com.smartkhata.auth.dto.LoginRequest;
import com.smartkhata.auth.dto.RegisterRequest;
import com.smartkhata.auth.dto.AuthResponse;

public interface AuthService {

    AuthResponse registerShopkeeper(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}
