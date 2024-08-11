import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap'; // Import Spinner

// DataTable Component
const DataTable = ({ data, loading, onRowClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const recordsPerPage = 10;

  //sort data by column click
  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

    const handleSort = (column) => {
      const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
      setSortColumn(column);
      setSortOrder(newSortOrder);
    };

    const getHeaderClass = (column) => {
      if (sortColumn === column) {
        return sortOrder === 'asc' ? 'sorted-asc' : 'sorted-desc';
      }
      return '';
    };

    if (loading) {
      return (
          <div className='d-flex justify-content-center align-items-center' style={{ height: '60vh' }}>
              <Spinner animation='border' role='output'>
                  <span className='visually-hidden'>Loading...</span>
              </Spinner>
          </div>
      );
    }

  return (
    <div>
      <table className='table table-striped table-hover'>
        <thead className='table-dark'>
          <tr>
            {/*<th>ID</th>*/}
            <th id='header-hover' onClick={() => handleSort('chartName')} className={getHeaderClass('chartName')}>Chart Name</th>
            <th id='header-hover' onClick={() => handleSort('composer')} className={getHeaderClass('composer')}>Composer</th>
            <th id='header-hover' onClick={() => handleSort('arranger')} className={getHeaderClass('arranger')}>Arranger</th>
            <th id='header-hover' onClick={() => handleSort('subGenre')} className={getHeaderClass('subGenre')}>Sub-Genre</th>
            <th id='header-hover' onClick={() => handleSort('recordingArtist')} className={getHeaderClass('recordingArtist')}>Recording Artist</th>
            <th id='header-hover' onClick={() => handleSort('instrumentation')} className={getHeaderClass('instrumentation')}>Instrumentation</th>
            <th id='header-hover' onClick={() => handleSort('grade')} className={getHeaderClass('grade')}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item) => (
            <tr key={item.id} onClick={() => onRowClick(item)}>
              {/*<td>{item.id}</td>*/}
              <td>{item.chartName}</td>
              <td>{item.composer}</td>
              <td>{item.arranger}</td>
              <td>{item.subGenre}</td>
              <td>{item.recordingArtist}</td>
              <td>{item.instrumentation}</td>
              <td>{item.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <a 
                onClick={() => setCurrentPage(number)} 
                href='#' 
                className='page-link'>{number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DataTable;