package com.smartkhata.auth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vendors")
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String shopName;
    private String ownerName;
    private String phone;

    public Long getId() { return id; }
    public String getShopName() { return shopName; }
    public String getOwnerName() { return ownerName; }
    public String getPhone() { return phone; }

    public void setId(Long id) { this.id = id; }
    public void setShopName(String shopName) { this.shopName = shopName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
    public void setPhone(String phone) { this.phone = phone; }
}
