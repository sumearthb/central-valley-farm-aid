import "../styles/Locations.css";
import React, { useState, useEffect, Fragment } from "react";
import LocationCard from "../components/LocationCard/LocationCard";
import { Button, Col, Container, Row, Form, DropdownButton, Dropdown } from "react-bootstrap";
import PageSelector from "../components/PageSelector";
import { fetchLocations, fetchLocationsLength } from "../utils/ApiUtils";

const LocationsGrid = () => {

  const [locations, setLocations] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [totalLocations, setTotalLocations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("asc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const initPages = async () => {
      setLoading(true);
      const numLocations = await fetchLocationsLength();
      setTotalLocations(numLocations);
      setNumPages(Math.ceil(numLocations / 9));
      setLoading(false);
    };
    initPages();
  }, []);

  useEffect(() => {
    const loadLocations = async () => {
      setLoading(true);
      const fetchedLocations = await fetchLocations(curPage, 9, sortBy, orderBy, search);
      setLocations(fetchedLocations.data);
      setLoading(false);
    };
    loadLocations(); 
    // eslint-disable-next-line
  }, [curPage, sortBy, orderBy]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fetchedLocations = await fetchLocations(1, 999, sortBy, orderBy, search);
    setLocations(fetchedLocations.data);
    setTotalLocations(fetchedLocations.instance_count);
    setNumPages(Math.ceil(fetchedLocations.instance_count / 9));
    setCurPage(1);
    setLoading(false);
  };

  const pagination = () => (
    !loading && <div className="pageselector">
    <PageSelector
    numPages={numPages}
    curPage={curPage}
    setCurPage={setCurPage}/>
    </div> 
  );


  return (
    <Container className="d-flex justify-content-center flex-column" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Container className="container text-center mt-5 mb-4">
        <h1>Locations</h1>
      </Container>
      <Container>
        <Row className="p-3">
        <Form className="d-flex justify-content-end" onSubmit={handleSearch}>
          <Form.Control type="search" id="searchText" placeholder="Search..." 
              className="mx-2" aria-label="Search" onChange={(e) => setSearch(e.target.value)}></Form.Control>
          <Button type="submit" variant="dark">Search</Button>
        </Form>
        </Row>
        <Row>
          <Col>
            <DropdownButton id="dropdown-basic-button" title={`Sort By: ${(sortBy.charAt(0).toUpperCase() + sortBy.slice(1)).replace("_", " ")}`}>
              {sortBy &&
              <Fragment>
                <Dropdown.Item onClick={() => setSortBy("")}>None</Dropdown.Item>
                <Dropdown.Divider />
              </Fragment>}
              <Dropdown.Item onClick={() => setSortBy("name")}>Name</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("county_seat")}>County Seat</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("crops")}>Number of Crops</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("population")}>Population</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("established")}>Established</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("area")}>Area</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col>
            <DropdownButton id="dropdown-basic-button" title={`Order By: ${orderBy.charAt(0).toUpperCase() + orderBy.slice(1)}ending`}>
              <Dropdown.Item onClick={() => setOrderBy("asc")}>Ascending</Dropdown.Item>
              <Dropdown.Item onClick={() => setOrderBy("desc")}>Descending</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>

      <Container>
        <h3 style={{ marginBottom: "30px"}}>{`Displaying ${locations.length} out of ${totalLocations} results`}</h3>
      </Container>
      {pagination()}

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

      {pagination()}

    </Container>
  );
};

export default LocationsGrid;
