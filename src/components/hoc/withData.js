import React, {useState, useEffect} from 'react';
import Spinner from '../spinner';


export const withData = (View) => {
    return (props) => {

        let [state, updateState] = useState({});

        useEffect( () => {
        const {getData} = props;
            getData()
                .then( (data) => {
                    updateState({ data })
                })
        }, [] )

        
        if (!state.data) {
            return <Spinner/>
        }

        return <View {...props} data={state.data}/>
    }
}