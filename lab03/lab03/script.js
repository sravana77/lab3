function appendChar(char) {
  document.getElementById("result").value += char;
}

function calculateResult() {
  const result = document.getElementById("result");
  let expression = result.value;

  try {
    // Convert trigonometric function inputs from degrees to radians
    expression = expression.replace(/sin\(/g, "Math.sin(" + Math.PI / 180 + "*");
    expression = expression.replace(/cos\(/g, "Math.cos(" + Math.PI / 180 + "*");
    expression = expression.replace(/tan\(/g, "Math.tan(" + Math.PI / 180 + "*");

    expression = expression.replace(/sqrt\(/g, "Math.sqrt(");

    result.value = eval(expression);
  } catch (error) {
    result.value = "Error";
  }
}

function clearResult() {
  document.getElementById("result").value = "";
}

function deleteLastChar() {
  const currentResult = document.getElementById("result").value;
  document.getElementById("result").value = currentResult.slice(0, -1);
}
