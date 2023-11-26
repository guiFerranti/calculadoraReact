import React, { useState } from "react";
import styled from "styled-components";

const categories = ["Área", "Volume", "Trigonométricas", "Bhaskara"];

const formulas = {
  Área: {
    "Área do Triângulo": ["Base", "Altura"],
    "Área do Retângulo": ["Base", "Altura"],
    "Área do Círculo": ["Raio"],
    "Área do Trapézio": ["BaseMaior", "BaseMenor", "Altura"],
    "Área do Paralelogramo": ["Base", "Altura"],
  },
  Volume: {
    "Volume do Cubo": ["Lado"],
    "Volume do Paralelepípedo": ["Comprimento", "Largura", "Altura"],
    "Volume da Esfera": ["Raio"],
    "Volume do Cone": ["Raio", "Altura"],
    "Volume do Cilindro": ["Raio", "Altura"],
  },
  Trigonométricas: {
    Seno: ["Ângulo"],
    Cosseno: ["Ângulo"],
    Tangente: ["Ângulo"],
  },
  Bhaskara: {
    "Fórmula de Bhaskara (Fórmula Quadrática)": ["a", "b", "c"],
  },
};

const formulasExpressions = {
  Área: {
    "Área do Triângulo": "(Base * Altura) / 2",
    "Área do Retângulo": "Base * Altura",
    "Área do Círculo": "π * Raio²",
    "Área do Trapézio": "((BaseMaior + BaseMenor) * Altura) / 2",
    "Área do Paralelogramo": "Base * Altura",
  },
  Volume: {
    "Volume do Cubo": "Lado³",
    "Volume do Paralelepípedo": "Comprimento * Largura * Altura",
    "Volume da Esfera": "(4/3) * π * Raio³",
    "Volume do Cone": "(1/3) * π * Raio² * Altura",
    "Volume do Cilindro": "π * Raio² * Altura",
  },
  Trigonométricas: {
    Seno: "sin(Ângulo)",
    Cosseno: "cos(Ângulo)",
    Tangente: "tan(Ângulo)",
  },
  Bhaskara: {
    "Fórmula de Bhaskara (Fórmula Quadrática)": "(-b ± √(b²-4ac)) / (2a)",
  },
};

const calculations = {
  Área: {
    "Área do Triângulo": "(inputValues['Base'] * inputValues['Altura']) / 2",
    "Área do Retângulo": "inputValues['Base'] * inputValues['Altura']",
    "Área do Círculo": "Math.PI * inputValues['Raio'] ** 2",
    "Área do Trapézio": "((inputValues['BaseMaior'] + inputValues['BaseMenor']) * inputValues['Altura']) / 2",
    "Área do Paralelogramo": "inputValues['Base'] * inputValues['Altura']",
  },
  Volume: {
    "Volume do Cubo": "inputValues['Lado'] ** 3",
    "Volume do Paralelepípedo": "inputValues['Comprimento'] * inputValues['Largura'] * inputValues['Altura']",
    "Volume da Esfera": "(4/3) * Math.PI * inputValues['Raio'] ** 3",
    "Volume do Cone": "(1/3) * Math.PI * inputValues['Raio'] ** 2 * inputValues['Altura']",
    "Volume do Cilindro": "Math.PI * inputValues['Raio'] ** 2 * inputValues['Altura']",
  },
  Trigonométricas: {
    Seno: "Math.sin(inputValues['Ângulo'])",
    Cosseno: "Math.cos(inputValues['Ângulo'])",
    Tangente: "Math.tan(inputValues['Ângulo'])",
  },
  Bhaskara: {
    "Fórmula de Bhaskara (Fórmula Quadrática)": `(-inputValues['b'] + Math.sqrt(inputValues['b']**2 - 4 * inputValues['a'] * inputValues['c'])) / (2 * inputValues['a'])`,
  },
};

const FormulaContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;
`;

const FormulaSection = styled.div`
  margin-bottom: 20px;
`;

const FormulaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
`;

