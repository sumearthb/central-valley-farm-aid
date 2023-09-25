import PropTypes from "prop-types";
import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';

function MemberCard(props) {
  const {
    name,
    username,
    bio,
    commits,
    issues,
  } = props;

  return (
    <Card className="member-card">
      <Card.Img className="member-card-image" variant="top"
        src={`${process.env.PUBLIC_URL}/member-pics/${username}.jpg`} />
      <Card.Body className="member-card-body">
        <Card.Title className="member-card-name">
          {name}
        </Card.Title>
        <Card.Text className="member-card-gitlab">
          <a href={"https://gitlab.com/" + username}>
            {username}
          </a>
        </Card.Text>
        <Card.Text className="member-card-bio">
          {bio}
        </Card.Text>
        <ListGroup horizontal id="member-card-stats">
          <ListGroup.Item>{`${commits} Commits`}</ListGroup.Item>
          <ListGroup.Item>{`${issues} Issues`}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  commits: PropTypes.number.isRequired,
  issues: PropTypes.number.isRequired,
};

export default MemberCard;
