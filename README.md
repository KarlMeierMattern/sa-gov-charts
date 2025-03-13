# SA Gov Charts

A comprehensive web application for visualizing and analyzing South African government statistics and economic indicators.

## Overview

SA Gov Charts is a modern web application that provides interactive visualizations of various South African statistics, including economic indicators, social metrics, and government data. The project aims to make complex government data more accessible and understandable to citizens, researchers, and policymakers.

## Features

- **Interactive Dashboards**: Dynamic visualizations of key statistics using Chart.js and Recharts
- **Real-time Data**: Up-to-date information from various government sources
- **Dark/Light Mode**: Fully responsive UI with theme support
- **Multiple Data Categories**:
  - Economic indicators (GDP, inflation, exchange rates)
  - JSE market data
  - Social statistics
  - Government fiscal data
  - Environmental metrics

## Tech Stack

### Frontend

- React 18
- Vite
- TypeScript
- Tailwind CSS
- Chart.js/Recharts
- Radix UI Components
- React Router DOM

### Backend

- Node.js
- Express
- MongoDB
- Puppeteer (for data scraping)
- JWT Authentication

## Prerequisites

- Node.js >= 16
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/KarlMeierMattern/sa-gov-charts
cd sa-gov-charts
```

2. Install dependencies:

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd server && npm install
```

3. Environment Setup:

   - Create `.env` files in both client and server directories
   - Required environment variables:

     ```
     # Server .env
     MONGO_URI=your_mongodb_uri
     PORT=3000
     NODE_ENV=development

     # Client .env
     VITE_DEV_BASE_URL=http://localhost:3000
     VITE_PROD_BASE_URL=your_production_url
     ```

## Running the Application

Development mode:

```bash
# Run both frontend and backend
npm run dev

# Run frontend only
cd client && npm run dev

# Run backend only
cd server && npm run dev
```

Production build:

```bash
npm run build
```

## Project Structure

sa-gov-charts/
├── client/ # Frontend React application
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── pages/ # Page components
│ │ └── lib/ # Utility functions
├── server/ # Backend Node.js application
│ ├── controllers/ # Route controllers
│ ├── routes/ # API routes
│ ├── models/ # Database models
│ └── scraping/ # Data scraping utilities
└── package.json # Project dependencies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Data sources: Statistics South Africa, South African Reserve Bank, JSE
- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Deployed on Vercel
