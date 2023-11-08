/**
 * @jest-environment jsdom
 */

import React from "react";

import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import NavBar from "../components/NavBar.js"
import LocationCard from "../components/LocationCard/LocationCard.js";
import NPCard from "../components/NPCard/NPCard.js";
import FMCard from "../components/FMCard/FMCard.js";
import MemberCard from "../components/MemberCard.js";
import test_location from "./location.json";
import test_nonprofit from "./nonprofit.json";
import test_farmersmarket from "./farmersmarket.json";
import test_member from "./test_member.json";

test("test location card snapshot", () => {
  const location = test_location;
  const tree = renderer
    .create(
      <Router>
        <LocationCard
        location={location} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
  
test("test nonprofit card snapshot", () => {
  const nonprofit = test_nonprofit;
  const tree = renderer
    .create(
      <Router>
        <NPCard nonprofit={nonprofit} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
  
test("test farmers market card snapshot", () => {
  const market = test_farmersmarket;
  const tree = renderer
    .create(
      <Router>
        <FMCard market={market} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
  
test("test member card snapshot", () => {
  const member = test_member;
  const tree = renderer
    .create(
      <Router>
        <MemberCard member={member} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Test whether the Navbar works", () => {
    const tree = renderer.create(
      <Router>
        <NavBar />
      </Router>
    );
    expect(tree).toMatchSnapshot();
});
  
  test("Test whether the Navbar contains links to About, Home, Parks, Animals, and States", async () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toHaveTextContent("Home");
    expect(navbar).toHaveTextContent("About");
    expect(navbar).toHaveTextContent("Locations");
    expect(navbar).toHaveTextContent("Nonprofits");
    expect(navbar).toHaveTextContent("Farmers' Markets");
});
  

