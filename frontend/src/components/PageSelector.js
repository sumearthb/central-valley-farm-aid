import "../styles/PageSelector.css";
import React from "react";
import Pagination from 'react-bootstrap/Pagination';

function PageSelector(props) {
    const {
        numPages,
        curPage,
        setCurPage
    } = props;
    let pages = [];

    if (numPages <= 9) {
        console.log("A");
        for(let i = 1; i <= numPages; ++i) {
            pages.push(i);
        }
    } else if (curPage < 5) {
        for(let i = 1; i <= 9; ++i) {
            pages.push(i);
        }
    } else if (curPage > numPages - 4) {
        console.log("B");
        for(let i = numPages - 8; i <= numPages; ++i) {
            pages.push(i);
        }
    } else {
        console.log("C");
        for(let i = curPage - 4; i <= curPage + 4; ++i) {
            pages.push(i);
        }
    }

    const setPage = (e, page) => {
        setCurPage(page);
        e.target.blur();
      };
    
    

    return (
    <Pagination>
        {(numPages > 9 && curPage > 5)
        ? <Pagination.First onClick={(e) => setPage(e, 1)}/>
        : <Pagination.First disabled/>}
        {curPage === 1
        ? <Pagination.Prev disabled/>
        : <Pagination.Prev onClick={(e) => setPage(e, curPage - 1)}/>}

        {pages.map((page) => (
            page === curPage 
            ? <Pagination.Item onClick={(e) => setPage(e, page)} active>{page}</Pagination.Item>
            : <Pagination.Item onClick={(e) => setPage(e, page)}>{page}</Pagination.Item>
        ))}

        {curPage === numPages
        ? <Pagination.Next disabled/>
        : <Pagination.Next onClick={(e) => setPage(e, curPage + 1)}/>}
        {(numPages > 9 && curPage < numPages - 4)
        ? <Pagination.Last onClick={(e) => setPage(e, numPages)}/>
        : <Pagination.Last disabled/>}
    </Pagination>
    );
}

export default PageSelector;