import React, { useState, useEffect, Fragment } from "react";
import NPCard from "../components/NPCard/NPCard";
import { Button, Container, Col, Row, Dropdown, DropdownButton, Form } from "react-bootstrap";
import PageSelector from "../components/PageSelector";
import { fetchNonProfits, fetchNonProfitsLength } from "../utils/ApiUtils";

export const categories =
  ["Food, Agriculture and Nutrition", "Unknown", "Community Improvement, Capacity Building", "Philanthropy, Voluntarism and Grantmaking Foundations", "Human Services - Multipurpose and Other", "Educational Institutions and Related Activities",
  "Environmental Quality, Protection and Beautification", "Not Provided", "Youth Development", "Arts, Culture and Humanities", "Animal-Related", "Employment, Job-Related", "Mutual/Membership Benefit Organizations, Other"]

const NPGrid = () => {

  const [nonprofits, setNonProfits] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [totalNonProfits, setTotalNonProfits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("asc");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const initPages = async () => {
      setLoading(true);
      const numNonProfits = await fetchNonProfitsLength();
      setTotalNonProfits(numNonProfits);
      setNumPages(Math.ceil(numNonProfits / 9));
      setLoading(false);
    };
    initPages();
  }, []);

  useEffect(() => {
    const loadNonProfits = async () => {
      setLoading(true);
      const fetchedNonProfits = await fetchNonProfits(curPage, 9, sortBy, orderBy, search, category);
      setNonProfits(fetchedNonProfits.data);
      setLoading(false);
    };
    loadNonProfits();
    // eslint-disable-next-line
  }, [curPage, sortBy, orderBy, category]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fetchedNonProfits = await fetchNonProfits(curPage, 9, sortBy, orderBy, search, category);
    setNonProfits(fetchedNonProfits.data);
    setTotalNonProfits(fetchedNonProfits.instance_count);
    setNumPages(Math.ceil(fetchedNonProfits.instance_count / 9));
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
        <h1>Non Profits</h1>
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
              <Dropdown.Item onClick={() => setSortBy("city")}>City</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("ein")}>EIN</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col>
            <DropdownButton id="dropdown-basic-button" title={`Order By: ${orderBy.charAt(0).toUpperCase() + orderBy.slice(1)}ending`}>
              <Dropdown.Item onClick={() => setOrderBy("asc")}>Ascending</Dropdown.Item>
              <Dropdown.Item onClick={() => setOrderBy("desc")}>Descending</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col>
            <DropdownButton id="dropdown-basic-button" title={`Category: ${category}`}>
              {category &&
              <Fragment>
                <Dropdown.Item onClick={() => setCategory("")}>None</Dropdown.Item>
                <Dropdown.Divider />
              </Fragment>}
              {categories.map(category => (
                <Dropdown.Item onClick={() => setCategory(category)}>{category}</Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
      </Container>

      <Container>
        <h3 style={{ marginBottom: "30px"}}>{`Displaying ${nonprofits.length} out of ${totalNonProfits} results`}</h3>
      </Container>

      {pagination()}

      <Container className="px-4">
        <Row className="row gx-3">
          {(nonprofits.map((nonprofit, index) => (
            <Col key={index} xs={12} sm={8} md={5} lg={4} className="d-flex justify-content-center">
              <NPCard
                nonprofit={nonprofit}
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

export default NPGrid;
