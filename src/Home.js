import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { themeCtx } from './App';

//home componenet
export function Home() {
  const history = useHistory();
  const [theme] = useContext(themeCtx);
  const style = (theme) ? "blackHome" : "whiteHome";
  return (
    <div className={style}>
      <span className=" animate__animated animate__headShake animate__infinite	infinite"><b>Hiii , Guest!!!</b></span>
      <div className="animate__animated animate__lightSpeedInRight ">
        <h1>What are you Looking for???</h1><button onClick={() => history.push(`/movies`)}>Movies?</button> (or) <button onClick={() => history.push(`/TicTacToe-Game`)}>game?</button>
      </div>
    </div>);
}
