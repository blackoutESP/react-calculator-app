import React from 'react';
import PropTypes from 'prop-types';

const Button = ({value, className, clickHandler}) => ( 
    (
        <button className={className} onClick={ () => clickHandler(value) }>
            <span>{ value }</span>
        </button>
    )
);

Button.propTypes = {
    value: PropTypes.number,
    className: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired
};

export default Button;