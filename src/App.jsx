/*
    Importación
*/
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
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
const Result = () => {
    const value = useContext(ResultContext);
    if (!Number.isNaN(value.result[0])) {
        return (
            <div className='result'>
                <span>{value.result}</span>
            </div>
        );
    }
};

/* const useClearHook = (
    state,
    setState,
    callbackSetup,
    setCallbackSetup,
    stateRef
) => {
    useEffect(() => {
        if (!callbackSetup) {
            setCallbackSetup(true);
            console.log("useEffect: ");
            //console.log(stateRef.current);
            setState({
                ...stateRef.current,
                result: [""],
                secondNumber: [""],
                mathOp: "",
            });
        }
    }, []);
    console.log(state);
}; */

/*
    Generación de la función del componente Clear, para borrar la memoria de la calculadora.
*/

const ResultContext = createContext();

/*
    Generación de la función del componente padre App
*/
const App = () => {
    const [state, setState] = useState({
        mathOp: '',
        result: [400],
        secondNumber: [5],
    });

    const useHookWithRefCallback = ({state, setState}) => {
        let stateRef = useRef(state);
        
        useEffect(() => {
            console.log("useEffectCallback");
            stateRef.current = state;
            stateRef.current.result = [''];
            stateRef.current.secondNumber = [''];
            stateRef.current.mathOp = '';
            setState({
                ...state,
                result: stateRef.current.result,
                secondNumber: stateRef.current.secondNumber,
                mathOp: stateRef.current.mathOp,
            });
            console.log(state);
        }, []);
    };

    const useClear = useHookWithRefCallback({ state, setState });

    const Clear = ({ state, setState }) => {
        return <button onClick={() => console.log('borrando memoria')}>Clear</button>;
    };

    const clickHandlerFunction = (value) => {
        console.log("received: ", value);
        if (state.mathOp === "") {
            if (!Number.isNaN(value)) {
                setState({
                    ...state,
                    result: Number([state.result, value].join("")),
                });
            }
        } else if (state.mathOp !== "") {
            if (!Number.isNaN(value)) {
                setState({
                    ...state,
                    result: state.result,
                    secondNumber: Number([state.secondNumber, value].join("")),
                });
            }
        }
    };

    const clickHandlerRemoveOperator = () => {};

    const clickHandlerOp = (operation) => {
        console.log("op: ", operation);
        switch (operation) {
            case "+":
                setState({ ...state, result: state.result, mathOp: "+" });
                break;
            case "-":
                setState({ ...state, result: state.result, mathOp: "-" });
                break;
            case "*":
                setState({ ...state, result: state.result, mathOp: "*" });
                break;
            case "/":
                setState({ ...state, result: state.result, mathOp: "/" });
                break;
            default:
                console.log("No operation selected...");
        }
    };

    const clickHandlerEqual = () => {
        switch (state.mathOp) {
            case "+":
                console.log(
                    `${state.result} ${state.mathOp} ${state.secondNumber}`
                );
                state.result = mathjs.add(state.result, state.secondNumber);
                console.log(state.result);
                setState({
                    ...state,
                    result: state.result,
                    secondNumber: state.secondNumber,
                    mathOp: state.mathOp,
                });
                break;
            case "-":
                console.log(
                    `${state.result} ${state.mathOp} ${state.secondNumber}`
                );
                state.result = mathjs.subtract(
                    state.result,
                    state.secondNumber
                );
                console.log(state.result);
                setState({
                    ...state,
                    result: state.result,
                    secondNumber: state.secondNumber,
                    mathOp: state.mathOp,
                });
                break;
            case "*":
                console.log(
                    `${state.result} ${state.mathOp} ${state.secondNumber}`
                );
                state.result = mathjs.multiply(
                    state.result,
                    state.secondNumber
                );
                console.log(state.result);
                setState({
                    ...state,
                    result: state.result,
                    secondNumber: state.secondNumber,
                    mathOp: state.mathOp,
                });
                break;
            case "/":
                console.log(
                    `${state.result} ${state.mathOp} ${state.secondNumber}`
                );
                state.result = mathjs.divide(state.result, state.secondNumber);
                console.log(state.result);
                setState({
                    ...state,
                    result: state.result,
                    secondNumber: state.secondNumber,
                    mathOp: state.mathOp,
                });
                break;
            default:
                console.log("No operation selected...");
        }
        // actualizar contexto en esta función
        setState({
            ...state,
            result: state.result,
            secondNumber: state.secondNumber,
            mathOp: state.mathOp,
        });
    };

    return (
        <main className='container'>
            <Title />
            <div className='react-calculator'>
                <ResultContext.Provider value={state}>
                    <Result />
                </ResultContext.Provider>
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
                        value={{state, setState}}
                    />
                    <RemoveOperator
                        clickHandlerRemoveOperator={clickHandlerRemoveOperator}
                    />
                </div>
                <MathOperations
                    operation={"+"}
                    className={"math-operations"}
                    clickHandlerOp={clickHandlerOp}
                />
                <MathOperations
                    operation={"-"}
                    className={"math-operations"}
                    clickHandlerOp={clickHandlerOp}
                />
                <MathOperations
                    operation={"*"}
                    className={"math-operations"}
                    clickHandlerOp={clickHandlerOp}
                />
                <MathOperations
                    operation={"/"}
                    className={"math-operations"}
                    clickHandlerOp={clickHandlerOp}
                />
                <Equal
                    symbol={"="}
                    result={state.result}
                    className={"math-operations"}
                    clickHandlerEqual={clickHandlerEqual}
                />
            </div>
        </main>
    );
};
/*
    Exportación del componente
*/
export default App;
