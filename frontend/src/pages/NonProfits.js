import React, { useState, useEffect } from "react";
import NPCard from "../components/NPCard/NPCard";
import { Container, Col, Row } from "react-bootstrap/";
import PageSelector from "../components/PageSelector";
import { fetchNonProfits, fetchNonProfitsLength } from "../utils/ApiUtils";

const NPGrid = () => {

  const [nonprofits, setNonProfits] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [totalNonProfits, setTotalNonProfits] = useState(0);
  const [loading, setLoading] = useState(true);

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
      const fetchedNonProfits = await fetchNonProfits(curPage, 9);
      setNonProfits(fetchedNonProfits.data);
      setLoading(false);
    };
    loadNonProfits();
    
  }, [curPage]);

  return (
    <Container className="d-flex justify-content-center flex-column" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Container className="container text-center mt-5 mb-4">
        <h1>NonProfits</h1>
      </Container>

      <Container>
        <h3 style={{ marginBottom: "30px"}}>{`Displaying ${nonprofits.length} out of ${totalNonProfits} results`}</h3>
      </Container>
      {!loading && <div className="pageselector">
        <PageSelector
        numPages={numPages}
        curPage={curPage}
        setCurPage={setCurPage}/>
        </div> }

      <Container className="px-4">
        <Container className="row gx-3">
          {(nonprofits.map((nonprofit, index) => (
            <Col key={index} xs={12} sm={8} md={5} lg={4} className="d-flex justify-content-center">
              <NPCard
                charityName={nonprofit.charityName}
                category={nonprofit.category}
                city={nonprofit.city}
                phone={nonprofit.phone}
                url={nonprofit.url}
                img={nonprofit.photo_references.photos[0]}
              />
            </Col>
          )))}
        </Container>
      </Container>
    </Container>
  );
};

export default NPGrid;
