import "../styles/Search.css";
import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useLocation } from 'react-router-dom';
import { fetchLocations, fetchMarkets, fetchNonProfits } from '../utils/ApiUtils';
import LocationCard from '../components/LocationCard/LocationCard';
import NPCard from '../components/NPCard/NPCard';
import FMCard from '../components/FMCard/FMCard';

const Search = () => {
    const location = useLocation();

    const [search, setSearch] = useState(location.state.search);
    const [locations, setLocations] = useState([]);
    const [nonprofits, setNonProfits] = useState([]);
    const [markets, setMarkets] = useState([]); 
    const [loading, setLoading] = useState(true);

    const loadLocations = async () => {
        setLoading(true);
        const fetchedLocations = await fetchLocations(1, 999, "", "", search);
        setLocations(fetchedLocations.data);
    };

    const loadNonProfits = async () => {
        setLoading(true);
        const fetchedNonProfits = await fetchNonProfits(1, 999, "", "", search, );
        setNonProfits(fetchedNonProfits.data);
        setLoading(false);
    };

    const loadMarkets = async () => {
        setLoading(true);
        const fetchedMarkets = await fetchMarkets(1, 999, "", "", search, "", "");
        setMarkets(fetchedMarkets.data);
        setLoading(false);
    };
    
    const handleSearch = (e) => {
        e.preventDefault();
        loadLocations();
        loadNonProfits();
        loadMarkets();
    };

    useEffect(() => {
        loadLocations();
        loadNonProfits();
        loadMarkets();
        // eslint-disable-next-line
    }, [search]);

    return (
        <Container>
            <Container className='search-bar'>
                <Form className="d-flex justify-content-end" onSubmit={handleSearch}>
                <Form.Control type="search" id="searchText" placeholder="Search..." value={search}
                    className="mx-2" aria-label="Search" onChange={(e) => setSearch(e.target.value)}></Form.Control>
                    <Button type="submit" variant="dark">Search</Button>
                </Form>
            </Container>
            <Container>
            <Tabs
            defaultActiveKey="locations"
            id="justify-tab-example"
            className="mb-3"
            justify>
                <Tab eventKey="locations" title="Locations">
                    {!loading &&
                    <Container className="px-4">
                        <Row className="row gx-3">
                        {( locations.map((location, index) => (
                            <Col key={index} xs={12} sm={8} md={5} lg={4} className="d-flex justify-content-center">
                            <LocationCard
                                location={location}
                                search={search}
                            />
                            </Col>
                        )))}
                        </Row>
                    </Container>
                    }
                </Tab>
                <Tab eventKey="nonprofits" title="Non Profits">
                    {!loading &&
                    <Container className="px-4">
                        <Row className="row gx-3">
                        {( nonprofits.map((nonprofit, index) => (
                            <Col key={index} xs={12} sm={8} md={5} lg={4} className="d-flex justify-content-center">
                            <NPCard
                                nonprofit={nonprofit}
                                search={search}
                            />
                            </Col>
                        )))}
                        </Row>
                    </Container>
                    }
                </Tab>
                <Tab eventKey="markets" title="Farmers' Markets">
                    {!loading &&
                    <Container className="px-4">
                        <Row className="row gx-3">
                        {( markets.map((market, index) => (
                            <Col key={index} xs={12} sm={8} md={5} lg={4} className="d-flex justify-content-center">
                            <FMCard
                                market={market}
                                search={search}
                            />
                            </Col>
                        )))}
                        </Row>
                    </Container>
                    }
                </Tab>
            </Tabs>
        </Container>
        </Container>
    );
} 

export default Search;