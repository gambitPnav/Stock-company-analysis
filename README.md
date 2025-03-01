# Stock Market Visualization App

## Overview
This React application visualizes stock market data using interactive charts. The app fetches data from a CSV file and allows users to search and select stocks to display their performance.

## Features
- **Searchable Stock List**: Search companies in the dataset dynamically.
- **Line Graph Representation**: Displays stock performance using a Line chart.
- **Virtualized List**: Efficient rendering for large datasets.
- **Pagination**: Load more data on demand.
- **Debounced Search**: Optimized search to minimize performance overhead.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd stock_app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## File Structure
```
stock_app/
│── public/
│   ├── stock_dump.csv       # Stock data file
│── src/
│   ├── components/
│   │   ├── Line.jsx         # Line chart component
│   │   ├── Bar.jsx          # Bar chart component (if added)
│   │   ├── Pie.jsx          # Pie chart component (if added)
│   ├── App.jsx              # Main application file
│── index.html               # HTML template
│── package.json             # Project dependencies
│── vite.config.js           # Vite configuration
```

## Dependencies
- **React**: UI framework
- **Chart.js**: Chart rendering library
- **react-chartjs-2**: React wrapper for Chart.js
- **papaparse**: CSV data parsing
- **lodash.debounce**: Optimized search
- **react-window**: Virtualized list handling

## Usage
1. Search for a company in the sidebar.
2. Click on a company name to view its stock data in the graph.
3. Scroll down and click 'Load More' to fetch additional stock listings.

## Future Enhancements
- Add multi-chart support for comparing multiple stocks.
- Improve UI responsiveness.
- Integrate real-time stock data API.

## Author
Priyanav

