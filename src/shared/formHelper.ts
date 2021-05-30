const clearInputs = (form: HTMLFormElement) => {
  const inputs = form.querySelectorAll("input");
  const textAreas = form.querySelectorAll("textarea")

  inputs.forEach(input => input.value = "");
  textAreas.forEach(textArea => textArea.value = "");
}

export {
  clearInputs
}