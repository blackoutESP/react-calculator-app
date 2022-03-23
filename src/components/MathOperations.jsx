import React from "react";
import PropTypes from 'prop-types';

const MathOperations = ({
    value, setValue, state, setUpdatedState, operation, className, clickHandlerOp
}) => {
    console.log('MathOperations');
    console.log(value);
    console.log(state);
    console.log(operation);
    console.log(setUpdatedState);
    return (
        <div className={className}>
            <button onClick={() => console.log('MathOperations')}>
                {'+'}
            </button>
        </div>
    );
};

MathOperations.propTypes = {
    operation: PropTypes.string.isRequired,
    clickHandlerOp: PropTypes.func
};

export default MathOperations;