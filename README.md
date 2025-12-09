# 🐾 Petopia Admin Dashboard

A comprehensive multi-role admin dashboard for managing Petopia - a pet care services platform. Built with React and Tailwind CSS, this dashboard provides separate interfaces for administrators, service providers (veterinarians, groomers, trainers), and NGOs.

![React](https://img.shields.io/badge/React-19.0.0-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.1.8-38bdf8.svg)
![License](https://img.shields.io/badge/license-Private-red.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [User Roles](#-user-roles)
- [API Configuration](#-api-configuration)
- [Contributing](#-contributing)

## ✨ Features

### 🔐 Admin Panel
- **User Management**: View and manage all platform users with detailed statistics
  - Total users, new users (weekly/monthly)
  - User profiles and detailed information
  - User data tables with filtering and search

- **Provider Management**: Comprehensive oversight of service providers
  - Manage Veterinarians, Groomers, and Trainers
  - Track bookings by provider type
  - Financial analytics (sales, revenue, pending payouts)
  - Provider profiles and performance metrics
  - Interactive charts and visualizations

- **Breed Management**: Complete CRUD operations for pet breeds
  - Add, edit, and delete breed information
  - Search and filter breeds
  - Image management for breeds
  - Species categorization

- **Analytics Dashboard**: 
  - Revenue charts (weekly trends)
  - Provider distribution pie charts
  - User growth metrics
  - Financial summaries

### 🏥 Provider Panel
- **Dashboard**: 
  - Revenue tracking
  - Users served statistics
  - Upcoming and completed appointments
  - Average ratings
  - Service count overview

- **Schedule Management**:
  - Daily schedule view
  - Appointment history
  - Upcoming appointments tracking
  - Calendar integration

- **Profile Management**:
  - Comprehensive profile editor
  - Business information management
  - Professional details
  - Media uploads (images, documents)
  - Contact and social links

### 🏛️ NGO Panel
- **Dashboard**: Overview of NGO operations
- **Profile Management**: Edit and manage NGO profile
- **Query Management**: Handle user queries and support tickets

### 🎨 UI/UX Features
- **Dark Mode**: Full dark mode support
- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Modern UI Components**: Built with Chakra UI and custom Tailwind components
- **Interactive Charts**: ApexCharts integration for data visualization
- **Sidebar Navigation**: Collapsible sidebar with role-based menu items
- **Search Functionality**: Advanced search across breeds and users

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.0.0
- **Routing**: React Router DOM 6.4.0
- **Styling**: 
  - Tailwind CSS 3.1.8
  - PostCSS & Autoprefixer
- **UI Components**: 
  - Chakra UI (Modal, Popover, Tooltip, Portal, System)
  - Emotion (CSS-in-JS)
- **Charts**: 
  - ApexCharts 3.35.5
  - React-ApexCharts 1.4.0
- **Icons**: 
  - React Icons 4.12.0
  - Lucide React 0.541.0
- **Tables**: TanStack React Table 8.7.9
- **Calendar**: React Calendar 5.0.0
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Code Quality**: Prettier with Tailwind plugin

## 📁 Project Structure

```
petopia-admin/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo_transparent.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── css/          # Global stylesheets
│   │   ├── img/          # Image assets
│   │   └── svg/          # SVG icons
│   ├── components/       # Reusable UI components
│   │   ├── calendar/
│   │   ├── card/
│   │   ├── charts/
│   │   ├── fields/
│   │   ├── navbar/
│   │   ├── sidebar/
│   │   └── widget/
│   ├── context/          # React Context providers
│   │   ├── NgoProfileContext.jsx
│   │   └── ProviderProfileContext.jsx
│   ├── layouts/          # Layout components for different roles
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── ngo/
│   │   └── provider/
│   ├── utils/            # Utility functions
│   │   └── api.js        # API request helper
│   ├── variables/        # Configuration and constants
│   ├── views/            # Page components
│   │   ├── admin/        # Admin panel views
│   │   ├── auth/         # Authentication views
│   │   ├── ngo/          # NGO panel views
│   │   └── provider/     # Provider panel views
│   ├── App.jsx           # Main app component
│   ├── routes.js         # Route configuration
│   ├── index.js          # Entry point
│   └── index.css         # Global styles
├── package.json
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js
├── prettier.config.js
└── jsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Backend API server running on `http://localhost:3456` (or configure custom API base URL)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd petopia-admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (optional)
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_BASE=http://localhost:3456
   REACT_APP_AUTH_TOKEN_KEY=token
   ```
   
   **Note**: If not set, the app uses the proxy configuration in `package.json` (defaults to `http://localhost:3456`).

4. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## 📜 Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run test suite
- `npm run pretty` - Format code with Prettier
- `npm run eject` - Eject from Create React App (irreversible)

## 👥 User Roles

### Admin (`/admin`)
- Access to all administrative features
- User and provider management
- Breed information management
- System-wide analytics
- Profile management

**Routes:**
- `/admin/user-dashboard` - User management
- `/admin/provider-dashboard` - Provider management
- `/admin/manage-breeds` - Breed management
- `/admin/profile` - Admin profile

### Provider (`/provider`)
- Service provider dashboard
- Schedule management
- Profile editing
- Appointment history

**Routes:**
- `/provider/dashboard` - Provider dashboard
- `/provider/schedule` - Schedule management
- `/provider/profile` - Profile view
- `/provider/profile/edit` - Profile editor

### NGO (`/ngo`)
- NGO dashboard
- Query management
- Profile management

**Routes:**
- `/ngo/dashboard` - NGO dashboard
- `/ngo/manage-query` - Query management
- `/ngo/profile` - Profile view
- `/ngo/editor` - Profile editor

### Authentication (`/auth`)
- Sign-in page for all user types

## 🔌 API Configuration

The application uses a centralized API utility (`src/utils/api.js`) that:

- Automatically handles authentication tokens from localStorage/sessionStorage
- Supports both CRA proxy and explicit API base URL
- Provides error handling and JSON parsing
- Handles CORS and network errors gracefully

### API Base URL

The app supports two methods for API configuration:

1. **CRA Proxy** (default): Set `proxy` in `package.json`
   ```json
   "proxy": "http://localhost:3456"
   ```

2. **Environment Variable**: Set `REACT_APP_API_BASE` in `.env`
   ```env
   REACT_APP_API_BASE=http://localhost:3456
   ```

### Authentication

The API utility automatically looks for authentication tokens in:
- `localStorage` or `sessionStorage` with key from `REACT_APP_AUTH_TOKEN_KEY`
- Default keys: `token`, `accessToken`, `authToken`, `jwt`

Tokens are sent as Bearer tokens in the Authorization header.

## 🎨 Customization

### Theme Configuration

The project uses Tailwind CSS with custom color schemes defined in `tailwind.config.js`. Key brand colors:

- **Brand**: `#422AFB` (primary brand color)
- **Navy**: Dark theme colors
- **Gray**: Neutral grays
- Custom color palette for charts and UI elements

### Dark Mode

Dark mode is enabled via `darkMode: "class"` in Tailwind config. Toggle dark mode by adding/removing the `dark` class on the root element.

## 📊 Components Overview

### Charts
- **BarChart**: Bar chart component for comparisons
- **LineChart**: Line chart for trends
- **PieChart**: Pie chart for distributions

### Tables
- **UserTable**: Data table with sorting and filtering
- **ProviderTable**: Provider-specific table with actions

### Forms
- **InputField**: Text input component
- **TextField**: Textarea component
- **SwitchField**: Toggle switch component

### Widgets
- **Widget**: Reusable stat card component
- **Card**: General-purpose card container

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use Prettier for code formatting: `npm run pretty`
- Follow React best practices
- Maintain component structure consistency
- Add comments for complex logic

## 📝 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- UI components inspired by [Horizon UI](https://horizon-ui.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/) and [Lucide](https://lucide.dev/)
- Charts powered by [ApexCharts](https://apexcharts.com/)

---

**Made with ❤️ for Petopia**

