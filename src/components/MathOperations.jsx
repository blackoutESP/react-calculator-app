import React from "react";
import PropTypes from 'prop-types';

const MathOperations = ({
    setValue, state, setState, setUpdatedState, operation, className, clickHandlerOp
}) => {
    return (
        <div className={className}>
            <button onClick={() => clickHandlerOp(setValue, state, setState, setUpdatedState, operation)}>
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