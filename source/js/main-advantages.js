const descriptions = document.querySelectorAll(".advantages__description");
const buttons = document.querySelectorAll(".advantages__button");

const clearCurrentAdv = () => {
  descriptions.forEach(description => {
    if (description.classList.contains("advantages__description--current"))
    description.classList.remove("advantages__description--current");
  });
}

const addCurrentAdv = (param) => {
  descriptions.forEach(description => {
    if (description.dataset.type === param)
    description.classList.add("advantages__description--current");
  });
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
      clearCurrentAdv();
      addCurrentAdv(button.dataset.type);
  });
});
