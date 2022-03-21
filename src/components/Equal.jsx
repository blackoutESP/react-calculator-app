import React from 'react';
import PropTypes from 'prop-types';

const Equal = ({ symbol, className, clickHandlerEqual, state }) => (
    (
        <div className={ className }>
            <button onClick={() => clickHandlerEqual(state)}>{ symbol }</button>
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