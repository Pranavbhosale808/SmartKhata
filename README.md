# Billing and Credit Tracking System

A simple and efficient **Invoice & Customer Credit Management System** designed for small businesses and shopkeepers.  
This system helps vendors **create itemized bills, manage products, track customer dues (owe/credit)**, and record payments — including partial payments.

---

## 🧾 Features

| Module | Key Features |
|-------|-------------|
| **Product Management** | Add, edit, delete, and view products with pricing and stock details. |
| **Customer Management** | Store customer details and track individual outstanding balances. |
| **Invoice / Billing** | Create invoices with multiple products, auto-calculate totals. |
| **Credit Tracking (Owe)** | If a customer does not pay immediately, mark invoice as **Owed**. |
| **Payments** | Record cash/UPI/card payments later (full or partial). |
| **Ledger View** | See list of customers who owe money and how much they owe. |
| **Invoice History** | View past invoices with status: PAID / OWED / PARTIAL. |
| **Sales Reporting (Basic)** | Track total sales and total dues. |

---

## 🧠 System Workflow (Simple Explanation)

1. **Vendor Logs In**
2. Vendor **adds products** once (e.g., Milk, Rice, Soap, etc.)
3. When customer purchases:
   - Vendor selects customer (or selects **Guest**)
   - Selects products & quantities
   - System calculates total → Generates **Invoice**
4. If customer **pays immediately** → mark invoice **PAID**
5. If customer says **“I will pay later”** → mark invoice **OWED**
6. Vendor can later **record full/partial payments**
7. Vendor can view:
   - Outstanding balances
   - Who owes what
   - Total daily/weekly/monthly sales

---

## 🗂 Database Design (Core Tables)

| Table Name        | Description |
|-------------------|-------------|
| **users**         | Stores personal and contact information for any person in the system (vendors or customers). |
| **vendors**       | Represents a business/shop and links to a user; owns products, customers, and invoices. |
| **customers**     | Stores vendor-specific customer profiles for billing and credit/owe tracking. |
| **products**      | Contains all products created by a vendor, including name, unit, and price. |
| **invoices**      | Represents a sale/invoice with totals, status (paid/partial/owed), and customer reference. |
| **invoice_items** | Stores line-item product details within each invoice (snapshot of qty, price, description). |
| **payments**      | Records all payments made toward invoices; supports partial and multiple payments. |




