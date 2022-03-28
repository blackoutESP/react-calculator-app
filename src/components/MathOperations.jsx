import React from "react";
// import PropTypes from 'prop-types';
 
const MathOperations = ({operation, className, props, clickHandlerOp}) => {
    const { state, setState, updatedState, setUpdatedState } = props;
    return (
        <div className={className} onClick={() => clickHandlerOp(state, setState, updatedState, setUpdatedState, operation)}>
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