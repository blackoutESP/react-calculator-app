/*
    Importación
*/
import React, {
    createContext,
    useState
} from "react";

import Title from "./components/Title";
// import Result from './components/Result';
import Button from "./components/Button";
// import Clear from './components/Clear';
import RemoveOperator from "./components/RemoveOperator";
// import Functions from './components/Functions';
import MathOperations from "./components/MathOperations";
// import Equal from "./components/Equal";
import "./App.css";
import * as mathjs from "mathjs";

/*
    Generación del componente Equal con un hook personalizado
*/

const Equal = ({ symbol, className }) => {

    return (
        <div className={className}>
            <button>{symbol}</button>
        </div>
    );
};

/*
    Generación de la función del componente Result
*/

const Result = (state) => {
    let symbol = '';
    let result = state.value.result[0];
    if (String(result).split('')[0] === '-') {
        symbol = String(result).split('')[0];
        result = String(result).split('-').slice(0, String(result).length)[1];
        return (
            <div className='result'>
                <span>{result}{symbol}</span>
            </div>
        );
    } else {
        return (
            <div className='result'>
                <span>{result}</span>
            </div>
        );
    }
};

/*
    Generación de la función del componente Clear, para borrar la memoria de la calculadora.
*/

const Clear = ({ setState, setUpdatedState }) => {

    const useClear = () => {
        setState(() => ({
            mathOp: '',
            result: ['0'],
            secondNumber: ['0'],
        }));
        setUpdatedState(false);
    }
    return <button onClick={useClear}>Clear</button>
};

export const ResultContext = createContext();

/*
    Generación de la función del componente padre App
*/

