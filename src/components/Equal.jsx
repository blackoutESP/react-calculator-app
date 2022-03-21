import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ResultContext } from '../App';

const Equal = ({ symbol, className, clickHandlerEqual}) => {
    const { value } = useContext(ResultContext);
    return (
        <div className={className}>
            <button onClick={() => console.log(value)}>{symbol}</button>
        </div>
    );
};

/* Equal.propTypes = {
    symbol: PropTypes.string.isRequired,
    className: PropTypes.string,
    result: PropTypes.array,
    clickHandlerEqual: PropTypes.func.isRequired
}; */

export default Equal;