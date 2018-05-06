import React from 'react';

const SearchResultsRow = (props) => {
    const setActive = (e) => {
        e.preventDefault();
        props.setActiveHouse(props.house);
    };

    return <tr onClick={setActive}>
        <td>{props.house.address}</td>
        <td>{props.house.price}</td>
        <td>{props.house.likes}</td>
    </tr>
};

export default SearchResultsRow;