function pressKey(key) {
    const screen = document.getElementById("screen");
    screen.textContent += key;
  }
  
  function clearScreen() {
    document.getElementById("screen").textContent = "";
  }
  
  function calculateResult() {
    const screen = document.getElementById("screen");
    try {
      screen.textContent = eval(screen.textContent);
    } catch {
      screen.textContent = "Error";
    }
  }