const containerEL = document.getElementById("container");
const addMatchButton = document.getElementById("add-match");
const resetButton = document.getElementById("reset");

// GET MATCH
const getMatch = (id, matchNo) => {
  return `<div id="match-${id}" class="match">
        <div class="wrapper">
          <button id="delete-${id}" class="lws-delete">
            <img src="./image/delete.svg" alt="" />
          </button>
          <h3 class="lws-matchName">Match ${matchNo}</h3>
        </div>
        <div class="inc-dec">
          <form class="incrementForm">
            <h4>Increment</h4>
            <input
              id="increment-${id}"
              type="number"
              name="increment"
              class="lws-increment"
            />
          </form>
          <form class="decrementForm">
            <h4>Decrement</h4>
            <input
              id="decrement-${id}"
              type="number"
              name="decrement"
              class="lws-decrement"
            />
          </form>
        </div>
        <div class="numbers">
          <h2 id="score-${id}" class="lws-singleResult"></h2>
        </div>
      </div>`;
};

// ACTION IDENTIFIERS
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD_MATCH = "addNewMatch";
const RESET_SCORE = "resetScore";
const DELETE_MATCH = "deleteMatch";

// ACTION CREATORS
const increment = (score, id) => {
  return {
    type: INCREMENT,
    payload: { score: score, id: id },
  };
};
const decrement = (score, id) => {
  return {
    type: DECREMENT,
    payload: { score: score, id: id },
  };
};
const addMatch = () => {
  return {
    type: ADD_MATCH,
  };
};
const resetScores = () => {
  return {
    type: RESET_SCORE,
  };
};

// INITIAL STATE
const initialState = {
  matches: [
    {
      id: 1,
      score: 0,
    },
  ],
};

//REDUCER FUNCTION
const scoreReducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return {
      ...state,
      matches: state.matches.map((match) =>
        match.id === action.payload.id
          ? { ...match, score: match.score + action.payload.score }
          : { ...match }
      ),
    };
  } else if (action.type === DECREMENT) {
    return {
      ...state,
      matches: state.matches.map((match) =>
        match.id === action.payload.id
          ? { ...match, score: match.score - action.payload.score }
          : { ...match }
      ),
    };
  } else if (action.type === ADD_MATCH) {
    return {
      ...state,
      matches: [
        ...state.matches,
        {
          id: state.matches.length + 1,
          score: 0,
        },
      ],
    };
  } else if (action.type === RESET_SCORE) {
    return {
      ...state,
      matches: state.matches.map((match) => ({
        ...match,
        score: 0,
      })),
    };
  } else {
    return { ...state };
  }
};

// CREATE STORE
const store = Redux.createStore(scoreReducer);

const render = () => {
  const state = store.getState();
  console.log("state", state);
  state.matches.forEach((match, i) => {
    if (!document.getElementById(`match-div-${i}`)) {
      const matchDiv = document.createElement("div");
      matchDiv.setAttribute("id", `match-div-${i}`);
      matchDiv.setAttribute("class", `match-div`);
      matchDiv.innerHTML = getMatch(match.id, i + 1);

      containerEL.append(matchDiv);

      const incrementInput = document.getElementById(`increment-${match.id}`);
      const decrementInput = document.getElementById(`decrement-${match.id}`);

      incrementInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const score = parseInt(incrementInput.value) || 0;
          store.dispatch(increment(score, match.id));
          incrementInput.value = "";
        }
      });

      decrementInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const score = parseInt(decrementInput.value) || 0;
          const currentScore = store
            .getState()
            .matches.find((m) => m.id === match.id).score;

          if (score >= currentScore) {
            store.dispatch(decrement(currentScore, match.id));
            decrementInput.value = "";
          } else {
            store.dispatch(decrement(score, match.id));
            decrementInput.value = "";
          }

          console.log(score, currentScore);
        }
      });
    }
    const score = document.getElementById(`score-${match.id}`);
    score.innerHTML = match.score;
  });
};

//UPDATE UI MANUALLY
render();

addMatchButton.addEventListener("click", () => {
  store.dispatch(addMatch());
});

resetButton.addEventListener("click", () => {
  store.dispatch(resetScores());
});

store.subscribe(render);
