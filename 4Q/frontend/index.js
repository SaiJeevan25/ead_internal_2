const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const operationSelect = document.getElementById("operation");
const resultP = document.getElementById("result");
const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener("click", async () => {
  const num1 = num1Input.value;
  const num2 = num2Input.value;
  const operation = operationSelect.value;

  if (!num1 || !num2) {
    resultP.textContent = "Please enter both numbers.";
    resultP.style.color = "red";
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/calc/${operation}?num1=${num1}&num2=${num2}`);
    const data = await response.json();

    if (response.ok) {
      resultP.textContent = `Result: ${data.result}`;
      resultP.style.color = "green";
    } else {
      resultP.textContent = `Error: ${data.error}`;
      resultP.style.color = "red";
    }
  } catch (err) {
    resultP.textContent = "Error connecting to server.";
    resultP.style.color = "red";
  }
});
