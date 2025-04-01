# SA Gov Charts

A web application for visualising and analysing South African government statistics and economic indicators.

## Overview

SA Gov Charts provides visualisations of various South African statistics, including economic indicators, social metrics, and government data. The project aims to make complex government data more accessible and understandable.

## Features

- **Interactive Dashboards**: Visualisations of key statistics using Chart.js.
- **Real-time Data**: Up-to-date information from various SARB website routes.
- **Dark/Light Mode**: Responsive UI with theme support
- **Multiple Data Categories**:
  - Economic indicators (GDP, inflation, exchange rates)
  - JSE market data
  - Social statistics
  - Government fiscal data

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- Chart.js
- React Router DOM

### Backend

- Node.js
- Express
- MongoDB
- Puppeteer
- Redis (Upstash)

## Prerequisites

- Node.js >= 16
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

```zsh
git clone https://github.com/KarlMeierMattern/sa-gov-charts
cd sa-gov-charts
```

2. Install dependencies:

```zsh
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd server && npm install
```

## Running the Application

Development mode:

```zsh
# Run both frontend and backend
npm run dev

# Run frontend only
cd client && npm run dev

# Run backend only
cd server && npm run dev
```

Production build:

```zsh
npm run build
```

## Contributing

1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Data sources: [SARB](https://www.resbank.co.za/en/home) website.
- Built with [shadcn/ui](https://ui.shadcn.com/) components.
