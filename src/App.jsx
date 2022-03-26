/*
    Importación
*/
import React, {
    createContext,
    useContext,
    useState
} from "react";
import { combineLatest, from, of } from 'rxjs';

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
const Result = () => {
    const { value, setValue } = useContext(ResultContext);
    return (
        <div className='result'>
            <span>{value}</span>
        </div>
    );
};

/*
    Generación de la función del componente Clear, para borrar la memoria de la calculadora.
*/

const Clear = ({ setState, setUpdatedState, setValue }) => {

    /* const { setValue } = useContext(ResultContext); */

    const useClear = () => {
        setState(() => ({
            mathOp: '',
            result: ['1'],
            secondNumber: [''],
        }));
        setUpdatedState(false);
        setValue(0);
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
        secondNumber: [''],
    });

    const [updatedState, setUpdatedState] = useState(false);
    const [value, setValue] = useState(1);

    let result$ = of(state.result);
    let secondNumber$ = of(state.secondNumber);

    const clickHandlerFunction = (value) => {
        console.log('clickHandlerFunction');
        let negativeFloat = 0.0;
        if (state.mathOp === '') {
            if (!Number.isNaN(value)) {
                if (((((Number(state.result).toString().length >= 0) && state.mathOp === '')) && 
                    ((Number(state.result).toString() !== ['']) && String(state.mathOp) === String(''))) && 
                    ((value === Number(state.result) || value !== Number(state.result)) && state.mathOp === '')) {
                        // comprobar si el primer valor es un signo negativo...
                        if (value === '-') {
                            /*
                                si el signo es negativo, vamos guardando value en negativeFloat
                                hasta que se tenga que actualizar el setState...
                            */
                            negativeFloat = Math.abs((Number(Number(state.result).toString().concat(value))));
                            /*
                                una vez que tenga negativeFloat con todas las cifras del operando, utilizamos useEffect
                                para detectar los cambios. Cuando no haya más cambios setState.
                            */
                        } else {
                            setState((state) => ({
                                result: Number(
                                    Math.abs((Number(Number(state.result).toString().concat(value))))
                                ),
                                mathOp: '',
                                secondNumber: [""]
                            }));
                            // RxJS
                            result$ = from(Promise.resolve(Math.abs((Number(Number(state.result).toString().concat(value))))));
                        }
                } else if ((Number(state.result).toString() !== Number(['']).toString()) && 
                            String(state.mathOp) === String('') && String(state.mathOp) === String('-') &&
                            (((((Number(state.result).toString().length >= 0) && String(state.mathOp) === String('-'))) && 
                            (Array((Number(state.result).toString() === [''])) && 
                            ((value === Number(state.result) || value !== Number(state.result)) && state.mathOp === ''))))) {
                                setState((state) => ({
                                    result: Number(
                                        -Math.abs([...state.result, (-(Number((Number(-state.result)))) * value)].join(''))
                                    ),
                                    mathOp: '',
                                    secondNumber: ['']
                                }));
                                // RxJS
                                result$ = from(Promise.resolve(-Math.abs([...state.result, (-(Number((Number(-state.result)))) * value)].join(''))));
                }
            }
        }
    };

    const clickHandlerRemoveOperator = () => {};

    const clickHandlerOp = (setValue, state, setState, updatedState, setUpdatedState, operation) => {

        // correct
        // console.log(-Math.abs([state.result, (-(Number((Number(-1))) * 6))].join('')));
        
        // console.log(String(state.mathOp) === String(''));
        // console.log(String(operation) === String('-'));
        // console.log((Number(state.result).toString().length >= 0));
        // console.log(String(operation) === String('-'));
        // console.log(((Number(state.result).toString() !== [''].toString())));

        if (((state.result.toString() !== [''].toString())) &&
            String(state.mathOp) === String('') && 
                String(operation) === String('-') &&
                    (Number(state.result).toString().length >= 0) &&
                        ((Number(state.result).toString() !== [''].toString())) &&
                            ((value === Number(state.result) || value !== Number(state.result)) && String(state.mathOp) === String(''))) {
                                // RxJS subscription
                                combineLatest(result$, secondNumber$).subscribe(
                                    (combination) => {
                                        console.log(combination);
                                    }
                                );
                                // negative number: fix result assign
                                setState((state) => ({
                                    result: -Math.abs([state.result, (-(Number((Number(parseFloat(state.result)))) * 6))].join('')),
                                    mathOp: '',
                                    secondNumber: ['']
                                }));
                                setUpdatedState(false);
                                setValue(0);
        } else if ((Number(state.result).toString() !== Number(['']).toString()) 
                    && ((Number(state.secondNumber).toString() !== Number(['']).toString())) && 
                    String(state.mathOp) === String('')) {
                        // RxJS subscription
                        combineLatest(result$, secondNumber$).subscribe(
                            (combination) => console.log(combination)
                        );
                        // negative number
                        setState((state) => ({
                            result: [''],
                            mathOp: '',
                            secondNumber: ['']
                        }));
                        setUpdatedState(false);
                        setValue(0);
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
                    setValue(state.result);
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
                    setValue(state.result);
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
                    setValue(state.result);
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
                    setValue(state.result);
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
                    setValue(state.result);
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
                    <Result />
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
                            setState={setState}
                            setValue={setValue}
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
                            props={{value, setValue, state, setState, updatedState, setUpdatedState}}
                            clickHandlerOp={clickHandlerOp}
                        />
                        <MathOperations
                            operation={'-'}
                            className={'math-operations'}
                            props={{value, setValue, state, setState, updatedState, setUpdatedState}}
                            clickHandlerOp={clickHandlerOp}
                        />
                        <MathOperations
                            operation={'*'}
                            className={'math-operations'}
                            props={{value, setValue, state, setState, updatedState, setUpdatedState}}
                            clickHandlerOp={clickHandlerOp}
                        />
                        <MathOperations
                            operation={'/'}
                            className={'math-operations'}
                            props={{value, setValue, state, setState, updatedState, setUpdatedState}}
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
