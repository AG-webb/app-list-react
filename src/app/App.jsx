import './App.scss';
import Nav from '../components/Nav/Nav';
import AppItem from '../components/AppItem/AppItem';
import { useEffect, useMemo, useState } from 'react';
import Paging from '../components/Paging/Paging';
import { mainAPI } from '../api/api';
import { getPagesCount } from '../utils/pages';
import Header from '../components/Header/Header';
import EmptyMessage from '../components/EmptyMessage/EmptyMessage';

function App() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
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

    let filteredData = useMemo(() => [], []);
    let filteredAndSearchedData = useMemo(() => [], []);
    let sotedAndFilteredAndSearchedData = useMemo(() => [], []);

    filteredData = useMemo(() => {
        if(data.length) {
            setCurrentPage(1);

            if (selectedFilter !== "All" && selectedFilter !== "") {
                return data.filter(({ categories }, index) => {
                    return categories.includes(selectedFilter);
                });
            } else {
                return data;
            }
        }

        return [];
    }, [data, selectedFilter]);

    filteredAndSearchedData = useMemo(() => {
        if(filteredData.length) {
            setCurrentPage(1);

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
        setCurrentPage(1);

        return filteredAndSearchedData.sort((a, b) => {
            const reducer = (a, b) => {
                return a + (b["price"] || 0);
            }

            let firstPrices = a["subscriptions"].reduce(reducer, 0);
            let lastPrices = b["subscriptions"].reduce(reducer, 0);

            return firstPrices - lastPrices;
        });
    }, [filteredAndSearchedData]);

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
            if(sotedAndFilteredAndSearchedData[i]) {
                newData = [...newData, sotedAndFilteredAndSearchedData[i]];
            }
        }

        setCurrentPageData(newData);
        setTotalItemsCount(sotedAndFilteredAndSearchedData.length);
    }, [sotedAndFilteredAndSearchedData, currentPage]);

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

    const getApps = () => {
        if(currentPageData.length) {
            return currentPageData.map(app => {
                return <li key={app.id}>
                    <AppItem key={app.id} {...app} />
                </li>
            });
        }

        return <EmptyMessage selectedFilter={selectedFilter} searchQuery={searchQuery}/>
    }
    
    return (
        <div className="flex-container">
            <Nav selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
            <section className="apps-list">
                <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <ul>
                    { getApps() }
                </ul>
                {currentPageData.length ?  
                    <Paging
                        totalItemsCount={totalItemsCount}
                        pageLimit={pageLimit}
                        goToNextPage={goToNextPage}
                        goToPrevPage={goToPrevPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pagesCount={pagesCount}
                    /> : null
                }
                
            </section>
        </div>
    );
}

export default App;
