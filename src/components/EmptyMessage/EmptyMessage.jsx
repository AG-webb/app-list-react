import React from 'react';
import './style.scss';

const EmptyMessage = ({ selectedFilter, searchQuery }) => {
    const seletedFilterPart = selectedFilter !== "All" && selectedFilter ? `in ${selectedFilter} Category` : "";
    const searchQueryPart = searchQuery && "with \"" + searchQuery + "\" name";

    return (<li className='message'>
            Nothing Found {seletedFilterPart} {searchQueryPart}
        </li>
    );
}

export default EmptyMessage;