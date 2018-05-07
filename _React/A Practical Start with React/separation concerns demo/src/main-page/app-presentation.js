import React from 'react';
import Header from './header';
import FeaturedHouse from './featured-house';
import SearchResults from '../search-results';
import HouseFilter from './house-filter';
import HouseDetail from '../house';

const AppPresentation = (props) => {
    let activeComponent = null;
    if (props.country)
        activeComponent = <SearchResults country={props.country} filteredHouses={props.filteredHouses} setActiveHouse={props.setActiveHouse} />;
    if (props.activeHouse)
        activeComponent = <HouseDetail house={props.activeHouse} />;
    if (!activeComponent)
        activeComponent = <FeaturedHouse house={props.featuredHouse} />;

    return (
        <div className="container">
            <Header />
            <HouseFilter countries={props.countries} filterHouses={props.filterHouses} />
            {activeComponent}
        </div>
    );
}

export default AppPresentation;