const App = () => {

    const [state, setState] = useState({
        mathOp: "",
        result: ['0'],
        secondNumber: ['0'],
    });

    const [updatedState, setUpdatedState] = useState(false);
    // const [value, setValue] = useState();

    const clickHandlerRemoveOperator = () => {};

    const clickHandlerFunction = (value, state) => {
        console.log('clickHandlerFunction');
        console.log(
            (String(state.mathOp) === String('/')) && state.result !== ['0'] &&
            ((value === Number(state.secondNumber) || value !== Number(state.secondNumber)))
        );

        if (!Number.isNaN(value)) {
            if ((value === Number(state.result) || value !== Number(state.result)) &&
                String(state.mathOp) === String('') && (Number(state.result) === Number(['0']) || Number(state.result) !== Number(['0']))) {
                    // setState
                    setState((state) => ({
                        result: Number(
                            Math.abs([state.result, value].join(''))
                        ),
                        mathOp: state.mathOp,
                        secondNumber: ['0']
                    }));
                    // setUpdatedState
                    setUpdatedState(false);
            } else {
                if ((value === Number(state.secondNumber) || value !== Number(state.secondNumber)) &&
                        String(state.mathOp) === String('+') && (Number(state.secondNumber) === Number(['0']) || Number(state.secondNumber) !== Number(['0']))) {
                            // setState
                            setState((state) => ({
                                result: state.result,
                                mathOp: state.mathOp,
                                secondNumber: Number(
                                    Math.abs([state.secondNumber, value].join(''))
                                )
                            }));
                            // setUpdatedState
                            setUpdatedState(false);
                }
                
                if ((String(state.mathOp) === String('-')) && state.result !== ['0'] && 
                        ((value === Number(state.secondNumber) || value !== Number(state.secondNumber)))) {
                            // setState
                            setState((state) => ({
                                result: state.result,
                                mathOp: state.mathOp,
                                secondNumber: Number(
                                    Number([state.secondNumber, value].join(''))
                                )
                            }));
                            // setUpdatedState
                            setUpdatedState(false);
                }

                if ((String(state.mathOp) === String('*')) && state.result !== ['0'] && 
                        ((value === Number(state.secondNumber) || value !== Number(state.secondNumber)))) {
                            setState((state) => ({
                                result: state.result,
                                mathOp: state.mathOp,
                                secondNumber: Number(
                                    [state.secondNumber, value].join('')
                                )
                            }));
                            // setUpdatedState
                            setUpdatedState(false);
                }

                if ((String(state.mathOp) === String('/')) && state.result !== ['0'] &&
                        ((value === Number(state.secondNumber) || value !== Number(state.secondNumber)))) {
                            setState((state) => ({
                                result: state.result,
                                mathOp: state.mathOp,
                                secondNumber: Number(
                                    Number([state.secondNumber, value].join(''))
                                )
                            }));
                            // setUpdatedState
                            setUpdatedState(false);
                }
            }
        }
    };

    const clickHandlerOp = (state, setState, updatedState, setUpdatedState, operation) => {
        
        if ((Number(state.result) !== Number(['0'])) &&
            String(operation) === String('+')) {
                // setState
                setState((state) => ({
                    result: state.result,
                    secondNumber: state.secondNumber,
                    mathOp: operation
                }));
                // setUpdatedState
                setUpdatedState(false); 
        } else if ((Number(state.result) !== Number(['0'])) &&
                    String(operation) === String('-')) {
                        console.log(operation);
                        // setState
                        setState((state) => ({
                            result: state.result,
                            secondNumber: state.secondNumber,
                            mathOp: operation
                        }));
                        // setUpdatedState
                        setUpdatedState(false);
        }else if ((Number(state.result) !== Number(['0'])) &&
                    String(operation) === String('*')) {
                    console.log(operation);
                    // setState
                    setState((state) => ({
                        result: state.result,
                        secondNumber: state.secondNumber,
                        mathOp: operation
                    }));
                    // setUpdatedState
                    setUpdatedState(false);
        } else if ((Number(state.result) !== Number(['0'])) &&
                    String(operation) === String('/')) {
                        console.log(operation);
                        // setState
                        setState((state) => ({
                            result: state.result,
                            secondNumber: state.secondNumber,
                            mathOp: operation
                        }));
                        // setUpdatedState
                        setUpdatedState(false);
        }
    };

    const clickHandlerEqual = (state, setState, updatedState, setUpdatedState) => {

        console.log(state);
        switch (state.mathOp) {
            case (state.result !== ["0"] && state.secondNumber !== ['0'] && (String(state.mathOp) === String('+'))):
                if (!updatedState) {
                    state.result = mathjs.add(state.result, state.secondNumber);
                    setState((state) => ({
                        result: state.result,
                        secondNumber: ['0'],
                        mathOp: ""
                    }));
                    setUpdatedState(true);
                }
                break;
            case (state.result !== ["0"] && state.secondNumber !== ['0'] && state.mathOp === "-"):
                if (!updatedState) {
                    state.result = mathjs.subtract(state.result, state.secondNumber);
                    console.log(state.result);
                    setState((state) => ({
                        result: state.result,
                        secondNumber: ['0'],
                        mathOp: "",
                    }));
                    setUpdatedState(true);
                }
                break;
            case (state.result !== ["0"] && state.secondNumber !== ["0"]) && state.mathOp === "*":
                if (!updatedState) {
                    state.result = mathjs.multiply(state.result, state.secondNumber);
                    setState((state) => ({
                        result: state.result,
                        secondNumber: ['0'],
                        mathOp: "",
                    }));
                    //setUpdatedState(true);
                }
                break;
            case (state.result !== ["0"] && state.secondNumber !== ["0"]) && state.mathOp === "/":
                if (!updatedState) {
                    state.result = mathjs.divide(state.result, state.secondNumber);
                    setState((state) => ({
                        result: state.result,
                        secondNumber: ['0'],
                        mathOp: "",
                    }));
                    setUpdatedState(true);
                }
                break;
            default:
                console.log(
                    new Error(
                        "Unknown clickHandlerEqual handler function error..."
                    )
                );
        }
    };

    return (
        <main className='container'>
            <Title />
            <ResultContext.Provider value={{ state, setUpdatedState }}>
                <div className='react-calculator'>
                    <Result value={state}/>
                    <div className='numbers'>
                        <Button
                            value={1}
                            state={state}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={2}
                            state={state}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={3}
                            state={state}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={4}
                            state={state}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={5}
                            state={state}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={6}
                            state={state}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={7}
                            state={state}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={8}
                            state={state}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={9}
                            state={state}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={0}
                            state={state}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                    </div>
                    <div className='functions'>
                        <Clear
                            value={state}
                            setState={setState}
                            setUpdatedState={setUpdatedState}
                            updatedState={updatedState}
                        />
                        <RemoveOperator
                            clickHandlerRemoveOperator={
                                clickHandlerRemoveOperator
                            }
                        />
                    </div>
                    <div className="operations">
                        <MathOperations
                            operation={'+'}
                            className={'math-operations'}
                            props={{state, setState, updatedState, setUpdatedState}}
                            clickHandlerOp={clickHandlerOp}
                        />
                        <MathOperations
                            operation={'-'}
                            className={'math-operations'}
                            props={{state, setState, updatedState, setUpdatedState}}
                            clickHandlerOp={clickHandlerOp}
                        />
                        <MathOperations
                            operation={'*'}
                            className={'math-operations'}
                            props={{state, setState, updatedState, setUpdatedState}}
                            clickHandlerOp={clickHandlerOp}
                        />
                        <MathOperations
                            operation={'/'}
                            className={'math-operations'}
                            props={{state, setState, updatedState, setUpdatedState}}
                            clickHandlerOp={clickHandlerOp}
                        />
                    </div>
                    <Equal
                        symbol={'='}
                        className={'math-operations'}
                        props={{state, setState, updatedState, setUpdatedState}}
                        clickHandlerEqual={clickHandlerEqual}
                    />
                </div>
            </ResultContext.Provider>
        </main>
    );
};
/*
    Exportación del componente
*/
export default App;