const FormulaButton = styled.button`
  width: 120px;
  height: 30px;
  font-size: 16px;
  border: none;
  outline: none;
  margin: 5px;
  border-radius: 4px;
  transition: 0.1s;
  box-shadow: 5px 5px 8px #00000020, -5px -5px 8px #ffff;

  &:hover {
    box-shadow: inset 5px 5px 8px rgba(16, 16, 16, 0.1), inset -5px -5px 8px #fff;
    background: #fff;
  }
}`;

const FormulaInput = styled.input`
  margin-bottom: 0.5em;
  width: 120px;
  height: 30px;
  font-size: 14px;
  outline: none;
  border: none;
  padding: 0.5em;
  border-radius: 6px;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff;
`;

const FormulaLabel = styled.span`
  margin-bottom: 0.5em;
  font-size: 14px;
`;

const FormulaDropdown = styled.select`
  height: 30px;
  font-size: 14px;
  outline: none;
  border: none;
  padding: 0.5em;
  border-radius: 6px;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff;
`;

const FormulaCalculator = () => {
  const [category, setCategory] = useState("Área");
  const [formula, setFormula] = useState(Object.keys(formulas["Área"])[0]);
  const [inputValues, setInputValues] = useState({});
  const [result, setResult] = useState(null);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setFormula(Object.keys(formulas[event.target.value])[0]);
    setInputValues({});
    setResult(null);
  };

  const handleFormulaChange = (event) => {
    setFormula(event.target.value);
    setInputValues({});
    setResult(null);
  };

  const handleInputChange = (variable, value) => {
    setInputValues((prevInputs) => ({
      ...prevInputs,
      [variable]: isNaN(value) ? value : parseFloat(value),
    }));
    setResult(null);
  };

  const calculateResult = () => {
    const categoryFormulas = calculations[category];

    if (category === "Bhaskara") {
      const a = inputValues['a'];
      const b = inputValues['b'];
      const c = inputValues['c'];

      const delta = b**2 - 4*a*c;

      if (delta < 0) {
        setResult("A equação não possui raízes reais.");
      } else if (delta === 0) {
        const result = -b / (2*a);
        setResult(`Raiz única: ${result}`);
      } else {
        const root1 = (-b + Math.sqrt(delta)) / (2*a);
        const root2 = (-b - Math.sqrt(delta)) / (2*a);
        setResult(`Raízes: ${root1} e ${root2}`);
      }
    } else {
      const formulaExpression = categoryFormulas[formula];

      try {
        const result = eval(formulaExpression);
        setResult(`Resultado: ${result}`);
      } catch (error) {
        setResult("Erro ao calcular. Certifique-se de que os valores fornecidos são válidos.");
      }
    }
  };

  const renderInputs = () => {
    const variables = formulas[category][formula];
    return variables.map((variable) => (
      <FormulaRow key={variable}>
        <FormulaLabel>{variable}:</FormulaLabel>
        <FormulaInput
          type="text"
          placeholder={`Insira o valor de ${variable}`}
          value={inputValues[variable] || ""}
          onChange={(e) => handleInputChange(variable, e.target.value)}
        />
      </FormulaRow>
    ));
  };

  const renderFormula = () => {
    const formulaExpression = formulasExpressions[category][formula];

    return (
      <div>
        Fórmula: {formulaExpression}
        <br />
        Resultado: {result}
      </div>
    );
  };

  return (
    <FormulaContainer>
      <FormulaDropdown value={category} onChange={handleCategoryChange}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </FormulaDropdown>

      <FormulaSection>
        <h2>Fórmulas {category}</h2>
        <FormulaRow>
          <FormulaDropdown value={formula} onChange={handleFormulaChange}>
            {Object.keys(formulas[category]).map((form) => (
              <option key={form} value={form}>
                {form}
              </option>
            ))}
          </FormulaDropdown>
        </FormulaRow>

        {renderInputs()}

        <FormulaRow>
          <FormulaButton onClick={calculateResult}>Calcular</FormulaButton>
        </FormulaRow>

        {renderFormula()}
      </FormulaSection>
    </FormulaContainer>
  );
};

export default FormulaCalculator;
