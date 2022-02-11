import React from 'react';
import { getPagesArray } from '../../utils/pages';
import './style.scss'

const Paging = ({  goToNextPage, goToPrevPage, currentPage, setCurrentPage, pagesCount }) => {    
    const pages = getPagesArray(pagesCount);

    const mapPages = () => {
        return pages.map(page => {
            let activeClass = currentPage === page ? "active" : "";
            return <li key={page} className={activeClass}>
                <div className='pagination-item' onClick={() => setCurrentPage(page)}>{page}</div>
            </li>
        })
    }

    return (
        <ul className="pagination">
            <li>
                <div className='pagination-item' onClick={goToPrevPage}>&lt;</div>
            </li>
            { mapPages() }
            <li>
                <div className='pagination-item' onClick={goToNextPage}>&gt;</div>
            </li>
        </ul>
    );
}

export default Paging;