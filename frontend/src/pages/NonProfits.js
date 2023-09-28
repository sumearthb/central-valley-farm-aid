import React from "react";
import NPCard from "../components/NPCard/NPCard";
import californiafresh from "../card-pics/np-pics/californiafresh.png";
import cfe from "../card-pics/np-pics/cfe.jpg";
import pfl from "../card-pics/np-pics/pfl.png";
import { Container, Col } from "react-bootstrap/";

const NPGrid = () => {
  const NPData = [
    { title: "California Fresh Farmers' Markets Association", image: californiafresh, county: "County: Fresno", year: "Est: 2019", NTEE_code: "NTEE Code: K03", phone: "Phone: (559) 417-7970", employees: "Num. Employees: 16"},
    { title: "California Food Expo", image: cfe, county: "County: Fresno", year: "Est: 2015", NTEE_code: "NTEE Code: K31", phone: "Phone: (559) 227-9999", employees: "Num. Employees: 0" },
    { title: "People Land and Food Foundation", image: pfl, county: "County: Fresno", year: "Est: 1975", NTEE_code: "NTEE Code: K20", phone: "Phone: (559) 855-3710", employees: "Num. Employees: 1" },
  ];

  return (
    <Container className="d-flex justify-content-center flex-column">
      <Container className="container text-center mt-5 mb-4">
        <h1>Non-Profit Organizations</h1>
      </Container>

      <Container>
        <h3 style={{ marginBottom: "30px" }}>Displaying 3 out of 3 results</h3>
      </Container>

      <Container className="px-4">
        <Container className="row gx-3">
          {( NPData.map((np, index) => (
            <Col key={index} xs={12} sm={8} md={5} lg={4}>
                <NPCard
                  title={np.title}
                  image={np.image}
                  county={np.county}
                  NTEE_code={np.NTEE_code}
                  phone={np.phone}
                  employees={np.employees}
                  year={np.year}
                />
            </Col>
            ))
          )}
        </Container>
      </Container>
    </Container>
  );
};

export default NPGrid;
