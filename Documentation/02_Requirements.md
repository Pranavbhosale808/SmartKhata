# Requirements

## 1. Purpose
This document lists the functional and non-functional requirements for SmartKhata+.  
It explains what the system must do and the quality targets it should meet.

## 2. Functional Requirements (FR)
FR-01: Vendor signup & login
- Vendors can register and log in.
- Vendors have a profile (business name, merchant VPA).

FR-02: Product management
- Vendor can add, edit, delete, and list products.
- Product fields: name, SKU (optional), unit, price, stock (optional).

FR-03: Customer management
- Vendor can add, edit, delete, and list customers.
- Customer fields: name, phone, email, address (optional).

FR-04: Invoice creation
- Vendor can create an invoice by selecting products and quantities.
- System calculates subtotal, tax (if any), discounts, and total.

FR-05: Pay now / Add to Owe
- Vendor can choose to accept payment now or mark the invoice as owed (credit).
- If owed, invoice is saved as pending in the customer ledger.

FR-06: Payments
- Vendor can record payments (cash, UPI, card, other).
- Partial payments allowed; multiple payments against one invoice.

FR-07: Invoice history & detail
- Vendor can view a list of invoices and open invoice details (items, payments, status).

FR-08: Owe / Ledger view
- Vendor can view per-customer outstanding balances and owed invoices.
- Vendor can send manual reminders (SMS/WhatsApp) — optional integration.

FR-09: Reports & Analytics
- Vendor dashboard shows daily/weekly/monthly sales and total outstanding.
- Simple top-products and top-customers summary.

FR-10: Admin features
- Admin can view vendor list and generate aggregated reports (per vendor or global).
- Admin can generate reports (daily/monthly) and view metadata.

## 3. Non-Functional Requirements (NFR)
NFR-01: Performance
- Typical API responses should be < 300ms under light load.

NFR-02: Security
- All APIs require authentication (JWT).
- Passwords stored hashed.
- Vendor data isolation: vendors must only access their own data.

NFR-03: Reliability
- Database backups once per day (or scheduled by hosting).
- Basic logging for errors.

NFR-04: Scalability
- App should be deployable in containers (Docker) and scale horizontally.

NFR-05: Usability
- UI must be simple and usable on a phone and a desktop.

## 4. Acceptance Criteria (Examples)
- After creating an invoice and recording full payment, invoice status is PAID and outstanding is 0.
- If vendor marks invoice as owed, it appears in the customer's ledger and increases outstanding.
- Partial payment reduces outstanding and marks invoice as PARTIAL until paid fully.
- Product list shows newly added products immediately.

## 5. Priority (MVP first)
High (MVP):
- Vendor signup/login
- Product CRUD
- Create invoice (Pay Now / Add to Owe)
- Record payments (partial/full)
- Invoice history and customer ledger
- Dashboard with basic sales & outstanding

Medium:
- Export invoices (PDF/CSV)
- SMS/WhatsApp reminders (integration)
- Stock management

Low:
- Multi-tenant billing plans, subscription support
- Advanced analytics & predictive features

## 6. Notes & Constraints
- Use numeric(12,2) for money values (avoid floats).
- Customer on an invoice can be null (guest sale).
- Invoice snapshot: copy product name and unit_price to invoice_items for historical accuracy.