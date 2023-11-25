import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 60px;
  height: 30px;
  font-size: 16px;
  border: none;
  outline: none;
  margin: 5px;
  border-radius: 4px;
  transition: 0.1s;
  box-shadow: 5px 5px 8px #00000020, -5px -5px 8px #ffff;

  &:hover {
    box-shadow: inset 5px 5px 8px rgba(16, 16, 16, 0.1),
      inset -5px -5px 8px #fff;
    background: #fff;
  }
`;

const Display = styled.input`
  margin-bottom: 0.5em;
  width: auto;
  height: 70px;
  font-size: 35px;
  outline: none;
  border: none;
  text-align: right;
  padding-right: 0.5em;
  background: #ecf0f3;
  border-radius: 6px;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff;
`;

const EvalButton = styled(Button)`
  background: #33ccff;
  color: #fff;
  box-shadow: inset 5px 5px 8px #66d9ff, inset -5px -5px 8px #00ace6;

  &:hover {
    box-shadow: inset 5px 5px 8px #00ace6, inset -5px -5px 8px #00ace6;
  }
`;

const ACButton = styled(Button)`
  background: #33cc33;
  color: #fff;

  &:hover {
    box-shadow: inset 5px 5px 8px #2eb82e, inset -5px -5px 8px #33cc33;
  }
`;

const CEButton = styled(Button)`
  background: #ff3399;
  color: #fff;

  &:hover {
    box-shadow: inset 5px 5px 8px #e60073, inset -5px -5px 8px #ff3399;
  }
`;

function fatorial(n) {
  var resultado = 1;
  for (let i = 1; i <= n; i++) {
    resultado *= i;
  }
  return resultado;
}

function Calculator() {
  const [screenValue, setScreenValue] = useState("");
  const [waitingForExponent, setWaitingForExponent] = useState(false);
  const [base, setBase] = useState("");



  const handleButtonClick = (buttonText) => {
    if (buttonText === "x") {
      buttonText = "*";
    }

    if (buttonText === "÷") {
      buttonText = "/";
    }

    setScreenValue(screenValue + buttonText);
  };



   const handleSquareRoot = () => {
     try {
       setScreenValue(Math.sqrt(eval(screenValue)).toString());
     } catch (error) {
       setScreenValue("Error");
     }
   };

   const handlePI = () => {
    try {
      setScreenValue(Math.PI.toString());
    } catch (error) {
      setScreenValue("Error");
    }
  };

  const handleE = () => {
    try {
      setScreenValue(Math.E.toString());
    } catch (error) {
      setScreenValue("Error");
    }
  };

  const HandleFatorial = () => {
    try {
      setScreenValue(fatorial(eval(screenValue)).toString());
    } catch (error) {
      setScreenValue("Error");
    }
  };

  const handlePow = () => {
    setWaitingForExponent(true);
    setBase(screenValue);
    setScreenValue("");
  };
  
  

  const handleMathFunction = (mathFunction) => {
    setScreenValue(mathFunction(parseFloat(screenValue)));
  };


  const evaluateExpression = () => {
    try {
      if (waitingForExponent) {
        setScreenValue(Math.pow(parseFloat(base), parseFloat(screenValue)).toString());
        setBase("");
        setWaitingForExponent(false);
      } else {
        setScreenValue(eval(screenValue).toString());
      }
    } catch (error) {
      setScreenValue("Error");
    }
  };
  

  const handleClear = () => {
    setScreenValue("");
  };

  const handleBackspace = () => {
    setScreenValue(screenValue.slice(0, -1));
  };

  return (
    <Container>
      <div className="display">
        <Display type="text" value={screenValue} />
      </div>

      <div className="btns">
        <Row>
          <CEButton onClick={handleBackspace}>CE</CEButton>
          <Button onClick={HandleFatorial}>x!</Button>
          <Button className="btn" onClick={() => handleButtonClick("(")}>
            (
          </Button>
          <Button className="btn" onClick={() => handleButtonClick(")")}>
            )
          </Button>
          <Button className="btn" onClick={() => handleButtonClick("%")}>
            %
          </Button>
          <ACButton onClick={handleClear}>AC</ACButton>
        </Row>

        <Row>
          <Button onClick={() => handleMathFunction(Math.sin)}>sin</Button>
          <Button onClick={handlePI}>π</Button>
          <Button className="btn" onClick={() => handleButtonClick("7")}>
            7
          </Button>
          <Button className="btn" onClick={() => handleButtonClick("8")}>
            8
          </Button>
          <Button className="btn" onClick={() => handleButtonClick("9")}>
            9
          </Button>
          <Button className="btn" onClick={() => handleButtonClick("/")}>
            ÷
          </Button>
        </Row>

        <Row>
          <Button onClick={() => handleMathFunction(Math.cos)}>cos</Button>

          <Button onClick={() => handleMathFunction(Math.log)}>log</Button>
          <Button className="btn" onClick={() => handleButtonClick("4")}>
            4
          </Button>
          <Button className="btn" onClick={() => handleButtonClick("5")}>
            5
          </Button>
          <Button className="btn" onClick={() => handleButtonClick("6")}>
            6
          </Button>
          <Button className="btn" onClick={() => handleButtonClick("*")}>
            x
          </Button>
        </Row>

        <Row>
          <Button onClick={() => handleMathFunction(Math.tan)}>tan</Button>
          <Button onClick={handleSquareRoot}>√</Button>
          <Button className="btn" onClick={() => handleButtonClick("1")}>
            1
          </Button>
          <Button className="btn" onClick={() => handleButtonClick("2")}>
            2
          </Button>
          <Button className="btn" onClick={() => handleButtonClick("3")}>
            3
          </Button>
          <Button className="btn" onClick={() => handleButtonClick("-")}>
            -
          </Button>
        </Row>

        <Row>
          <Button onClick={handleE}>e</Button>
          <Button onClick={handlePow}>
            x
            <span style={{ position: "relative", bottom: ".6em", right: "-.1em", fontSize: "11px"}}>
              y
            </span>
              {waitingForExponent && base !== ""}
          </Button>


          <Button className="btn" onClick={() => handleButtonClick("0")}>
            0
          </Button>
          <Button className="btn" onClick={() => handleButtonClick(".")}>
            .
          </Button>
          <EvalButton onClick={evaluateExpression}>=</EvalButton>
          <Button className="btn" onClick={() => handleButtonClick("+")}>
            +
          </Button>
        </Row>
      </div>
    </Container>
  );
}

export default Calculator;
