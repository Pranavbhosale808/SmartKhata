package com.smartkhata.gateway.filter;

import com.smartkhata.gateway.util.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class JwtAuthGatewayFilter implements GlobalFilter, Ordered {

    private final JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange,
                             GatewayFilterChain chain) {

        String path = exchange.getRequest().getURI().getPath();

 
        if (exchange.getRequest().getMethod() == HttpMethod.OPTIONS) {
            return chain.filter(exchange);
        }

       
        if (path.startsWith("/auth")) {
            return chain.filter(exchange);
        }

        String authHeader =
                exchange.getRequest().getHeaders()
                        .getFirst(HttpHeaders.AUTHORIZATION);


        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return chain.filter(exchange); 
        }

        try {
            Claims claims = jwtUtil.extractClaims(authHeader.substring(7));

            ServerHttpRequest mutatedRequest =
                    exchange.getRequest()
                            .mutate()
                            .header("X-Tenant-Id", claims.get("tenantId").toString())
                            .header("X-Role", claims.get("role").toString())
                            .build();

            return chain.filter(
                    exchange.mutate().request(mutatedRequest).build()
            );

        } catch (Exception ex) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return chain.filter(exchange);
        }
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
