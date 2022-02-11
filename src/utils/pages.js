export const getPagesCount = (totalItemsCount, pageLimit) => {
    return Math.ceil(totalItemsCount / pageLimit);
}

export const getPagesArray = (pagesCount) => {
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return pages;
}