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
import Equal from "./components/Equal";
import "./App.css";
import * as mathjs from "mathjs";

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
            secondNumber: [''],
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
        result: ['-12'],
        secondNumber: [''],
    });

    const [updatedState, setUpdatedState] = useState(false);
    // const [value, setValue] = useState();

    const clickHandlerFunction = (value) => {
        console.log('clickHandlerFunction');
        
        if (state.mathOp === '') {
            if (!Number.isNaN(value)) {
                if (((((Number(state.result).toString().length >= 0) && state.mathOp === '')) && 
                    ((Number(state.result).toString() !== ['']) && String(state.mathOp) === String(''))) && 
                    ((value === Number(state.result) || value !== Number(state.result)) && state.mathOp === '')) {
                        console.log(value);
                        // setState
                        // setUpdatedState
                } else if ((Number(state.result).toString() !== Number(['']).toString()) && 
                            String(state.mathOp) === String('') && String(state.mathOp) === String('-') &&
                            (((((Number(state.result).toString().length >= 0) && String(state.mathOp) === String('-'))) && 
                            (Array((Number(state.result).toString() === [''])) && 
                            ((value === Number(state.result) || value !== Number(state.result)) && state.mathOp === ''))))) {
                                console.log(value);
                                // setState
                                // setUpdatedState
                                setState((state) => ({
                                    result: Number(
                                        -Math.abs([...state.result, (-(Number((Number(-state.result)))) * value)].join(''))
                                    ),
                                    mathOp: '',
                                    secondNumber: ['']
                                }));
                }
            }
        }
    };

    const clickHandlerRemoveOperator = () => {};

    const clickHandlerOp = (state, setState, updatedState, setUpdatedState, operation) => {

        // correct
        // console.log(-Math.abs([state.result, (-(Number((Number(-1))) * 6))].join('')));

        // primer if (not neccesary):  && ((value === Number(state.result) || value !== Number(state.result)) && String(state.mathOp) === String(''))
        if (((state.result.toString() !== [''].toString())) &&
            String(state.mathOp) === String('') && 
                String(operation) === String('-') &&
                    (Number(state.result).toString().length >= 0) &&
                        ((Number(state.result).toString() !== [''].toString()))) {
                            // setState
                            // setUpdatedState
                                
        } else if ((Number(state.result).toString() !== Number(['']).toString()) 
                    && ((Number(state.secondNumber).toString() !== Number(['']).toString())) && 
                    String(state.mathOp) === String('')) {
                        // setState
                        // setUpdatedState
        }
    };

    const clickHandlerEqual = () => {
        switch (state.mathOp) {
            case (state.result === [""] && state.mathOp === "+") || 
                    ((state.secondNumber !== state.result || 
                        state.secondNumber === state.result) && state.mathOp === "+"):
                if (!updatedState) {
                    state.result = mathjs.add(state.result, state.secondNumber);
                    setState((state) => ({
                        result: state.result,
                        secondNumber: state.secondNumber,
                        mathOp: ""
                    }));
                    setUpdatedState(true);
                }
                break;
            case (state.result !== [""] && state.mathOp === "-") || (state.secondNumber !== [''] && state.mathOp === "-"):
                if (!updatedState) {
                    setState((state) => ({
                        result: state.result,
                        secondNumber: [""],
                        mathOp: "",
                    }));
                    setUpdatedState(true);
                } else {
                    // setUpdatedState(true);
                    state.result = mathjs.subtract(
                        state.result,
                        state.secondNumber
                    );
                    setState((state) => ({
                        result: state.result,
                        secondNumber: state.secondNumber,
                        mathOp: "",
                    }));
                    setUpdatedState(true);
                    //setValue(state.result);
                }
                break;
            case (state.result !== [""] && state.mathOp === "*") ||
                (state.secondNumber !== [""] && state.mathOp === "*"):
                if (!updatedState) {
                    state.result = mathjs.multiply(
                        state.result,
                        state.secondNumber
                    );
                    setState((state) => ({
                        result: state.result,
                        secondNumber: state.secondNumber,
                        mathOp: "",
                    }));
                    setUpdatedState(true);
                } else {
                    // setUpdatedState(true);
                }
                break;
            case (state.result !== [""] && state.mathOp === "/") || (state.secondNumber !== [""] && state.mathOp === "/"):
                if (!updatedState) {
                    state.result = mathjs.divide(
                        state.result,
                        state.secondNumber
                    );
                    setState((state) => ({
                        result: state.result,
                        secondNumber: state.secondNumber,
                        mathOp: "",
                    }));
                    setUpdatedState(true);
                } else {
                    // setUpdatedState(true);
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
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={2}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={3}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={4}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={5}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={6}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={7}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={8}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={9}
                            className={"numbers"}
                            clickHandler={clickHandlerFunction}
                        />
                        <Button
                            value={0}
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
