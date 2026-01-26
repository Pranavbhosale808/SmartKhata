package com.smartkhata.auth.service.impl;

import com.smartkhata.auth.dto.*;
import com.smartkhata.auth.entity.*;
import com.smartkhata.auth.repository.UserRepository;
import com.smartkhata.auth.repository.VendorRepository;
import com.smartkhata.common.exception.BadRequestException;
import com.smartkhata.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.smartkhata.auth.security.JwtUtil;


@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final VendorRepository vendorRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    @Override
    public AuthResponseDto ownerSignup(OwnerSignupDto dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        Vendor vendor = Vendor.builder()
                .shopName(dto.getShopName())
                .ownerName(dto.getOwnerName())
                .phone(dto.getPhone())
                .build();

        vendorRepository.save(vendor);

        User user = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(Role.OWNER)
                .vendor(vendor)
                .build();

        userRepository.save(user);

        return buildAuthResponse(user);
    }

    @Override
    public AuthResponseDto staffSignup(StaffSignupDto dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        Vendor vendor = vendorRepository.findById(dto.getVendorId())
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found"));

        User user = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .role(Role.STAFF)
                .vendor(vendor)
                .build();

        userRepository.save(user);

        return buildAuthResponse(user);
    }

    @Override
    public AuthResponseDto login(LoginDto dto) {

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid email or password");
        }

        return buildAuthResponse(user);
    }

    private AuthResponseDto buildAuthResponse(User user) {

        String token = jwtUtil.generateAccessToken(
                user.getId(),
                user.getVendor().getId(),
                user.getRole().name()
        );

        return AuthResponseDto.builder()
                .userId(user.getId())
                .vendorId(user.getVendor().getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .token(token)
                .build();
    }

}
