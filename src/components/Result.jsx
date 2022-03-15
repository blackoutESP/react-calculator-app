import React from 'react';
import PropTypes from 'prop-types';
// import ResultContextProvider from '../contexts/ResultContext';

// onClick={ () => console.log(contextProvider.Provider._context._currentValue.result) }
// onClick={ () => console.log('result context: ', contextProvider.contextProvider._currentValue.result) }
/*
<div className="result" onClick={ () => console.log('result context: ', contextProvider.contextProvider._currentValue.result) }>
            <span>{ contextProvider.contextProvider._currentValue.result }</span>
        </div>
*/
/*
<Context.Consumer>
            {
                value => {
                    <div className="result" >
                        <span>{ value }</span>
                    </div>
                }
            }
        </Context.Consumer>
*/
/*
<div className="result" onClick={ () => console.log('result context: ', contextProvider.contextProvider._currentValue.result) }>
            <span>{ contextProvider.contextProvider._currentValue.result }</span>
        </div>
*/
// contextProvider.values._currentValue.result
const Result = ({ contextProvider }) => {
    return (
        <div className="result" onClick={ () => console.log('result context: ', contextProvider) }>
            {/* <contextProvider values={contextProvider.values._currentValue.result}>
                <span>{ (value) => value }</span>
            </contextProvider> */}
        </div>
    );
};

/* Result.propTypes = {
    contextProvider: PropTypes.object.isRequired
}; */

/* Result.defaultProps = {
    result: 0
}; */

export default Result;