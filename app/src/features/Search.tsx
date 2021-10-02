import React from 'react';

// const SearchService = React.lazy(() => import("search/Search"));

const Search = () => {
    return (
        <React.Suspense fallback="Loading ProductService">
            {/*<SearchService/>*/}
        </React.Suspense>
    );
};

export default Search;
