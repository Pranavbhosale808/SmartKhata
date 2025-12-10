-- File: smartkhata_minimal.sql
-- Minimal SmartKhata+ schema + tiny sample data
CREATE DATABASE IF NOT EXISTS smartkhata_minimal;
USE smartkhata_minimal;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS invoice_items;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS vendors;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- users (basic)
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(200) UNIQUE,
  password_hash VARCHAR(255) -- optional for now
) ENGINE=InnoDB;

-- vendors (linked to a user)
CREATE TABLE vendors (
  vendor_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  address VARCHAR(300),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- customers (can be guest if needed by keeping a simple record)
CREATE TABLE customers (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  vendor_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(200),
  FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- products
CREATE TABLE products (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  vendor_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- invoices (basic totals only)
CREATE TABLE invoices (
  invoice_id INT AUTO_INCREMENT PRIMARY KEY,
  vendor_id INT NOT NULL,
  customer_id INT NULL,
  invoice_number VARCHAR(100) NOT NULL,
  invoice_date DATE NOT NULL,
  total_amount DECIMAL(12,2) DEFAULT 0.00,
  status VARCHAR(50) DEFAULT 'DRAFT', -- e.g. DRAFT, SENT, PAID, PARTIAL
  FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE SET NULL,
  UNIQUE KEY uq_vendor_invoice (vendor_id, invoice_number)
) ENGINE=InnoDB;

-- invoice items (keep snapshots of price at sale)
CREATE TABLE invoice_items (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_id INT NOT NULL,
  product_id INT NULL,
  description VARCHAR(255),
  unit_price_snapshot DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  line_total DECIMAL(12,2) NOT NULL,
  FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- payments (simple partial payments)
CREATE TABLE payments (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_id INT NOT NULL,
  payment_date DATE NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  method VARCHAR(50),
  FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- SIMPLE SAMPLE DATA (lightweight)

-- users
INSERT INTO users (name, email, password_hash)
VALUES ('Amit Sharma', 'amit@example.com', 'pw_hash_example'),
       ('Ravi Kumar', 'ravi@example.com', NULL);

-- vendor for user_id = 1
INSERT INTO vendors (user_id, name, address)
VALUES (1, 'Amit Traders', '123 Market St');

-- customers (one registered, one guest-like)
INSERT INTO customers (vendor_id, name, phone, email)
VALUES (1, 'Ravi Kumar', '9123456780', 'ravi@example.com'),
       (1, 'Guest Customer', NULL, NULL);

-- products
INSERT INTO products (vendor_id, name, unit_price, stock)
VALUES (1, 'Plain Notebook', 50.00, 100),
       (1, 'Ball Pen', 10.00, 500);

-- invoice (vendor_id=1, customer_id=1)
INSERT INTO invoices (vendor_id, customer_id, invoice_number, invoice_date, total_amount, status)
VALUES (1, 1, 'INV-0001', '2025-12-01', 168.00, 'SENT');

-- invoice items (manually set line_total)
INSERT INTO invoice_items (invoice_id, product_id, description, unit_price_snapshot, quantity, line_total)
VALUES
 (1, 1, 'Plain Notebook - 2 qty', 50.00, 2, 112.00),
 (1, 2, 'Ball Pen - 5 qty', 10.00, 5, 56.00);

-- payment (partial)
INSERT INTO payments (invoice_id, payment_date, amount, method)
VALUES (1, '2025-12-02', 100.00, 'CASH');

-- (Optional) update invoice totals manually if you change items/payments
UPDATE invoices
SET total_amount = (SELECT IFNULL(SUM(line_total),0) FROM invoice_items WHERE invoice_items.invoice_id = invoices.invoice_id)
WHERE invoice_id = 1;

-- Quick check
SELECT i.invoice_id, i.invoice_number, i.total_amount, i.status,
       (SELECT IFNULL(SUM(amount),0) FROM payments p WHERE p.invoice_id = i.invoice_id) as paid_amount
FROM invoices i WHERE i.invoice_id = 1;
