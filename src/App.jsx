import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import './App.css';
import Chart from './Chart';
import DataTable from './DataTable';
import Footer from './Footer';
import ImgCarousel from './ImgCarousel';
import Navigation from './Navigation';

function App() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterColumn, setFilterColumn] = useState('');
    const [columnSearchTerm, setColumnSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); //add loading state
    const [selectedChart, setSelectedChart] = useState(null);
    const [showModal, setShowModal] = useState(false);

      // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://66a799a553c13f22a3d060cb.mockapi.io/charts');
            const result = await response.json();
            sessionStorage.setItem('data', JSON.stringify(result));
            setData(result);
            setFilteredData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, []);

  // Filter data based on search term and filter column
  const filterData = (searchValue, filterColumn, columnSearchTerm) => {
    let filtered = data;

    if (searchValue) {
        filtered = filtered.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(searchValue)
            )
        );
    }
    if (filterColumn) {
        if (columnSearchTerm) {
            filtered = filtered.filter(item =>
                String(item[filterColumn]).toLowerCase().includes(columnSearchTerm)
            );
        }
        filtered = filtered.sort((a, b) =>
            String(a[filterColumn]).localeCompare(String(b[filterColumn]))
        );
    }
    setFilteredData(filtered);
    };

  // Handle search input
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    filterData(searchValue, filterColumn, columnSearchTerm);
  };

  // Handle dropdown filter
  const handleFilterChange = (filterColumn, columnSearchTerm = '') => {
    setFilterColumn(filterColumn);
    setColumnSearchTerm(columnSearchTerm);
    filterData(searchTerm, filterColumn, columnSearchTerm);
  };

  // Handle selection to view all charts
  const handleViewAll = () => {
    const sortedData = [...data].sort((a, b) =>
        a.chartName.localeCompare(b.chartName)
    );
    setFilteredData(sortedData);
    setSearchTerm('');
    setFilterColumn('');
    setColumnSearchTerm('');
  };

  const handleRowClick = (chart) => {
    setSelectedChart(chart);
    setShowModal(true);
  };

  return (
    <div className='App' style={{ position: 'relative' }}>
        <Navigation 
            searchTerm={searchTerm}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onViewAll={handleViewAll}
        />

        <div className='imagebg'>
            {loading ? (
                <div 
                    className='d-flex justify-content-center align-items-center'
                    style={{ height: '100vh' }}>
                        <Spinner animation='border' role='output'>
                            <span className='visually-hidden'>Loading...</span>
                        </Spinner>
                </div>
            ) : (
                <>
                    <ImgCarousel />
                    <DataTable data={filteredData} onRowClick={handleRowClick} />
                </>
            )}
        </div>

        <Footer />

        {/* Modal to display chart details */}
        <Modal show={showModal} onHide={() => setShowModal(false)} className='custom-modal'>
            <Modal.Header closeButton>
                <Modal.Title>{selectedChart?.chartName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='custom-modal-card'>
                    {selectedChart && <Chart {...selectedChart} />}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='modal-button' onClick={() => setShowModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
}

export default App;