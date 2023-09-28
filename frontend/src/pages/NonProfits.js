import React from "react";
import NPCard from "../components/NPCard/NPCard";
import { Link } from "react-router-dom";
import californiafresh from "../card-pics/nonprofits-pics/californiafresh.png";
import cfe from "../card-pics/nonprofits-pics/cfe.jpg";
import pfl from "../card-pics/nonprofits-pics/pfl.png";
import { Container, Col } from "react-bootstrap/";

const NPData = [
  { title: "California Fresh Farmers' Markets Association", image: californiafresh, county: "County: Fresno", NTEE_code: "NTEE Code: K03", phone: "Phone: (559) 417-7970", employees: "Num. Employees: 16"},
  { title: "California Food Expo", image: cfe, county: "County: Fresno", NTEE_code: "NTEE Code: K31", phone: "Phone: (559) 227-9999", employees: "Num. Employees: 0" },
  { title: "People Land and Food Foundation", image: pfl, county: "County: Fresno", NTEE_code: "NTEE Code: K20", phone: "Phone: (559) 855-3710", employees: "Num. Employees: 1" },
];

const NPGrid = () => {
  return (
    <Container className="d-flex justify-content-center flex-column">
      <Container className="container text-center mt-5 mb-4">
        <h1>Non-Profit Organizations</h1>
      </Container>

      <Container className="px-4">
        <Container className="row gx-3">
          {( NPData.map((nonprofit, index) => (
            <Col key={index} xs={12} sm={8} md={5} lg={4}>
              <Link
                key={index}
                to={`/nonprofit/${encodeURIComponent(nonprofit.title)}`} // Specify the URL for the nonprofit
                style={{ textDecoration: "none" }}
              >
                <NPCard
                  title={nonprofit.title}
                  image={nonprofit.image}
                  county={nonprofit.county}
                  NTEE_code={nonprofit.NTEE_code}
                  phone={nonprofit.phone}
                  employees={nonprofit.employees}
                />
              </Link>
            </Col>
            ))
          )}
        </Container>
      </Container>
    </Container>
  );
};

export default NPGrid;
