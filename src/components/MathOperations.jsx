import React from 'react';
import PropTypes from 'prop-types';

const MathOperations = ({ operation, className, clickHandlerOp }) => (
    (
        <div className={ className }>
            <button onClick={() => clickHandlerOp(operation)}>{ operation }</button>
        </div>
    )
);

MathOperations.propTypes = {
    operation: PropTypes.string.isRequired,
    clickHandlerOp: PropTypes.func
};

export default MathOperations;