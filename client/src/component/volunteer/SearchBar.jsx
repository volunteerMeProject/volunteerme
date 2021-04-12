// From https://medium.com/@pradityadhitama/simple-search-bar-component-functionality-in-react-6589fda3385d
import React from 'react';

const SearchBar = ({input: keyword, onChange: setKeyword}) => {
    const BarStyling = {width:"20rem", background:"#F2F1F9", border:"none", padding:"0.5rem", margin:"10px"};
    
    return (
        <input
         style={BarStyling}
         key="searchbar"
         value={keyword}
         placeholder={"Search by title"}
         onChange={(e) => setKeyword(e.target.value)}
        />
    );
}

export default SearchBar;