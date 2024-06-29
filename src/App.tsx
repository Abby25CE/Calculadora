import { useState } from "react";
import GlobalStyle1 from "./Styles/Them1";
import GlobalStyle2 from "./Styles/Them2";
import GlobalStyle3 from "./Styles/Them3";
import "./App.Style";
import {
  Container,
  Header,
  WrapperSwitch,
  Switch,
  SwitcherContainer,
  Switcher,
  Input,
  ButtonContainer,
  Button,
} from "./App.Style";

function App() {
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState(1);
  const [themevalue, setThemeValue] = useState("8%");

  const deleteValue = () => {
    if (value.slice(-1) === "") {
      setValue(value.substring(0, value.length - 3));
    } else if (value.slice(-2) === "0.") {
      setValue(value.substring(0, value.length - 2));
    } else {
      setValue(value.substring(0, value.length - 1));
    }
  };

  const handleTheme = () => {
    if (theme === 1) {
      setTheme(2);
      setThemeValue("38%");
    } else if (theme === 2) {
      setTheme(3);
      setThemeValue("70%");
    } else {
      setTheme(1);
      setThemeValue("8%");
    }
  };

  /*const addSimbol = (sim: string) => {
    if (value.slice(-1) !== " " && value.slice(-1) !== ".") {
      setValue(value + sim);
    }
  };*/
  const addSimbol = (sim: string) => {
    const operators = ["+", "-", "*", "/"];
    const lastChar = value.slice(-1);
    const secondLastChar = value.slice(-2, -1);

    if (sim === ".") {
      // Verificar que haya un número antes del punto
      if (!/\d/.test(lastChar)) {
        return;
      }

      // Verificar que no haya ya un punto en la parte actual de la operación después del último operador
      const lastOperatorIndex = Math.max(
        value.lastIndexOf("+"),
        value.lastIndexOf("-"),
        value.lastIndexOf("*"),
        value.lastIndexOf("/")
      );

      if (value.slice(lastOperatorIndex + 1).includes(".")) {
        // Si ya hay un punto en la parte actual de la operación, no se agrega.
        return;
      }
    }

    if (operators.includes(sim)) {
      // Si el último carácter es un operador y el símbolo actual también es un operador, no se agrega
      if (operators.includes(lastChar) || operators.includes(secondLastChar)) {
        return;
      }
    }

    // Verificación de que después del punto haya un número
    if (lastChar === "." && !/\d/.test(sim)) {
      return;
    }

    setValue(value + sim);
  };

  const Calculadora = () => {
    try {
      // Validar que la última posición no sea un operador
      const operators = ["+", "-", "*", "/"];
      if (value.length > 0 && !operators.includes(value.slice(-1))) {
        // Evaluar la expresión de forma segura usando Function constructor
        const result = new Function("return " + value)();
        setValue(result.toString());
      }
    } catch (error) {
      console.error("Error al evaluar la expresión:", error);
      // Puedes agregar lógica adicional para manejar el error si es necesario
    }
  };

  return (
    <>
      {theme === 1 && <GlobalStyle1 />}
      {theme === 2 && <GlobalStyle2 />}
      {theme === 3 && <GlobalStyle3 />}
      <Container>
        <Header>
          Calc
          <WrapperSwitch>
            Theme
            <Switch>
              <div>
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>
              <SwitcherContainer onClick={handleTheme}>
                <Switcher theme={themevalue}></Switcher>
              </SwitcherContainer>
            </Switch>
          </WrapperSwitch>
        </Header>

        <Input>{value}</Input>
        <ButtonContainer>
          {/*Primera Fila */}
          <Button onClick={() => setValue(value + "7")}>7</Button>
          <Button onClick={() => setValue(value + "8")}>8</Button>
          <Button onClick={() => setValue(value + "9")}>9</Button>
          <Button
            color="var(--white)"
            bg="var(--key-background-dark-blue)"
            bdbox="var(--key-shadow-dark-blue)"
            onClick={() => value.length >= 1 && deleteValue()}
          >
            DEL
          </Button>
          {/*Segunda Fila */}
          <Button onClick={() => setValue(value + "4")}>4</Button>
          <Button onClick={() => setValue(value + "5")}>5</Button>
          <Button onClick={() => setValue(value + "6")}>6</Button>
          <Button onClick={() => value.length >= 1 && addSimbol("+")}>+</Button>
          {/*Tercera Fila */}

          <Button onClick={() => setValue(value + "1")}>1</Button>
          <Button onClick={() => setValue(value + "2")}>2</Button>
          <Button onClick={() => setValue(value + "3")}>3</Button>
          <Button onClick={() => value.length >= 1 && addSimbol("-")}>-</Button>
          {/*Cuarta Fila */}

          <Button onClick={() => value.length >= 1 && addSimbol(".")}>.</Button>
          <Button onClick={() => setValue(value + "0")}>0</Button>
          <Button onClick={() => value.length >= 1 && addSimbol("/")}>/</Button>
          <Button onClick={() => value.length >= 1 && addSimbol("*")}>
            *{" "}
          </Button>
          {/*Quinta Fila */}

          <Button
            onClick={() => setValue("")}
            gc="1/3"
            color="var(--white)"
            bg="var(--key-background-dark-blue)"
            bdbox="var(--key-shadow-dark-blue)"
          >
            RESET
          </Button>
          <Button
            onClick={Calculadora}
            gc="3/5"
            color="var(--white)"
            bg="var(--key-background-red)"
            bdbox="var(--key-shadow-dark-red)"
          >
            =
          </Button>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default App;
