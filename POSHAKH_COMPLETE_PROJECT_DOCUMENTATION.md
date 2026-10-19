# 👑 POSHAKH (પોશાક / पोशाक)
## Luxury Ethnic Wear Rental & Royal Couture Marketplace
### Comprehensive Technical Documentation & Project Guide

---

* **Project Title:** POSHAKH – Peer-to-Peer Luxury Ethnic Wear Rental Platform
* **Academic Institution:** L.J. Institute of Computer Applications (LJCCA)
* **Domain:** E-Commerce, Fashion-Tech, Circular Sharing Economy
* **Architecture:** Vanilla Web Architecture (HTML5, CSS3 Luxury Design System, ES6+ Modular JS, Node.js HTTP Daemon)
* **Target Audience:** Brides, Grooms, Wedding Guests, Festive Revelers (Renters) & Verified Ethnic Boutiques / Wardrobe Owners (Lenders)
* **Supervised & Governed By:** Platform Administrator

---

## 📑 TABLE OF CONTENTS

1. [Executive Summary (प्रोजेक्ट का परिचय)](#1-executive-summary)
2. [Problem Statement & The Solution (समस्या और समाधान)](#2-problem-statement--the-solution)
3. [User Roles & Access Control - RBAC (यूजर रोल्स और अनुमतियां)](#3-user-roles--access-control---rbac)
4. [Technology Stack & Rationale (तकनीकी स्टैक)](#4-technology-stack--rationale)
5. [Codebase & Directory Breakdown (हर फ़ाइल का विस्तृत विवरण)](#5-codebase--directory-breakdown)
6. [Database Schema & Data Vault (डेटाबेस टेबल्स और स्कीमा)](#6-database-schema--data-vault)
7. [Step-by-Step Functional Workflows (यह कैसे काम करता है)](#7-step-by-step-functional-workflows)
8. [Setup & Execution Instructions (प्रोजेक्ट चलाने के स्टेप्स)](#8-setup--execution-instructions)
9. [Viva Defense Questions & Answers (Viva तैयारी गाइड)](#9-viva-defense-questions--answers)

---

## 1. EXECUTIVE SUMMARY

**POSHAKH** is an interactive, full-stack digital web platform designed to solve the high economic cost and low utilization of high-end Indian ethnic wear (such as Royal Bridal Lehengas, Patola Sarees, Designer Sherwanis, and Handcrafted Kutch Chaniya Cholis).

### 💡 Core Vision
- **"Wear the celebration, return the rest."**
- A bride or groom spends ₹50,000 to ₹1,50,000 on an outfit worn for only 6 hours during a wedding. After that night, it sits idle in a trunk for years.
- POSHAKH provides a high-trust digital marketplace where:
  1. **Renters** can wear authentic, royal designer outfits for 3, 5, or 7 days at a tiny fraction (8%–12%) of the retail purchase price.
  2. **Boutiques & Wardrobe Owners (Lenders)** can list their idle couture to earn recurring rental income and monetize idle fashion assets.
  3. **Security Deposit Escrow** ensures lenders' garments are financially protected, and renters are guaranteed prompt refunds post-inspection.
  4. **Super Admin** oversees verification, platform analytics, and dispute mediation.

---

## 2. PROBLEM STATEMENT & THE SOLUTION

### 🔴 The Traditional Offline Dilemma (Before Poshakh)
1. **Astronomical Capital Waste:** Families spend ₹40,000 to ₹1,50,000 on garments that lose 95% of their utility post-event.
2. **Zero Escrow Protection:** Local unorganized rental shops take cash deposits with zero formal contracts. Deductions for minor wear-and-tear are common and cannot be challenged.
3. **Severe Localized Isolation:** Master weavers and regional artisans in Surat, Kutch, or Patan cannot access renters outside their physical neighborhood.
4. **Sizing & Fitting Ambiguity:** Customers travel from shop to shop without knowing what is in stock or if custom fittings are supported.

### 🟢 The Poshakh Digital Solution (After Poshakh)
1. **Affordable Royalty (85%+ Savings):** Rent a ₹65,000 bridal lehenga for just ₹3,800.
2. **Deterministic Security Escrow:** Refundable security deposits are calculated transparently and held securely until the boutique confirms condition upon return.
3. **Direct Boutique Chat:** Renters chat directly with boutique owners to verify measurements, blouse margins, and delivery tracking.
4. **Automated Role Governance:** Admins resolve disputes impartially with photographic damage verification.

---

## 3. USER ROLES & ACCESS CONTROL - RBAC

The system enforces strict Role-Based Access Control (RBAC) across three distinct personas:

```
                  ┌─────────────────────────────────────────┐
                  │          POSHAKH PLATFORM               │
                  └────────────────────┬────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
   [ RENTER ]                  [ BOUTIQUE LENDER ]           [ SUPER ADMIN ]
  (Customer / Buyer)             (Wardrobe Partner)            (Platform Governor)
  • Browse Catalog              • Boutique Storefront          • Full Platform Audit
  • Select 3/5/7-Day Dates      • List & Price Dresses         • Mediate Disputes
  • Pay Rent + Deposit Escrow   • Manage Rental Orders         • Release/Deduct Escrow
  • Chat with Boutique          • Inspect Returned Garments    • Verify Boutiques
  • Submit Return & Reviews     • Track Rental Revenue         • Global Metrics
```

### Detailed Capability Matrix

| Feature / Action | Renter | Boutique Lender | Super Admin |
|---|:---:|:---:|:---:|
| Browse & Search Catalog | ✅ | ✅ | ✅ |
| Filter by Occasion, Fabric, Price | ✅ | ✅ | ✅ |
| Book Outfit & Select Rental Dates | ✅ | ❌ | ❌ |
| Pay Rental Fee + Escrow Deposit | ✅ | ❌ | ❌ |
| Create & Edit Boutique Profile | ❌ | ✅ | ✅ (Audit) |
| Add / Delete / Toggle Dress Outfits | ❌ | ✅ | ✅ |
| Update Order Dispatch / Courier Tracking | ❌ | ✅ | ❌ |
| Direct In-App Chat Messaging | ✅ (with Lender) | ✅ (with Renter) | ✅ (Audit) |
| Inspect Garment Return Condition | ❌ | ✅ | ❌ |
| Arbitrate Disputes & Deduct Deposit | ❌ | ❌ | ✅ |
| View Platform Analytics & Total GMV | ❌ | Partial (Own Earnings) | ✅ (Global) |

---

## 4. TECHNOLOGY STACK & RATIONALE

| Layer | Technology | Why Chosen? (Technical Rationale) |
|---|---|---|
| **User Interface (UI)** | **HTML5 (Semantic)** | Ensures accessible, SEO-compliant, semantic DOM structures with unique element IDs for testability. |
| **Styling System** | **Vanilla CSS3 Custom Design System** | High-performance luxury aesthetics without bulky external frameworks. Built with CSS Variables (`--gold-primary`, `--maroon-royal`, `--ease-luxury`), glassmorphism, responsive CSS Grid, and fluid typography. |
| **Client-Side Logic** | **Modular Vanilla ES6+ JavaScript** | Lightning-fast execution, zero build-step overhead, native module imports, and immediate event-driven DOM updates. |
| **Persistence Layer** | **Browser LocalStorage & Session Engine** | Provides zero-latency client-side data persistence for user authentication, dress inventories, order histories, chat messages, and dispute logs. |
| **Server Runtime** | **Node.js Built-in HTTP Daemon (`server.js`)** | Zero-dependency, native HTTP server with automatic MIME-type resolution, path traversal security, and clean URL routing. |

---

## 5. CODEBASE & DIRECTORY BREAKDOWN

```
d:\poshakh/
│
├── index.html               # Luxury Landing Page & Hero Showcase
├── shop.html                # Product Catalog with Multi-Filter Engine
├── product.html             # Detailed Outfit Page, Date Picker & Pricing
├── checkout.html            # Rental Date Confirmation & Escrow Checkout
├── rentals.html             # Customer Active Rentals & History Hub
├── chat.html                # Direct Buyer-Lender Real-Time Messaging
├── account.html             # User Profile, Saved Addresses & Settings
├── lender-dashboard.html    # Boutique Partner Command Center & Earnings
├── manage-dresses.html      # Boutique Dress Upload, Pricing & Stock Editor
├── lender-profile.html      # Public Boutique Storefront & Rating Reviews
├── admin.html               # Super Admin Governance, Escrow & Disputes
├── notifications.html       # Real-Time User & Order Notifications
├── login.html               # Role-Aware Authentication (Admin/Renter/Lender)
│
├── js/
│   ├── store.js             # Core LocalStorage Data Store & Seed Database
│   ├── auth.js              # Authentication, Session Control & Protected Routes
│   ├── main.js              # Global Navigation, User Dropdown & Modal Logic
│   └── ui-effects.js        # Parallax, Floating Cards & Micro-Interactions
│
├── css/
│   ├── style.css            # Base Styles, Color Variables & Grid Layouts
│   └── components.css       # Buttons, Cards, Badges, Modals & Form Styles
│
├── assets/                  # Local brand assets, icons, and logos
├── server.js                # Native Node.js HTTP Web Server
├── package.json             # Project metadata and npm lifecycle scripts
└── generate_deck.js         # Automated 26-slide presentation generator
```

### Detailed Role of Every File

#### 1. [`index.html`](file:///d:/poshakh/index.html) (Home Page)
- **Role:** The luxury front-door of the brand.
- **Features:** Parallax bridal hero section, "How Poshakh Works" 3-step carousel, curated boutique spotlights (Radha Ethnic House, Royal Rajputana), interactive rental price calculator demo, customer testimonials, and luxury brand footer.

#### 2. [`shop.html`](file:///d:/poshakh/shop.html) (Catalog & Filter Explorer)
- **Role:** The primary discovery marketplace.
- **Features:** Real-time search by keyword, category filter pills (Lehengas, Sarees, Sherwanis, Chaniya Cholis), occasion filters (Wedding, Sangeet, Navratri, Reception), price range slider, sort by popularity/price, and responsive product cards with instant "Rent Now" actions.

#### 3. [`product.html`](file:///d:/poshakh/product.html) (Dress Details & Dynamic Calculator)
- **Role:** The decision and customization portal for a specific garment.
- **Features:** Multi-angle high-resolution gallery, detailed fabric & embroidery specifications (Raw silk, Zari, Velvet, Mirrorwork), size selector, **interactive 3/5/7-day rental period toggle** with dynamic price and security deposit calculations, boutique lender card with rating, and direct "Chat with Boutique" launcher.

#### 4. [`checkout.html`](file:///d:/poshakh/checkout.html) (Escrow Booking & Payment)
- **Role:** The transaction execution engine.
- **Features:** Summary of selected dress, rental start date and end date, delivery address input, clear cost breakdown (**Rental Fee + Refundable Security Deposit + Delivery Fee = Total Escrow**), simulated payment gateway, and instant order ID generation.

#### 5. [`rentals.html`](file:///d:/poshakh/rentals.html) (Customer Rental History)
- **Role:** Renter's personal dashboard.
- **Features:** Tabs for "Active Rentals", "Completed Rentals", and "Pending Returns". Shows order status pills (`Booked`, `Dispatched`, `Active`, `Returned`, `Refunded`), courier tracking numbers, and action button to file quality complaints or submit reviews.

#### 6. [`chat.html`](file:///d:/poshakh/chat.html) (Direct Buyer-Lender Messaging)
- **Role:** Frictionless pre-rental and post-rental communication.
- **Features:** Two-pane messaging UI. Left pane lists ongoing boutique conversations; right pane displays chronological chat bubbles with timestamps, dress attachment preview, and message input.

#### 7. [`account.html`](file:///d:/poshakh/account.html) (User Profile & Settings)
- **Role:** Personal account management.
- **Features:** Profile editing (Name, Phone, Email, Avatar URL), delivery address book, security settings, and saved wishlist items.

#### 8. [`lender-dashboard.html`](file:///d:/poshakh/lender-dashboard.html) (Boutique Command Center)
- **Role:** Operational portal for wardrobe owners and boutiques.
- **Features:** Top KPI cards: Total Revenue Earned (₹), Active Rentals, Listed Dresses, Boutique Rating. Order management table with status updating (`Mark Dispatched`, `Confirm Return Received`, `Report Damage`).

#### 9. [`manage-dresses.html`](file:///d:/poshakh/manage-dresses.html) (Inventory Manager)
- **Role:** The listing creation and stock control studio.
- **Features:** Add New Dress modal with fields for Title, Category, Occasion, Retail Value, 3-Day Rental Price, Security Deposit, Sizes available, Fabric type, and Image URLs. Includes instant status toggle (Available vs Rented) and Delete buttons.

#### 10. [`lender-profile.html`](file:///d:/poshakh/lender-profile.html) (Boutique Public Storefront)
- **Role:** Public trust and brand page for each boutique partner.
- **Features:** Boutique banner, verified badge, bio, geographic location (e.g. Manek Chowk, Ahmedabad), total rentals completed, customer review cards, and a grid of all outfits curated by this specific boutique.

#### 11. [`admin.html`](file:///d:/poshakh/admin.html) (Super Administrator Console)
- **Role:** Centralized governance, escrow auditing, and dispute arbitration.
- **Features:** Platform-wide metrics (Gross Marketplace Volume, Total Users, Total Orders, Active Disputes), User Role Management table, Global Orders Inspector, and **Dispute Arbitration Desk** where admins review customer vs lender damage complaints and execute deposit deductions or full refunds.

#### 12. [`notifications.html`](file:///d:/poshakh/notifications.html) (System Alerts Hub)
- **Role:** Real-time event notifications.
- **Features:** Chronological activity stream informing users of order confirmations, dispatch tracking updates, chat messages, and deposit refund completions.

#### 13. [`login.html`](file:///d:/poshakh/login.html) (Authentication Portal)
- **Role:** Secure sign-in and new user registration.
- **Features:** Dual mode (Login vs Create Account), role selector (Renter vs Boutique Lender), pre-filled Super Admin shortcut (`admin202@admin.com` / `Admin@202`), and immediate role-based dashboard redirection.

#### 14. [`js/store.js`](file:///d:/poshakh/js/store.js) (Core Data Store)
- **Role:** Central database engine and state synchronizer.
- **Features:** Contains default seed data (`SEED_DRESSES`, `SEED_LENDERS`, `SEED_ORDERS`), schema initialization, LocalStorage CRUD helper methods (`getDresses()`, `saveDress()`, `getOrders()`, `updateOrderStatus()`, `getChats()`, `addChatMessage()`, `getComplaints()`, `resolveComplaint()`).

#### 15. [`js/auth.js`](file:///d:/poshakh/js/auth.js) (Auth Controller)
- **Role:** Security, role checking, and session guards.
- **Features:** `PoshakhAuth.login()`, `PoshakhAuth.register()`, `PoshakhAuth.getCurrentUser()`, and route protection logic ensuring non-admins cannot access `admin.html` and non-lenders cannot access `lender-dashboard.html`.

#### 16. [`js/main.js`](file:///d:/poshakh/js/main.js) (Global UI Controller)
- **Role:** Universal navigation and component synchronization.
- **Features:** Dynamically renders the navigation header with user avatar, role tags, and customized dropdown menu based on who is logged in. Manages notification badges and mobile hamburger menus.

#### 17. [`server.js`](file:///d:/poshakh/server.js) (Local Web Server)
- **Role:** Native Node.js web server.
- **Features:** Zero-dependency HTTP daemon listening on port 3000, sanitizes URL paths, serves proper MIME types, and automatically handles clean route extensions.

---

## 6. DATABASE SCHEMA & DATA VAULT

All platform data is structured into normalized collections persisted in browser storage:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA RELATIONSHIP MAP                           │
│                                                                        │
│   [ USERS ] 1 ─── 1 [ LENDERS ] 1 ─── N [ DRESSES ]                   │
│       │                                      │                         │
│       │ 1                                    │ 1                       │
│       ▼ N                                    ▼ N                       │
│   [ ORDERS ] ◄───────────────────────────────┘                         │
│       │                                                                │
│       │ 1                                                              │
│       ▼ N                                                              │
│   [ COMPLAINTS ]                                                       │
└────────────────────────────────────────────────────────────────────────┘
```

### Table 1: `USERS`
| Field Name | Data Type | Constraint | Description |
|---|---|---|---|
| `id` | VARCHAR(36) | PRIMARY KEY | Unique user identifier (e.g. `'u_101'`) |
| `name` | VARCHAR(100) | NOT NULL | User's full name |
| `email` | VARCHAR(120) | UNIQUE, NOT NULL | Account login email address |
| `password` | VARCHAR(100) | NOT NULL | User credential password |
| `role` | ENUM | `'renter'` \| `'lender'` \| `'admin'` | Role-based authorization tier |
| `phone` | VARCHAR(20) | OPTIONAL | Contact mobile number |
| `avatar` | VARCHAR(255) | URL | Profile image link |

### Table 2: `LENDERS` (Boutique Profiles)
| Field Name | Data Type | Constraint | Description |
|---|---|---|---|
| `id` | VARCHAR(36) | PRIMARY KEY, FK → USERS | Boutique unique key (e.g. `'radha'`) |
| `boutiqueName` | VARCHAR(150) | NOT NULL | Business name (e.g. `'Radha Ethnic House'`) |
| `handle` | VARCHAR(80) | UNIQUE | Social boutique handle (e.g. `'@radha_poshakh'`) |
| `bio` | TEXT | - | Heritage curation description |
| `rating` | FLOAT | 0.0 to 5.0 | Average renter satisfaction score |
| `location` | VARCHAR(150) | NOT NULL | City & State (e.g. `'Ahmedabad, Gujarat'`) |
| `totalRentals` | INT | DEFAULT 0 | Lifetime completed rental count |
| `status` | VARCHAR(50) | `'Verified Boutique'` | Administrative audit status |

### Table 3: `DRESSES` (Garment Catalog)
| Field Name | Data Type | Constraint | Description |
|---|---|---|---|
| `id` | VARCHAR(36) | PRIMARY KEY | Dress item ID (e.g. `'d1'`) |
| `name` | VARCHAR(180) | NOT NULL | Full couture title |
| `category` | VARCHAR(50) | NOT NULL | `'Lehenga'`, `'Saree'`, `'Sherwani'`, `'Chaniya Choli'` |
| `occasion` | VARCHAR(50) | NOT NULL | `'Wedding'`, `'Sangeet'`, `'Navratri'`, `'Reception'` |
| `rentPrice` | INT | NOT NULL, > 0 | Standard 3-day rental fee in INR (e.g. `3800`) |
| `deposit` | INT | NOT NULL, >= rent | Refundable security deposit in INR (e.g. `6000`) |
| `retailValue` | INT | NOT NULL | Estimated retail showroom price (e.g. `65000`) |
| `lenderId` | VARCHAR(36) | FOREIGN KEY → LENDERS | Boutique owner reference |
| `fabric` | VARCHAR(80) | NOT NULL | Textile description (e.g. `'Crimson Velvet & Raw Silk'`) |
| `images` | ARRAY(URL) | NOT NULL | Array of multi-angle high-resolution images |
| `availability`| BOOLEAN | DEFAULT TRUE | Toggle for instant rental booking |

### Table 4: `ORDERS` (Rental Transactions)
| Field Name | Data Type | Constraint | Description |
|---|---|---|---|
| `orderId` | VARCHAR(36) | PRIMARY KEY | Unique booking code (e.g. `'ORD-9812'`) |
| `dressId` | VARCHAR(36) | FOREIGN KEY → DRESSES | Reference to rented outfit |
| `renterId` | VARCHAR(36) | FOREIGN KEY → USERS | Customer placing the rental order |
| `lenderId` | VARCHAR(36) | FOREIGN KEY → LENDERS | Boutique fulfilling the order |
| `rentalDays` | INT | CHECK (3, 5, 7) | Duration of rental period |
| `startDate` | DATE | NOT NULL | Date customer receives outfit |
| `endDate` | DATE | NOT NULL | Date customer returns outfit |
| `rentFee` | INT | NOT NULL | Net rental fee |
| `depositHeld` | INT | NOT NULL | Security deposit sequestered in escrow |
| `totalAmount`| INT | NOT NULL | Total paid upfront (`rentFee + depositHeld + delivery`) |
| `status` | ENUM | `'Booked'` \| `'Dispatched'` \| `'Active'` \| `'Returned'` \| `'Completed'` |
| `escrowStatus`| ENUM | `'HELD'` \| `'REFUNDED'` \| `'DISPUTED'` | State of security deposit funds |

### Table 5: `CHATS` (In-App Messaging)
| Field Name | Data Type | Constraint | Description |
|---|---|---|---|
| `id` | VARCHAR(36) | PRIMARY KEY | Unique message identifier |
| `senderId` | VARCHAR(36) | FOREIGN KEY → USERS | Message author user ID |
| `receiverId`| VARCHAR(36) | FOREIGN KEY → USERS | Intended recipient user ID |
| `dressId` | VARCHAR(36) | OPTIONAL | Outfit context reference |
| `text` | TEXT | NOT NULL | Chat message content |
| `timestamp` | DATETIME | NOT NULL | Exact dispatch time |

### Table 6: `COMPLAINTS` (Dispute Resolution)
| Field Name | Data Type | Constraint | Description |
|---|---|---|---|
| `complaintId`| VARCHAR(36) | PRIMARY KEY | Unique dispute case number |
| `orderId` | VARCHAR(36) | FOREIGN KEY → ORDERS | Disputed rental transaction |
| `filedBy` | VARCHAR(36) | FOREIGN KEY → USERS | User reporting the defect or damage |
| `reason` | VARCHAR(255) | NOT NULL | Nature of dispute (e.g. `'Fabric tear on hem'`) |
| `claimAmount`| INT | <= depositHeld | Claimed compensation deduction |
| `status` | ENUM | `'Pending'` \| `'Investigating'` \| `'Resolved'` |
| `adminVerdict`| TEXT | - | Super Admin formal resolution decision |

---

## 7. STEP-BY-STEP FUNCTIONAL WORKFLOWS

### Workflow A: User Sign Up & Role Navigation
1. User visits `login.html`.
2. Chooses **"Create Account"** and selects either **Renter** or **Boutique Lender**.
3. Upon registration, credentials are encrypted into LocalStorage and a session token is issued.
4. **Redirection Logic:**
   - If role is `lender` → automatically directed to `lender-dashboard.html`.
   - If role is `renter` → automatically directed to `shop.html`.
   - If Super Admin (`admin202@admin.com` / `Admin@202`) → directed to `admin.html`.

### Workflow B: Outfit Discovery & Custom Calculation
1. User enters `shop.html` and filters by **Category: Lehenga** and **Occasion: Wedding**.
2. Selects *"Rajputi Crimson Bridal Velvet Lehenga"*.
3. On `product.html`, the customer selects their rental duration:
   - **3 Days:** ₹3,800 Rent + ₹6,000 Deposit
   - **5 Days:** ₹5,700 Rent + ₹6,000 Deposit (+50%)
   - **7 Days:** ₹7,600 Rent + ₹6,000 Deposit (+100%)
4. Clicks **"Proceed to Rental Booking"**, which transfers items into the active cart session.

### Workflow C: Escrow Payment & Order Dispatch
1. On `checkout.html`, customer fills delivery address and confirms event celebration date.
2. The system confirms the total escrow charge (`₹3,800 rent + ₹6,000 deposit = ₹9,800`).
3. Customer clicks **"Confirm & Lock in Escrow"**.
4. Order transitions to state **`Booked`** with `escrowStatus = 'HELD'`.
5. The boutique lender receives a notification in `notifications.html` and sees the order in `lender-dashboard.html`.
6. Boutique packs the garment and clicks **"Mark Dispatched"**, providing the courier tracking number.
7. Order status updates to **`Dispatched`**.

### Workflow D: Return Inspection & Deposit Refund
1. After the celebration event, customer returns the outfit using the pre-paid courier box.
2. Boutique receives the shipment and inspects the embroidery, mirrors, and seams.
3. **Case 1 (Standard Wear - No Damage):**
   - Boutique clicks **"Confirm Return Received & OK"**.
   - Order transitions to **`Completed`**.
   - Escrow status updates to **`REFUNDED`**.
   - Full ₹6,000 security deposit is released back to renter's account.
4. **Case 2 (Significant Damage Detected):**
   - Boutique files a claim via `lender-dashboard.html`.
   - Order enters **`DISPUTED`** status with escrow locked.
   - Super Admin investigates on `admin.html`, reviews photo evidence, and authorizes a partial deduction or full release.

---

## 8. SETUP & EXECUTION INSTRUCTIONS

### Prerequisites
- Any modern PC (Windows, macOS, or Linux)
- [Node.js](https://nodejs.org) installed (Version 18 or above recommended)
- Modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox)

### Step 1: Open Terminal in Project Root
```powershell
cd d:\poshakh
```

### Step 2: Start the Web Server
Run either of the following commands:
```bash
npm start
```
*(or)*
```bash
node server.js
```

You will see the startup banner:
```text
==============================================
 ✨ POSHAKH Local Server is running!
 🌐 Local:   http://localhost:3000
 📂 Root:    D:\poshakh
==============================================
```

### Step 3: Access the Website
Open your browser and navigate to:
👉 **`http://localhost:3000`**

### Pre-Configured Test Logins
- **Super Administrator:**
  - Email: `admin202@admin.com`
  - Password: `Admin@202`
  - Access: Full Admin Console (`admin.html`)
- **Verified Boutique Lender:**
  - Email: `Radh123@gmail.com`
  - Password: `password123` (or register any new lender)
  - Access: Lender Command Center (`lender-dashboard.html`)
- **Customer / Renter:**
  - Register any test email on `login.html` with role "Renter".

---

## 9. VIVA DEFENSE QUESTIONS & ANSWERS

#### Q1: What makes POSHAKH different from standard e-commerce websites like Amazon or Myntra?
**Answer:** Standard e-commerce platforms are built for permanent linear purchasing. POSHAKH is a **circular sharing economy platform** built around finite, date-specific rental leases (3/5/7 days). It incorporates multi-party trust mechanisms: a **two-way security deposit escrow**, return condition verification, direct pre-booking sizing chat, and administrative dispute arbitration.

#### Q2: Why did you choose Vanilla JavaScript instead of frameworks like React or Angular?
**Answer:** Vanilla JavaScript with ES6+ modules delivers ultra-low latency, zero external bundle bloat, and sub-millisecond initial page renders. For a luxury brand showcase featuring high-res imagery, eliminating heavy virtual DOM overhead ensures silky-smooth animations and fast mobile loading without build-tool dependencies.

#### Q3: How is data persisted without a separate MySQL or MongoDB server?
**Answer:** POSHAKH utilizes an abstracted browser persistence architecture powered by the `LocalStorage` and `SessionStorage` APIs managed via `store.js`. Data is structured in relational formats with unique primary keys, foreign keys, and status enums, making it instantly portable to backend databases like PostgreSQL or MongoDB in future phases.

#### Q4: How does the platform protect boutique lenders from dress theft or damage?
**Answer:** Through the **Mandatory Security Deposit Escrow**. Every renter is charged a refundable security deposit that equals or exceeds the garment's rental fee. These funds remain locked in escrow throughout the rental lifecycle and are only released after the boutique owner completes physical inspection upon return.

#### Q5: What happens if a customer and a boutique owner disagree about garment damage?
**Answer:** Neither party has the unilateral power to take funds. When a damage claim is filed, the order state switches to `DISPUTED`. The dispute is escalated to the Super Administrator on `admin.html`, who reviews photographic evidence, hears both parties, and executes an impartial financial settlement.

---

### 🎓 Academic Defense Note
*This documentation was compiled for the academic project defense at **L.J. Institute of Computer Applications (LJCCA)**. All architectural diagrams, data dictionaries, and source code are fully authored and verified.*
