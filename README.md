# 🛒 AuraMart

A premium, high-performance E-Commerce web application built with **React**, **Vite**, and **Material-UI (MUI)**, featuring robust state management, mock database integration via `json-server`, and a dedicated micro-benchmark performance suite.

---

## 🚀 Features

### 🛍️ Client / Shopper Experience
- **Interactive Landing & Home Pages**: Seamless, modern shopping interface with category filters and navigation.
- **Product Catalog**: Dynamic catalog parsing and rendering from the local data store.
- **Shopping Cart System**: Context-driven add, quantity adjustment, and removal operations with persistent storage sync.
- **Wishlist**: Quick toggle to save favorite products.
- **Detailed Product View**: Deep-dive product preview page.

### 🔑 Administrator Portal
- **Admin Authentication**: Secure login flow to access the admin dashboard.
- **Inventory Management**: Add and manage products inside the catalog.
- **User Management**: Portal to add and manage application user accounts.

### ⚡ Performance & SLA Verification
- **Automated Benchmarking**: Custom built-in performance script targeting key execution bottlenecks (Cart modifications, Search/Sort algorithms, and JSON LocalStorage cycles) to ensure sub-millisecond latencies.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 19, Vite 8, React Router DOM v7
- **Styling & UI**: Material-UI (MUI v9), Custom CSS variables
- **State Management**: React Context API (`CartContext`)
- **Database (Mock)**: `json-server` (local REST API server)
- **Benchmarking**: Custom Node.js micro-benchmark runner

---

## 📂 Project Structure

```text
auramart/
├── public/                 # Static assets (images, favicon)
├── scripts/
│   └── run-benchmarks.cjs  # Custom performance & SLA benchmark suite
├── src/
│   ├── assets/             # Images and global styles
│   ├── Components/
│   │   ├── Admin/          # Admin-facing views (AddProducts, AdminLogin, Portal)
│   │   ├── LandingPage/    # Main landing views
│   │   ├── Pages/          # Core views (Cart, Products, About, Wishlist, ViewMore)
│   │   ├── Users/          # User-facing portals & login
│   │   └── NavBar.jsx      # Main layout navigation
│   ├── Context/
│   │   └── CartContext.jsx # Shopping Cart state provider
│   ├── DataBase/
│   │   └── data.json       # Product and user database source file
│   ├── App.jsx             # Main router & layout configuration
│   └── main.jsx            # React client entry point
├── package.json            # Scripts & project dependencies
├── vite.config.js          # Vite build config
└── README.md               # Project documentation
```

---

## 🏁 Getting Started

### 📋 Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)

### ⚙️ Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd auramart
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### 🖥️ Running the Application

To run the application locally, you need to spin up the **Frontend Server** and the **Mock Database Server** simultaneously.

#### 1. Start the Mock Database API Server
Run the local `json-server` on port `4000`:
```bash
npm run json-server
```

#### 2. Start the Frontend Development Server
In a separate terminal window, launch Vite's dev server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser to view the application.

---

## 📊 Performance Benchmark Testing

AuraMart features a self-contained, high-performance benchmarking suite to measure state changes and data processing latency under load.

### Target Performance SLAs
- **Cart Operations**: Add, update, and remove bulk iterations must execute in under **`0.15ms`** on average.
- **Filter and Sort**: Searching and sorting a 1,000 product catalog must execute in under **`0.50ms`** on average.
- **State Serialization**: LocalStorage read/write serialization cycle (JSON roundtrip) must execute in under **`0.25ms`** on average.

### Running the Benchmarks
To execute the suite and print detailed SLA execution diagnostics (min/max time, standard deviation, throughput ops/sec, and pass/fail states):
```bash
npm run test:metrics
```
