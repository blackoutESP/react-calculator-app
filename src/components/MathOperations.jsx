import React from "react";
import PropTypes from 'prop-types';

const MathOperations = ({
    value, setValue, state, setState, setUpdatedState, operation, className, clickHandlerOp
}) => {
    return (
        <div className={className}>
            <button onClick={() => clickHandlerOp(value, setValue, state, setState, setUpdatedState, operation)}>
                {operation}
            </button>
        </div>
    );
};

MathOperations.propTypes = {
    operation: PropTypes.string.isRequired,
    clickHandlerOp: PropTypes.func
};

export default MathOperations;