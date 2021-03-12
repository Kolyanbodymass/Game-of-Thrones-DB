import React from 'react';
import './itemList.css';
import {withData} from '../hoc/withData';

const ItemList = (props) => {

    const renderItems = (arr) => {
        return arr.map((item) => {
            const {id} = item;

            const label = props.renderItem(item);

            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={ () => props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    const {data} = props;
    const items = renderItems(data);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
    
}

export default withData(ItemList);