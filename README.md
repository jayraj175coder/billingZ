# ZenskarLite – Quote & Billing UI (Frontend Demo)

A professional, Zenskar-inspired frontend demo to showcase pixel-perfect UI development skills, React + TailwindCSS usage, and business logic understanding for B2B SaaS billing systems.

## 🎯 Project Objective

To build a frontend-only React application that mimics part of Zenskar's core product — a quote creation system and a billing dashboard. The aim is to demonstrate:

- **ReactJS development** with hooks
- **UI building** using Tailwind CSS
- **Component modularity**
- **Ownership of user interface logic**
- **Real-world SaaS domain application** (CPQ + Billing)

## ✨ Features

### 🔹 Quote Generator Page
- **Input fields:**
  - Customer Name (Text)
  - Product Name (Text)
  - Quantity (Number)
  - Price per Unit (Number)
  - Tax Rate (Number, optional)
- **Live preview:** Shows Total = Quantity × Price + Tax
- **Generate Quote button:** Stores quote data to app state

### 🔹 Quote Preview Card
- **Display:**
  - Customer information
  - Product details
  - Total with tax breakdown
  - Creation date
  - Quote ID
- **Actions:**
  - Mark as Paid (for unpaid quotes)
  - Delete quote

### 🔹 Billing Dashboard
- **Statistics cards:**
  - Total Revenue (paid quotes)
  - Pending Amount (unpaid quotes)
  - Total Quotes count
- **Quote management:**
  - Grid layout of all quotes (responsive cards)
  - Search functionality (by customer or product)
  - Filter by status (All/Paid/Unpaid)
  - Status indicators
  - Action buttons

## 🛠 Tech Stack

- **Frontend:** React (Functional Components + Hooks)
- **Styling:** TailwindCSS
- **State Management:** useState + localStorage for persistence
- **Icons:** Heroicons
- **Deployment Ready:** Netlify/Vercel compatible

## 📁 Project Structure

```
billing/
├── public/
├── src/
│   ├── components/
│   │   ├── QuoteForm.jsx      # Quote creation form
│   │   ├── QuoteCard.jsx      # Individual quote display
│   │   └── BillingTable.jsx   # Dashboard with filtering
│   ├── pages/
│   │   ├── CreateQuote.jsx    # Quote creation page
│   │   └── BillingDashboard.jsx # Main dashboard page
│   ├── App.jsx                # Main app with navigation
│   ├── index.js
│   └── index.css              # TailwindCSS + custom styles
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jayraj175coder/billingZ.git
   cd billing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## 🎨 UI/UX Features

### Design Principles
- **Clean & Professional:** Inspired by B2B SaaS dashboards
- **Responsive Design:** Mobile-first approach with TailwindCSS
- **Consistent Styling:** Custom CSS classes for reusable components
- **Intuitive Navigation:** Clear navigation between pages
- **Visual Feedback:** Hover states, transitions, and status indicators

### Color Scheme
- **Primary:** Blue (#3B82F6) - Professional and trustworthy
- **Success:** Green (#10B981) - Paid status
- **Warning:** Yellow (#F59E0B) - Unpaid status
- **Neutral:** Gray scale for text and backgrounds

### Component Highlights
- **QuoteForm:** Live calculation preview, form validation
- **QuoteCard:** Status badges, action buttons, responsive layout
- **BillingTable:** Search, filtering, statistics cards
- **Navigation:** Clean header with brand and navigation

## 💾 Data Persistence

The application uses `localStorage` to persist quote data between sessions:
- Quotes are automatically saved when created/modified
- Data is loaded on application startup
- No backend required - perfect for demo purposes

## 🔧 Customization

### Adding New Features
1. **Currency formatting:** Implement Intl.NumberFormat
2. **Dark mode:** Add theme toggle with TailwindCSS dark mode
3. **Export functionality:** Generate PDF/HTML invoices
4. **Pagination:** For large quote lists
5. **Advanced filtering:** Date ranges, amount ranges

### Styling Modifications
- Edit `src/index.css` for global styles
- Modify `tailwind.config.js` for theme customization
- Update component classes for specific styling

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile:** Single column layout, touch-friendly buttons
- **Tablet:** Two-column grid for quotes
- **Desktop:** Three-column grid, full navigation

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `build`
4. Deploy automatically on push to main

### Vercel
1. Import your GitHub repository
2. Framework preset: Create React App
3. Deploy automatically

## 🧪 Testing the Application

1. **Create a Quote:**
   - Navigate to "New Quote"
   - Fill in customer and product details
   - Add quantity and price
   - Set tax rate (optional)
   - Click "Generate Quote"

2. **Manage Quotes:**
   - View all quotes on the dashboard
   - Search by customer or product name
   - Filter by payment status
   - Mark quotes as paid
   - Delete unwanted quotes

3. **Data Persistence:**
   - Refresh the page to verify data is saved
   - Close and reopen browser to test localStorage

## 🎯 Demo Highlights

### For Frontend Role Applications
- **React Proficiency:** Modern hooks, functional components
- **CSS Mastery:** TailwindCSS utility classes, responsive design
- **Component Architecture:** Modular, reusable components
- **State Management:** Local state with localStorage persistence
- **Business Logic:** Real-world billing calculations and workflows
- **UI/UX Skills:** Professional design, user-friendly interface

## 📄 License

This project is created for demonstration purposes.

## 🤝 Contributing

This is a demo project, but suggestions and improvements are welcome!

---

**Built with ❤️ using React & TailwindCSS**
