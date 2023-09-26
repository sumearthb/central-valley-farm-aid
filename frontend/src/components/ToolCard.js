import PropTypes from "prop-types";
import React from "react";
import Card from "react-bootstrap/Card";

export const toolsUsed = [
    {
        name: "React",
        img: `${process.env.PUBLIC_URL}/tools-used/react.png`
    },
    {
        name: "Javascript",
        img: `${process.env.PUBLIC_URL}/tools-used/javascript.png`
    },
    {
        name: "Python",
        img: `${process.env.PUBLIC_URL}/tools-used/python.png`
    },
    {
        name: "GitLab",
        img: `${process.env.PUBLIC_URL}/tools-used/gitlab.png`
    },
    {
        name: "Postman",
        img: `${process.env.PUBLIC_URL}/tools-used/postman.png`
    },
    {
        name: "Amazon Web Services",
        img: `${process.env.PUBLIC_URL}/tools-used/aws.png`
    }

]

function ToolCard(props) {
    const {
      name,
      img
    } = props;
  
    return (
      <Card className="tool-card">
        <Card.Img className="tool-card-image" variant="top"
          src={img} />
        <Card.Body className="tool-card-body">
          <Card.Title className="tool-card-name">
            {name}
          </Card.Title>
        </Card.Body>
      </Card>
    );
  }
  
  ToolCard.propTypes = {
    name: PropTypes.string.isRequired
  };
  
  export default ToolCard;