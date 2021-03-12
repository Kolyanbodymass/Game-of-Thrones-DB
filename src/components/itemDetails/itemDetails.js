import React, {useState, useEffect} from 'react';
import './itemDetails.css';
import Spinner from '../spinner';

export const Field = ({field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{field}</span>
        </li>
    )
}

const ItemDetails = ({itemId, getData, children}) => {

    let [state, setState] = useState([{}]);

    useEffect( () => {
        updateItem();
        return () => {setState([{}])}
    }, [itemId])

    const updateItem = () => {
        
        if (!itemId) {
            return;
        }
         
        getData(itemId)
            .then((item) => {
                setState([{item}, false])
            })
        const item = {};
        setState([{item}, true])
    }

    if (!state[0].item) {
        return <span className='select-error'>Please select item in the list</span>
    } else if (state[1]) {
        console.log(state[1]);
        return <Spinner />
    }
   
    const {name} = state[0].item;

    return (
        <div className="char-details rounded">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, state.item)
                    })
                }
            </ul>
        </div>
    );
}

export default ItemDetails;