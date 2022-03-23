import React from "react";
import PropTypes from 'prop-types';
 
const MathOperations = ({operation, className, props}) => {
    const { value, setValue, state, setState, updatedState, setUpdatedState, clickHandlerOp } = props;
    // const { setValue, state, setState, setUpdatedState, className, clickHandlerOp } = props;
    /* console.log(value);
    console.log(setValue);
    console.log(state);
    console.log({setState});
    console.log(setUpdatedState);
    console.log(operation); */
    return (
        <div className={className}>
            <button onClick={() => clickHandlerOp(value, setValue, state, setState, updatedState, setUpdatedState, operation)}>
                {operation}
            </button>
        </div>
    );
};

/* MathOperations.propTypes = {
    clickHandlerOp: PropTypes.func.isRequired
}; */

export default MathOperations;