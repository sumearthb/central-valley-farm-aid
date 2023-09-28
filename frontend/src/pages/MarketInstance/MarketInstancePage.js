import React from "react";
import FMData from "../FarmersMarkets"; // Import your FMData array
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

function MarketInstancePage() {
    const params = useParams();
    console.log('params.id:', params.id); // Log the value of params.id

    const market = FMData.find((market) => market.title === params.id);
    console.log('Market found:', market); // Log the market object

    if (!market) {
        // Handle the case when the market is not found
        return <div>Market not found.</div>;
    }

    return (
        <Container className='mt-5' style={{ width: "85%", textAlign: "center" }}>
            <div>
                <Card style={{ width: "90%", textAlign: "center" }}>
                    <Card.Img
                        variant="top"
                        src={market.image}
                        style={{ objectFit: "cover", width: "20%", height: "20%", margin: "auto" }}
                    />
                    <Card.Body style={{ textAlign: "left" }}>
                        <Card.Title>{market.title}</Card.Title>
                        <Card.Text>{market.location}</Card.Text>
                        {/* Add more market details here */}
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
}

export default MarketInstancePage;
