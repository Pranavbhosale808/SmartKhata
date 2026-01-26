package com.smartkhata.auth.dto;

public class RegisterRequest {
    private String shopName;
    private String name;
    private String email;
    private String password;

    public String getShopName() { return shopName; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }

    public void setShopName(String shopName) { this.shopName = shopName; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
}
