import React from "react";
import FMData from "../FarmersMarkets";
import {Container, Card, ListGroup} from "react-bootstrap";
import { useParams } from 'react-router-dom';

function MarketInstancePage() {
    const params = useParams();
    const market = FMData.find(market => market.title === params.id)
    return (
        <Container className='mt-5' style={{width: "85%", textAlign: "center"}}>
            <div>
                <Card style={{ width: "90%", textAlign: "center"}}>
                    <Card.Img
                        variant="top"
                        src={market.image}
                        style={{ objectFit : "cover", width: "20%", height: "20%", margin: "auto"}}
                    />
                    <Card.Body style={{ textAlign: "left" }}>
                        <Card.Title>{market.title}</Card.Title>
                        <Card.Text>{market.location}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
}

export default MarketInstancePage;