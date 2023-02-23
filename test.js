const incrementInput = document.getElementById("increment");
const decrementInput = document.getElementById("decrement");
const resultEL = document.getElementById("result");

const containerEL = document.getElementById("all-matches container");
const containerAddBtn = document.getElementById("nobel-add-new-container");

let componentId = 2;

//Redux step 1: declaring initialState
const initialState = {
  value: 120,
};

//Redux step 2: declaring reducer function
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return {
      ...state,
      value: state.value + action.payload,
    };
  } else if (action.type === "decrement") {
    return {
      ...state,
      value: state.value - action.payload,
    };
  } else {
    return { ...state };
  }
};

//Redux step 3: creating store
const store = Redux.createStore(counterReducer);

incrementInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    store.dispatch({
      type: "increment",
      payload: Number(e.target.value),
    });
    /*     const incrementValue = Number(e.target.value);
    resultEL.textContent = String(
      Number(resultEL.textContent) + incrementValue
    ); */
    e.preventDefault();
    incrementInput.value = "";
  }
});

decrementInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    store.dispatch({
      type: "decrement",
      payload: Number(e.target.value),
    });

    /*     const decrementValue = Number(e.target.value);
    const updatedValue = String(Number(resultEL.textContent) - decrementValue);
    if (updatedValue >= 0) {
      resultEL.textContent = updatedValue;
    } else {
      resultEL.textContent = 0;
    } */
    e.preventDefault();
    decrementInput.value = "";
  }
});

const render = () => {
  const latestState = store.getState();
  if (latestState.value >= 0) {
    resultEL.innerText = latestState.value;
  } else {
    resultEL.innerText = 0;
  }
};

//for showing default data manually
render();

//Redux step 5: subscribe
store.subscribe(render);

containerAddBtn.addEventListener("click", addNewComponent);
