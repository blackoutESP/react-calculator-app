import React from 'react';
import PropTypes from 'prop-types';

const Equal = ({ symbol, className, state, clickHandlerEqual }) => (
    (
        <div className={ className }>
            <button onClick={() => clickHandlerEqual(0)}>{ symbol }</button>
        </div>
    )
);

/* Equal.propTypes = {
    symbol: PropTypes.string.isRequired,
    className: PropTypes.string,
    result: PropTypes.array,
    clickHandlerEqual: PropTypes.func.isRequired
}; */

export default Equal;