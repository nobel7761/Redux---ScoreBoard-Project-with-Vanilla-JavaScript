const containerEL = document.getElementById("all-matches container");
const containerAddBtn = document.getElementById("nobel-add-new-container");

let componentId = 2;

const addNewComponent = () => {
  const rootDiv = document.createElement("div");
  rootDiv.classList.add("match");

  const firstChildDiv = document.createElement("div");
  firstChildDiv.classList.add("wrapper");
  rootDiv.appendChild(firstChildDiv);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("lws-delete");
  firstChildDiv.appendChild(deleteButton);

  const deleteImage = document.createElement("img");
  deleteImage.setAttribute("src", "./image/delete.svg");
  deleteButton.appendChild(deleteImage);

  deleteButton.addEventListener("click", () => {
    containerEL.removeChild(rootDiv);
  });

  const matchTitle = document.createElement("h3");
  matchTitle.classList.add("lws-matchName");
  matchTitle.textContent = `Match ${componentId}`;
  firstChildDiv.appendChild(matchTitle);

  const secondChildDiv = document.createElement("div");
  secondChildDiv.classList.add("inc-dec");
  rootDiv.appendChild(secondChildDiv);

  const incrementForm = document.createElement("form");
  incrementForm.classList.add("incrementForm");
  secondChildDiv.appendChild(incrementForm);

  const incrementTitle = document.createElement("h4");
  incrementTitle.textContent = "Increment";
  incrementForm.appendChild(incrementTitle);

  const incrementInput = document.createElement("input");
  incrementInput.setAttribute("type", "number");
  incrementInput.setAttribute("name", "increment");
  incrementInput.classList.add("lws-increment");
  incrementForm.appendChild(incrementInput);

  const decrementForm = document.createElement("form");
  decrementForm.classList.add("decrementForm");
  secondChildDiv.appendChild(decrementForm);

  const decrementTitle = document.createElement("h4");
  decrementTitle.textContent = "Decrement";
  decrementForm.appendChild(decrementTitle);

  const decrementInput = document.createElement("input");
  decrementInput.setAttribute("type", "number");
  decrementInput.setAttribute("name", "decrement");
  decrementInput.classList.add("lws-decrement");
  decrementForm.appendChild(decrementInput);

  const thirdChildDiv = document.createElement("div");
  thirdChildDiv.classList.add("numbers");
  rootDiv.appendChild(thirdChildDiv);

  const resultEL = document.createElement("h2");
  resultEL.classList.add("lws-singleResult");
  resultEL.textContent = "120";
  thirdChildDiv.appendChild(resultEL);

  incrementInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const incrementValue = Number(e.target.value);
      resultEL.textContent = String(
        Number(resultEL.textContent) + incrementValue
      );
      e.preventDefault();
    }
  });

  decrementInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const decrementValue = Number(e.target.value);
      const updatedValue = String(
        Number(resultEL.textContent) - decrementValue
      );
      if (updatedValue >= 0) {
        resultEL.textContent = updatedValue;
      } else {
        resultEL.textContent = 0;
      }
      e.preventDefault();
    }
  });

  // Add the new component to the container
  containerEL.appendChild(rootDiv);

  // Increment the component ID for the next component
  componentId++;
};

containerAddBtn.addEventListener("click", addNewComponent);
