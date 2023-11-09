import "../styles/FarmersMarkets.css";
import React, { useState, useEffect, Fragment } from "react";
import FMCard from "../components/FMCard/FMCard";
import { Button, Container, Col, Row, Dropdown, DropdownButton, Form } from "react-bootstrap";
import PageSelector from "../components/PageSelector";
import { fetchMarkets, fetchMarketsLength } from "../utils/ApiUtils";

const FMGrid = () => {

  const [markets, setMarkets] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [totalMarkets, setTotalMarkets] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("asc");
  const [wheelchairAccessible, setWheelchairAccessible] = useState("");
  const [indoors, setIndoors] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const initPages = async () => {
      setLoading(true);
      const numMarkets = await fetchMarketsLength();
      setTotalMarkets(numMarkets);
      setNumPages(Math.ceil(numMarkets / 9));
      setLoading(false);
    };
    initPages();
  }, []);

  useEffect(() => {
    const loadMarkets = async () => {
      setLoading(true);
      const fetchedMarkets = await fetchMarkets(curPage, 9, sortBy, orderBy, search, wheelchairAccessible, indoors);
      setMarkets(fetchedMarkets.data);
      setLoading(false);
    };
    loadMarkets();
  }, [curPage, sortBy, orderBy, wheelchairAccessible, indoors]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fetchedMarkets = await fetchMarkets(1, 999, sortBy, orderBy, search);
    setMarkets(fetchedMarkets.data);
    setTotalMarkets(fetchedMarkets.instance_count);
    setNumPages(Math.ceil(fetchedMarkets.instance_count / 9));
    setCurPage(1);
    setLoading(false);
  };

  return (
    <Container className="d-flex justify-content-center flex-column" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Container className="container text-center mt-5 mb-4">
        <h1>Farmers' Markets</h1>
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
            <DropdownButton id="dropdown-basic-button" title={`Sort By: ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}`}>
              {sortBy &&
              <Fragment>
                <Dropdown.Item onClick={() => setSortBy("")}>None</Dropdown.Item>
                <Dropdown.Divider />
              </Fragment>}
              <Dropdown.Item onClick={() => setSortBy("name")}>Name</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("rating")}>Rating</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col>
            <DropdownButton id="dropdown-basic-button" title={`Order By: ${orderBy.charAt(0).toUpperCase() + orderBy.slice(1)}ending`}>
              <Dropdown.Item onClick={() => setOrderBy("asc")}>Ascending</Dropdown.Item>
              <Dropdown.Item onClick={() => setOrderBy("desc")}>Descending</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col>
            <DropdownButton id="dropdown-basic-button" title={`Wheelchair Accessible: ${wheelchairAccessible}`}>
              {wheelchairAccessible &&
              <Fragment>
                <Dropdown.Item onClick={() => setWheelchairAccessible("")}>None</Dropdown.Item>
                <Dropdown.Divider />
              </Fragment>}
              <Dropdown.Item onClick={() => setWheelchairAccessible("True")}>True</Dropdown.Item>
              <Dropdown.Item onClick={() => setWheelchairAccessible("False")}>False</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col>
            <DropdownButton id="dropdown-basic-button" title={`Indoors: ${indoors}`}>
              {indoors && 
              <Fragment>
                <Dropdown.Item onClick={() => setIndoors("")}>None</Dropdown.Item>
                <Dropdown.Divider />
              </Fragment>}
              <Dropdown.Item onClick={() => setIndoors("True")}>True</Dropdown.Item>
              <Dropdown.Item onClick={() => setIndoors("False")}>False</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>

      <Container>
        <h3 style={{ marginBottom: "30px"}}>{`Displaying ${markets.length} out of ${totalMarkets} results`}</h3>
      </Container>
      {!loading && <div className="pageselector">
        <PageSelector
        numPages={numPages}
        curPage={curPage}
        setCurPage={setCurPage}/>
        </div> }

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
    </Container>
  );
};

export default FMGrid;