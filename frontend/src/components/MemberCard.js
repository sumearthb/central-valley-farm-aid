import PropTypes from "prop-types";
import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';

function MemberCard(props) {
  const {
    member
  } = props;

  return (
    <Card className="member-card">
      <Card.Img className="member-card-image" variant="top"
        src={`${process.env.PUBLIC_URL}/member-pics/${member.username}.jpg`} />
      <Card.Body className="member-card-body">
        <Card.Title className="member-card-name">
          {member.name}
        </Card.Title>
        <Card.Text className="member-card-gitlab">
          <a href={"https://gitlab.com/" + member.username}>
            {member.username}
          </a>
        </Card.Text>
        <Card.Text className="member-card-role">
          {member.role}
        </Card.Text>
        <Card.Text className="member-card-bio">
          {member.bio}
        </Card.Text>
        <ListGroup horizontal id="member-card-stats">
          <ListGroup.Item>{`${member.commits} Commits`}</ListGroup.Item>
          <ListGroup.Item>{`${member.issues} Issues`}</ListGroup.Item>
          <ListGroup.Item>{`${member.tests} Unit Tests`}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  commits: PropTypes.number.isRequired,
  issues: PropTypes.number.isRequired,
  tests: PropTypes.number.isRequired
};

export default MemberCard;
