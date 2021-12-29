import { useReducer } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

const initialState = { count: 1, background: "white" };
const reducer = (state, action) => {

  switch (action.type) {

    case "increment":
      return { count: state.count + 1, background: state.background };

    case "decrement":
      return { count: state.count - 1, background: state.background };

    case "reset":
      return { count: action.payload, background: state.background };

    case "color":
      return { count: state.count, background: action.color };
    default:
      return state;
  }
};
export function Reducer() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Count: {state.count} </h1>
      <Button variant="outlined" color="primary" onClick={() => { dispatch({ type: "increment" }); }}>➕</Button>
      <Button variant="outlined" color="success" onClick={() => { dispatch({ type: "reset", payload: 10 }); }}>🔃</Button>
      <Button variant="outlined" color="error" onClick={() => { dispatch({ type: "decrement" }); }}>➖</Button>
      <br /><br />
      <TextField varient="standard" label="Color Box" sx={{ background: state.background }} onChange={(event) => { dispatch({ type: "color", color: event.target.value }); }} />
    </div>
  );
}
