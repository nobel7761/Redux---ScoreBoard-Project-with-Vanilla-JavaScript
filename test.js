const incrementInput = document.getElementById("increment");
const decrementInput = document.getElementById("decrement");
const resultEL = document.getElementById("result");

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
    e.preventDefault();
    decrementInput.value = "";
  }
});

const render = () => {
  const latestState = store.getState();
  if (latestState.value >= 0) {
    resultEL.innerText = latestState.value;
  } else {
    latestState.value = 0;
    resultEL.innerText = 0;
  }
};

//for showing default data manually
render();

//Redux step 5: subscribe
store.subscribe(render);
