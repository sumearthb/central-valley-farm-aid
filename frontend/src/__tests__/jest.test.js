import React from "react";
import { render } from '@testing-library/react';
import About from "../pages/About";
import Home from "../pages/Home";
import Locations from "../pages/Locations"
import NonProfits from "../pages/NonProfits"
import FarmersMarkets from "../pages/FarmersMarkets"

test("Render Home Page", () => {
    render(<Home/>);
    const titleElem = screen.getByText("Welcome to Central Valley Farm Aid");
    expect(titleElem).toBeInTheDocument();
});

test("Render About Page", () => {
    render(<About/>);
    const titleElem = screen.getByText("About");
    expect(titleElem).toBeInTheDocument();
});

test("Render Location Model Page", () => {
    render(<Locations/>);
    const titleElem = screen.getByText("Locations");
    expect(titleElem).toBeInTheDocument();
});

test("Render NonProfit Model Page", () => {
    render(<NonProfits/>);
    const titleElem = screen.getByText("Non-Profit Organizations");
    expect(titleElem).toBeInTheDocument();
});

test("Render FarmersMarkets Model Page", () => {
    render(<FarmersMarkets/>);
    const titleElem = screen.getByText("Farmers' Markets");
    expect(titleElem).toBeInTheDocument();
});

