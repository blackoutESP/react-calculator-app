import React from 'react';
import PropTypes from 'prop-types';

const Equal = ({ symbol, className, clickHandlerEqual, value }) => (
    (
        <div className={ className }>
            <button onClick={() => clickHandlerEqual(value.result)}>{ symbol }</button>
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