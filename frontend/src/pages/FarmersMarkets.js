import React, { useState, useEffect } from "react";
import FMCard from "../components/FMCard/FMCard";
import { Container, Col } from "react-bootstrap";
import PageSelector from "../components/PageSelector";
import { fetchMarkets, fetchMarketsLength } from "../utils/ApiUtils";

const FMGrid = () => {

  const [markets, setMarkets] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [totalMarkets, setTotalMarkets] = useState(0);
  const [loading, setLoading] = useState(true);

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
      const fetchedMarkets = await fetchMarkets(curPage, 9);
      setMarkets(fetchedMarkets.data);
      setLoading(false);
    };
    loadMarkets();
    
  }, [curPage]);

  return (
    <>
    <Container className="d-flex justify-content-center flex-column" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Container className="container text-center mt-5 mb-4">
        <h1>Farmers' Markets</h1>
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
        <Container className="row gx-3">
          {( markets.map((market, index) => (
            <Col key={index} xs={12} sm={8} md={5} lg={4} className="d-flex justify-content-center">
              <FMCard
                title={market.listing_name}
              />
            </Col>
          )))}
        </Container>
      </Container>
    </Container>
    </>
  );
};

export default FMGrid;