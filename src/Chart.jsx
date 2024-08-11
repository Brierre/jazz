import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

function Chart({
    chartId,
    chartName,
    composer,
    arranger,
    subGenre,
    recordingArtist,
    instrumentation,
    grade,
    purchaseLink,
}) {    
    const [show, setShow] = useState(false);
    function showChartInfo() {
        setShow(!show);
    }

    return (
        <div className='custom-modal-card'>
            <Col className='custom-card mb-4'>
                <Card className='custom-card bg-secondary h-100 rounded border border-light'>
                    <Card.Body className='bg-dark text-light rounded border border m-1'>
                        <Card.Title className='text-light fw-bold fs-4 mb-4'>{chartName}</Card.Title>
                        <div className='fw-bold'>
                            <div>
                                <Card.Text className='fw-bold'>
                                    Composed by:{' '}
                                    <span className='fw-lighter text-light'>{composer}</span>
                                </Card.Text>
                                <Card.Text className='fw-bold'>
                                    Arranged by:{' '}
                                    <span className='fw-lighter text-light'>{arranger}</span>
                                </Card.Text>
                                <Card.Text className='fw-bold'>
                                    Arranged for:{' '}
                                    <span className='fw-lighter text-light'>{instrumentation}</span>
                                </Card.Text>
                                <Card.Text className='fw-bold'>
                                    Recorded by:{' '}
                                    <span className='fw-lighter text-light'>{recordingArtist}</span>
                                </Card.Text>
                                <Card.Text className='fw-bold'>
                                    Sub-Genre:{' '}
                                    <span className='fw-lighter text-light'>{subGenre}</span>
                                </Card.Text>
                                <Card.Text className='fw-bold'>
                                    Grade:{' '}
                                    <span className='fw-lighter text-light'>{grade}</span>
                                </Card.Text>
                                <hr/>
                                <Card.Text className='fw-bold'>
                                    {/*<Button
                                        onClick={() => window.open(purchaseLink, '_blank')}
                                        style={{
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            padding: '5px 10px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                        }}>Buy Now                                    
                                    </Button>*/} {/* currently replaced with a link to one specific url for purchase*/}
                                    <Button 
                                        onClick={() => window.open("https://www.ejazzlines.com/big-band-arrangements/", "_blank")} className='modal-button' >
                                        Find for Purchase
                                    </Button> {/* remove when api includes purchase links */}
                                </Card.Text>
                            </div>            
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
}
export default Chart;