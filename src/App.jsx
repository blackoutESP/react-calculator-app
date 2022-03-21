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
    /* const value = useContext(ResultContext);
    if (!Number.isNaN(value.result[0])) {
        return (
            <div className='result'>
                <span>{value.result}</span>
            </div>
        );
    } */
    const { value, setValue } = useContext(ResultContext);
    return (
        <div className='result' onClick={() => console.log(value)}>
            <span>{value}</span>
        </div>
    );
};

/*
    Generación de la función del componente Clear, para borrar la memoria de la calculadora.
*/

const Clear = ({ setState, setUpdatedState }) => {

    const { setValue } = useContext(ResultContext);

    const useClear = () => {
        setState(() => ({
            mathOp: '',
            result: [''],
            secondNumber: [''],
        }));
        setUpdatedState(false);
        setValue(0)
    }
    return <button onClick={useClear}></button>
};

/*
    Generación de la función del componente padre App
*/
export const ResultContext = createContext();

const App = () => {

    const [state, setState] = useState({
        mathOp: '',
        result: [''],
        secondNumber: [''],
    });

    const [updatedState, setUpdatedState] = useState(false);
    const [value, setValue] = useState(0);

    /* const Clear = (props) => {
        const useHookWithRefCallback = (
            
        ) => {
            stateRef.current = useRef(props.value.state);
            useEffect(() => {
                if (updatedState) {
                    console.log("updating...");
                    stateRef.current.current.result = [""];
                    stateRef.current.current.secondNumber = [""];
                    stateRef.current.current.mathOp = "";
                    setState((state) => ({
                        result: stateRef.current.current.result,
                        secondNumber: stateRef.current.current.secondNumber,
                        mathOp: stateRef.current.current.mathOp,
                    }));
                    setUpdatedState(false);
                }
            }, []);
        };

        const useClear = useHookWithRefCallback();
        return <button onClick={useClear}>Clear</button>;
    }; */

    const clickHandlerFunction = (value) => {
        if (state.mathOp === "") {
            if (!Number.isNaN(value)) {
                if (
                    Number(state.result).toString().length >= 0 &&
                    (value === state.result || value !== state.result)
                ) {
                    setState((state) => ({
                        result: Number(
                            Number(state.result).toString().concat(value)
                        ),
                        mathOp: "",
                        secondNumber: [""],
                    }));
                } else {
                    setState((state) => ({
                        result: Number(value),
                        mathOp: "",
                        secondNumber: [""],
                    }));
                }
            }
        } else {
            if (!Number.isNaN(value)) {
                if (
                    Number(value).toString().length >= 0 &&
                    (value === state.secondNumber ||
                        value !== state.secondNumber)
                ) {
                    setState((state) => ({
                        result: state.result,
                        mathOp: state.mathOp,
                        secondNumber: Number(Number(state.secondNumber).toString().concat(value))
                    }));
                } else {
                    setState((state) => ({
                        result: state.result,
                        mathOp: state.mathOp,
                        secondNumber: Number(value)
                    }));
                }
            }
        }
    };

    const clickHandlerRemoveOperator = () => {};

    const clickHandlerOp = (operation) => {
        switch (operation) {
            case "+":
                setState((state) => ({
                    result: state.result,
                    mathOp: "+",
                    secondNumber: ['']
                }));
                break;
            case "-":
                setState((state) => ({
                    result: state.result,
                    mathOp: "-",
                    secondNumber: ['']
                }));
                break;
            case "*":
                setState((state) => ({
                    result: state.result,
                    mathOp: "*",
                    secondNumber: [""]
                }));
                break;
            case "/":
                setState((state) => ({
                    result: state.result,
                    mathOp: "/",
                    secondNumber: [""]
                }));
                break;
            default:
                console.log(new Error("No operation selected..."));
        }
    };

    const clickHandlerEqual = () => {
        switch (state.mathOp) {
            case "+":
                if (!updatedState) {
                    state.result = mathjs.add(state.result, state.secondNumber);
                    console.log(state.result);
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
            case "-":
                if (!updatedState) {
                    state.result = mathjs.subtract(
                        state.result,
                        state.secondNumber
                    );
                    console.log(state.result);
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
            case "*":
                if (!updatedState) {
                    state.result = mathjs.multiply(
                        state.result,
                        state.secondNumber
                    );
                    console.log(state.result);
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
            case "/":
                if (!updatedState) {
                    state.result = mathjs.divide(
                        state.result,
                        state.secondNumber
                    );
                    console.log(state.result);
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
                console.log(new Error("Unknown clickHandlerEqual handler function error..."));
        }
    };

    return (
        <main className='container'>
            <Title />
            <ResultContext.Provider value={{ value, setValue }}>
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
                            setUpdatedState={setUpdatedState}
                        />
                        <RemoveOperator
                            clickHandlerRemoveOperator={
                                clickHandlerRemoveOperator
                            }
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
                        className={"math-operations"}
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
