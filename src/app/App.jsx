import './App.scss';
import Nav from '../components/Nav/Nav';
import AppItem from '../components/AppItem/AppItem';
import { useEffect, useMemo, useState } from 'react';
import Paging from '../components/Paging/Paging';
import { mainAPI } from '../api/api';
import { getPagesCount } from '../utils/pages';
import Header from '../components/Header/Header';

function App() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSort, setSelectedSort] = useState("All");
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageData, setCurrentPageData] = useState([]);

    useEffect(() => {
        mainAPI.fetchData().then(data => {
            setData(data);
            setTotalItemsCount(data.length);
        });
    }, []);

    const pageLimit = 4;
    const pagesCount = getPagesCount(totalItemsCount, pageLimit);

    useMemo(() => {
        let firstItemIndex = 0;
        let lastItemIndex = (pageLimit * currentPage) - 1;
        let newData = [];

        if(currentPage > 1) {
            firstItemIndex = ((pageLimit * currentPage) - pageLimit);
        } else {
            firstItemIndex = 0;
        }

        for(let i = firstItemIndex; i < lastItemIndex + 1; i++) {
            if(data[i]) {
                newData = [...newData, data[i]];
            }
        }

        setCurrentPageData(newData);
    }, [data, currentPage]);

    const goToNextPage = () => {
        if (currentPage < pagesCount) {
            setCurrentPage(currentPage + 1);
        }
    }

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    let filteredData = useMemo(() => [], []);
    let filteredAndSearchedData = useMemo(() => [], []);
    let sotedAndFilteredAndSearchedData = [];

    filteredData = useMemo(() => {
        if(currentPageData.length) {
            if (selectedSort !== "All") {
                return currentPageData.filter(({ categories }, index) => {
                    return categories.includes(selectedSort);
                });
            } else {
                return currentPageData;
            }
        }

        return [];
    }, [currentPageData, selectedSort]);

    filteredAndSearchedData = useMemo(() => {
        if(filteredData.length) {
            if (searchQuery.length) {
                return filteredData.filter(({ name }, index) => {
                    return name.toLowerCase().includes(searchQuery.toLowerCase());
                });
            } else {
                return filteredData;
            }
        }

        return [];
    }, [filteredData, searchQuery]);

    sotedAndFilteredAndSearchedData = useMemo(() => {
        return filteredAndSearchedData.sort((a, b) => {
            const reducer = (a, b) => {
                return a + (b["price"] || 0);
            }

            let firstPrices = a["subscriptions"].reduce(reducer, 0);
            let lastPrices = b["subscriptions"].reduce(reducer, 0);

            return firstPrices - lastPrices;
        });
    }, [filteredAndSearchedData])

    const getApps = () => {
        if(sotedAndFilteredAndSearchedData.length) {
            return sotedAndFilteredAndSearchedData.map(app => {
                return <li key={app.id}>
                    <AppItem key={app.id} {...app} />
                </li>
            });
        }

        return <li className='message'>
            Nothing Found in {selectedSort} Category {searchQuery && "with \"" + searchQuery + "\" name"}
        </li>
    }
    
    return (
        <div className="flex-container">
            <Nav selectedSort={selectedSort} setSelectedSort={setSelectedSort}/>
            <section className="apps-list">
                <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <ul>
                    { getApps() }
                </ul>
                <Paging
                    totalItemsCount={totalItemsCount}
                    pageLimit={pageLimit}
                    goToNextPage={goToNextPage}
                    goToPrevPage={goToPrevPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pagesCount={pagesCount}
                />
            </section>
        </div>
    );
}

export default App;
