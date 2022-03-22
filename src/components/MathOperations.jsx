import React from "react";
import PropTypes from 'prop-types';

const MathOperations = ({
    state,
    setUpdatedState,
    operation,
    className,
    clickHandlerOp,
}) => {
    /* if (value.result === [''] && value.mathOp === '' && value.secondNumber === ['']) {
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
    } */
    return (
        <div className={className}>
            <button onClick={() => console.log(state)}>{operation}</button>
        </div>
    );
};

MathOperations.propTypes = {
    operation: PropTypes.string.isRequired,
    clickHandlerOp: PropTypes.func
};

export default MathOperations;