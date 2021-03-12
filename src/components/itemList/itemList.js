import React from 'react';
import './itemList.css';
import {withData} from '../hoc/withData';
import PropTypes from 'prop-types';



const ItemList = ({renderItem, onItemSelected, data}) => {

    const renderItems = (arr) => {
        return arr.map((item) => {
            const {id} = item;

            const label = renderItem(item);
            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={ () => onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    const items = renderItems(data);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
    
}

export default withData(ItemList);

// ItemList.defaultProps = {
//     onItemSelected: () => {}
// }

// ItemList.propTypes = {
//     onItemSelected: PropTypes.func
// }