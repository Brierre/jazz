import React, { useCallback, useRef, useState } from 'react';
import { Button, Container, FormControl, Modal, Nav, Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navigation.css';
import useKeyDown from './useKeyDown';

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const Navigation = ({ onSearch, onFilterChange, onViewAll }) => {
    const [show, setShow] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState('');
    const [modalSearchTerm, setModalSearchTerm] = useState('');
    const dropdownRef = useRef(null);
        
    const debouncedSearch = useCallback(debounce((value) => {
        onSearch(value);
    }, 300), [onSearch]);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        debouncedSearch(value.toLowerCase());
    };

    const handleFilterChange = (eventKey) => {
        if (eventKey === 'view-all') {
            onViewAll();
            setShow(false); // Close the modal if open
        } else {
            setSelectedColumn(eventKey);
            setModalSearchTerm('');
            setShow(true);
            onSearch(''); //clear search when modal pops up
        }
    };

    const handleModalSearch = () => {
        onFilterChange(selectedColumn, modalSearchTerm.toLowerCase());
        setShow(false);
    };

    useKeyDown('Enter', handleModalSearch);
    
    const handleDropdownClick = () => {
        dropdownRef.current.click();
    };

    return (
        <>
        <Navbar expand='lg' className='custom-navbar'>
            <Container>
                <Navbar.Brand 
                    className='custom-brand fs-1 permanent-marker-regular' 
                    href='#home'>Jazz Charts for Your Jazz Program
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='me-auto'>
                        <NavDropdown                      
                            onClick={handleDropdownClick}
                            title='Search charts by' 
                            id='navbarScrollingDropdown'
                            onSelect={handleFilterChange}
                            ref={dropdownRef}>
                            <NavDropdown.Item className='modal-button' as='button' eventKey="instrumentation">Instrumentation</NavDropdown.Item>
                            <NavDropdown.Item className='modal-button' as='button' eventKey="subGenre">Sub-Genre</NavDropdown.Item>
                            <NavDropdown.Item className='modal-button' as='button' eventKey="chartName">Chart Name</NavDropdown.Item>
                            <NavDropdown.Item className='modal-button' as='button' eventKey="composer">Composer</NavDropdown.Item>
                            <NavDropdown.Item className='modal-button' as='button' eventKey="arranger">Arranger</NavDropdown.Item>
                            <NavDropdown.Item className='modal-button' as='button' eventKey="recordingArtist">Recording Artist</NavDropdown.Item>
                            <NavDropdown.Item className='modal-button' as='button' eventKey="grade">Grade</NavDropdown.Item>
                            <NavDropdown.Item className='modal-button' as='button' eventKey="view-all">Complete Listing</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link 
                            href='https://www.whatsthehapps.dev/' 
                            target='_blank'
                            >Check out our other apps!
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Search by {selectedColumn}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    id='search-modal'
                    type='search'
                    placeholder={`Search by ${selectedColumn}`}
                    className='me-2'
                    aria-label='Search'
                    value={modalSearchTerm}
                    onChange={(e) => setModalSearchTerm(e.target.value)}
                />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShow(false)}>Close</Button>
                    <Button className='modal-button' onClick={handleModalSearch}>Search</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Navigation;