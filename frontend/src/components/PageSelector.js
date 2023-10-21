import "../styles/PageSelector.css";
import React from "react";
import Pagination from 'react-bootstrap/Pagination';

function PageSelector(props) {
    const {
        numPages,
        curPage,
        setCurPage,
    } = props;
    const pages = [];
    if (numPages <= 9) {
        for(let i = 1; i <= numPages; ++i) {
            pages.push(i);
        }
    } else if (curPage < 5) {
        for(let i = 1; i <= 9; ++i) {
            pages.push(i);
        }
    } else if (curPage > numPages - 4) {
        for(let i = numPages - 8; i <= numPages; ++i) {
            pages.push(i);
        }
    } else {
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
        {curPage !== 1
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
        {curPage !== numPages
        ? <Pagination.Last onClick={(e) => setPage(e, numPages)}/>
        : <Pagination.Last disabled/>}
    </Pagination>
    );
}

export default PageSelector;