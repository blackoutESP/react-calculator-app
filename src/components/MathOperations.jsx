import React from "react";
import PropTypes from 'prop-types';
 
const MathOperations = ({operation, className, props, clickHandlerOp}) => {
    const { setValue, state, setState, updatedState, setUpdatedState } = props;
    // const { setValue, state, setState, setUpdatedState, className, clickHandlerOp } = props;
    /* console.log(value);
    console.log(setValue);
    console.log(state);
    console.log({setState});
    console.log(setUpdatedState);
    console.log(operation); */
    // clickHandlerOp(value, setValue, state, setState, updatedState, setUpdatedState)
    return (
        <div className={className} onClick={() => clickHandlerOp(setValue, state, setState, updatedState, setUpdatedState, operation)}>
            <button>
                {operation}
            </button>
        </div>
    );
};

/* MathOperations.propTypes = {
    clickHandlerOp: PropTypes.func.isRequired
}; */

export default MathOperations;