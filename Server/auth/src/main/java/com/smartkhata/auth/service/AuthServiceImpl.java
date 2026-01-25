package com.smartkhata.auth.service;

import com.smartkhata.auth.dto.LoginRequest;
import com.smartkhata.auth.dto.RegisterRequest;
import com.smartkhata.auth.dto.AuthResponse;
import com.smartkhata.auth.entity.Role;
import com.smartkhata.auth.entity.Tenant;
import com.smartkhata.auth.entity.User;
import com.smartkhata.auth.exception.DuplicateUserException;
import com.smartkhata.auth.exception.InvalidCredentialsException;
import com.smartkhata.auth.exception.UserNotFoundException;
import com.smartkhata.auth.repository.TenantRepository;
import com.smartkhata.auth.repository.UserRepository;
import com.smartkhata.auth.security.JwtService;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final TenantRepository tenantRepository;
    private final ModelMapper mapper;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository,
                           TenantRepository tenantRepository,
                           ModelMapper mapper,
                           JwtService jwtService,
                           PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.tenantRepository = tenantRepository;
        this.mapper = mapper;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    // ---------------- REGISTER SHOPKEEPER ----------------

    @Override
    public AuthResponse registerShopkeeper(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateUserException("Email already registered");
        }

        // 1. Create tenant (shop)
        Tenant tenant = new Tenant();
        tenant.setShopName(request.getShopName());
        tenant.setOwnerName(request.getName());

        Tenant savedTenant = tenantRepository.save(tenant);

        // 2. Create user (shopkeeper)
        User user = mapper.map(request, User.class);
        user.setRole(Role.SHOPKEEPER);
        user.setTenant(savedTenant);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);

        // 3. Generate JWT
        String token = jwtService.generateToken(
                savedUser.getId(),
                savedTenant.getId(),
                savedUser.getRole().name()
        );

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedTenant.getId(),
                savedUser.getRole().name()
        );
    }

    // ---------------- LOGIN ----------------

    @Override
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        String token = jwtService.generateToken(
                user.getId(),
                user.getTenant().getId(),
                user.getRole().name()
        );

        return new AuthResponse(
                token,
                user.getId(),
                user.getTenant().getId(),
                user.getRole().name()
        );
    }
}
