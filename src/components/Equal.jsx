import React from 'react';
import PropTypes from 'prop-types';
// import { ResultContext } from '../App';

const Equal = ({ state, symbol, className, ClickHandlerEqual}) => {
    return (
        <div className={className}>
            <button onClick={ClickHandlerEqual}>{symbol}</button>
        </div>
    );
};

Equal.propTypes = {
    symbol: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
};

export default Equal;