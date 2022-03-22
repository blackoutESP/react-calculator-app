import React from "react";
import PropTypes from 'prop-types';

const MathOperations = ({ value, operation, className, clickHandlerOp }) => {
    if (value.result === [''] && value.mathOp === '' && value.secondNumber === ['']) {
        console.log(value);
        return (
            <div className={className}>
                <button onClick={() => clickHandlerOp(value, operation)}>
                    {operation}
                </button>
            </div>
        );
    } else {
        return (
            <div className={className}>
                <button onClick={() => clickHandlerOp(value, operation)}>
                    {operation}
                </button>
            </div>
        );
    }
};

MathOperations.propTypes = {
    operation: PropTypes.string.isRequired,
    clickHandlerOp: PropTypes.func
};

export default MathOperations;