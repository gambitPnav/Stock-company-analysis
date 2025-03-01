import React, { useEffect, useState, useCallback } from "react";
import { Line } from "react-chartjs-2";
import Papa from "papaparse";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FixedSizeList as List } from "react-window"; // Efficient large list handling
import debounce from "lodash.debounce"; // For optimized search

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = () => {
  const [chartData, setChartData] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(20); // For pagination

  const fetchCSVData = async () => {
    try {
      const response = await fetch("/stock_dump.csv");
      const csvText = await response.text();
      const parsedData = Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;
      setChartData(parsedData);
      setFilteredCompanies(parsedData.slice(0, visibleCount)); // Show limited initially
    } catch (error) {
      console.error("Error fetching CSV:", error);
    }
  };

  useEffect(() => {
    fetchCSVData();
  }, []);

  // Debounced Search
  const handleSearch = useCallback(
    debounce((query) => {
      if (!query) {
        setFilteredCompanies(chartData.slice(0, visibleCount));
      } else {
        const result = chartData.filter((row) =>
          row.index_name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCompanies(result.slice(0, visibleCount));
      }
    }, 300), // Delay execution to avoid multiple re-renders
    [chartData]
  );

  // Load more data on scroll
  const loadMore = () => {
    setVisibleCount((prev) => prev + 20);
    setFilteredCompanies(chartData.slice(0, visibleCount + 20));
  };

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  return (
    <div className="container">
      {/* Sidebar with search & virtualized company list */}
      <div className="sidebar">
        <input
          type="text"
          placeholder="Search Company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
        <List
          height={500} // Fixed height for smooth scrolling
          itemCount={filteredCompanies.length}
          itemSize={40} // Height of each item
          width={250}
        >
          {({ index, style }) => (
            <div
              key={index}
              style={style}
              className="company-item"
              onClick={() => setSelectedCompany(filteredCompanies[index])}
            >
              {filteredCompanies[index].index_name}
            </div>
          )}
        </List>
        <button className="load-more-btn" onClick={loadMore}>Load More</button>
      </div>

      {/* Graph Display */}
      <div className="graph-container">
        {selectedCompany ? (
          <>
            <h3>{selectedCompany.index_name} ({selectedCompany.index_date})</h3>
            <div style={{ width: '400px', height: '300px' }}>
              <Line
                data={{
                  labels: ["Open", "High", "Low", "Close"],
                  datasets: [
                    {
                      label: selectedCompany.index_name,
                      data: [
                        parseFloat(selectedCompany.open_index_value),
                        parseFloat(selectedCompany.high_index_value),
                        parseFloat(selectedCompany.low_index_value),
                        parseFloat(selectedCompany.closing_index_value),
                      ],
                      borderColor: "rgba(75, 192, 192, 1)",
                      backgroundColor: "rgba(75, 192, 192, 0.2)",
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                }}
                width={400}
                height={300}
              />
            </div>
          </>
        ) : (
          <h3>Select a company to view the graph</h3>
        )}
      </div>
    </div>
  );
};

export default LineGraph;
