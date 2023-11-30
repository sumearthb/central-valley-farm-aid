import "../styles/ProviderVis.css";
import React from "react";
import { Container } from "react-bootstrap";
import AlternateFoodVis from "../components/AlternateFoodVis";
import VolunteerOpVis from "../components/VolunteerOpVis";

const ProviderVis = () => {

  return (
    <Container>
        <Container className="vis">
            <h2>
                Locations of Alternate Food Sources
            </h2>
            <AlternateFoodVis
            >
            </AlternateFoodVis>
        </Container>
        <Container className="vis">
            <h2>
                Locations of Alternate Food Sources
            </h2>
            <VolunteerOpVis
                >
            </VolunteerOpVis>
        </Container>
    </Container>
  );
};

export default ProviderVis;
