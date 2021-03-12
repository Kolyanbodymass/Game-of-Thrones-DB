import React, {useState, useEffect} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

const RandomChar = (props) =>  {
    const service = new gotService();

    let [state, setState] = useState({
        char: {},
        loading: true,
        error: false
    })

    const onCharLoaded = (char) => {
        setState({
            char,
            loading: false
        })
    }

    const onError = (err) => {
        setState({
            error: true,
            loading: false
        })
    }

    const updateChar = () => {
        const id = Math.floor(Math.random()*140 + 25); //25-140
        service.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }

    useEffect( () => {
        updateChar();
        let timerId = setInterval(updateChar, props.interval);
        return () => {
            clearInterval(timerId);
        }
    }, []);

    const {char, loading, error} = state;

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;

    return (
        <div className="random-block rounded">
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}



export default RandomChar;

RandomChar.defaultProps = {
    interval: 15000
}

RandomChar.propTypes = {
    interval: PropTypes.number
}