/*
    Importación
*/
import React, {
    createContext,
    useContext,
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
    return <button onClick={useClear}>Clear</button>
};

/*
    Generación de la función del componente padre App
*/
export const ResultContext = createContext();

export const AppState = ({ setUpdatedState }) => {
    const { setValue, setState } = useContext(ResultContext);

    const useCalculatorState = () => {
        setState(() => ({
            mathOp: "",
            result: [""],
            secondNumber: [""],
        }));
        setUpdatedState(false);
        setValue(0);
    };

    return { useCalculatorState };
};

const App = () => {

    const [state, setState] = useState({
        mathOp: "",
        result: [""],
        secondNumber: [""],
    });

    const [updatedState, setUpdatedState] = useState(false);
    const [value, setValue] = useState(0);

    const clickHandlerFunction = (value) => {
        if (state.mathOp === "") {
            if (!Number.isNaN(value)) {
                if (
                    (Number(state.result).toString().length >= 0 &&
                        (value === state.result || value !== state.result)) ||
                    (Number(state.result).toString().length <= 0 &&
                        (value === state.result || value !== state.result))
                ) {
                    setState((state) => ({
                        result: Number(
                            Number(state.result).toString().concat(value)
                        ),
                        mathOp: "",
                        secondNumber: [""]
                    }));
                } else if (
                    (Number(state.result).toString().length >= 0 &&
                        (value === state.result || value !== state.result)) ||
                    (Number(state.result).toString().length <= 0 &&
                        (value === state.result || value !== state.result))
                ) {
                    setState((state) => ({
                        result: Number(state.result).toString().concat(value),
                        mathOp: "",
                        secondNumber: [""]
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

    const clickHandlerOp = (state, operation) => {
        console.log("clickHandlerOp");
        switch (operation) {
            case (state.result === [""] &&
                operation === "+" &&
                state.secondNumber === [""]) ||
                (state.secondNumber &&
                    operation === "+" &&
                    state.secondNumber === [""]):
                console.log("plus clickHandlerOp");
                setState((state) => ({
                    result: ["-"],
                    mathOp: "+",
                    secondNumber: [""],
                }));
                setUpdatedState(false);
                setValue(0);
                break;
            case (state.result === [""] &&
                operation === "-" &&
                state.secondNumber === [""]) ||
                (state.secondNumber &&
                    operation === "-" &&
                    state.secondNumber === [""]):
                console.log("numero negativo...");
                console.log(state);
                setState((state) => ({
                    result: ["-"],
                    mathOp: "-",
                    secondNumber: [""],
                }));
                setUpdatedState(false);
                setValue(0);
                break;
            case (state.result === [""] &&
                operation === "*" &&
                state.secondNumber === [""]) ||
                (state.secondNumber &&
                    operation === "*" &&
                    state.secondNumber === [""]):
                setState((state) => ({
                    result: ["-"],
                    mathOp: "*",
                    secondNumber: [""],
                }));
                setUpdatedState(false);
                setValue(0);
                break;
            case (state.result === [""] &&
                operation === "/" &&
                state.secondNumber === [""]) ||
                (state.secondNumber &&
                    operation === "/" &&
                    state.secondNumber === [""]):
                setState((state) => ({
                    result: ["-"],
                    mathOp: "/",
                    secondNumber: [""],
                }));
                setUpdatedState(false);
                setValue(0);
                break;
            default:
                console.log(new Error("No operation selected..."));
        }
    };

    const clickHandlerEqual = () => {
        switch (state.mathOp) {
            case (state.result === [""] && "+") || (state.secondNumber && "+"):
                if (!updatedState) {
                    state.result = mathjs.add(state.result, state.secondNumber);
                    setState((state) => ({
                        result: state.result,
                        secondNumber: state.secondNumber,
                        mathOp: "",
                    }));
                    setUpdatedState(true);
                    setValue(state.result);
                }
                break;
            case (state.result === [""] && "-") || (state.secondNumber && "-"):
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
            case (state.result === [""] && "*") ||
                (state.secondNumber === [""] && "*"):
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
            case (state.result === [""] && "/") || (state.secondNumber === [""] && "/"):
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
                        value={AppState}
                        clickHandlerOp={clickHandlerOp}
                    />
                    <MathOperations
                        operation={"-"}
                        className={"math-operations"}
                        value={AppState}
                        clickHandlerOp={clickHandlerOp}
                    />
                    <MathOperations
                        operation={"*"}
                        className={"math-operations"}
                        value={AppState}
                        clickHandlerOp={clickHandlerOp}
                    />
                    <MathOperations
                        operation={"/"}
                        className={"math-operations"}
                        value={AppState}
                        clickHandlerOp={clickHandlerOp}
                    />
                    <Equal
                        symbol={"="}
                        className={"math-operations"}
                        value={AppState}
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
