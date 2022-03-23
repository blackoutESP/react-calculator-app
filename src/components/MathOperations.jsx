import React from "react";
import PropTypes from 'prop-types';
 
const MathOperations = ({
    value, setValue, state, setState, setUpdatedState, operation, className, clickHandlerOp
}) => {
    // const { setValue, state, setState, setUpdatedState, className, clickHandlerOp } = props;
    console.log(value);
    console.log(setValue);
    console.log(state);
    console.log({setState});
    console.log(setUpdatedState);
    console.log(operation);
    return (
        <div className={className}>
            <button onClick={() => clickHandlerOp(value, setValue, state, setState, setUpdatedState)}>
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