
import './App.css';
//for hooks
import {useState} from 'react';
//for router
import { Navigate, Route, Routes } from 'react-router-dom';
//for-context
import {createContext} from 'react';

//for-animation
import 'animate.css';
// material-UI
import { TicTacToeGame } from './TicTacToeGame';
import { MovieDetails } from './MovieDetails';
import { AddMovie } from './AddMovie';
import { Movies } from './Movies';
// import { Edit } from './Edit';
import { SignUp } from './SignUp';
import { Login } from './Home';

function App() {


 const [theme, setTheme] = useState(false);

  return (
    <themeCtx.Provider value={[theme, setTheme]}>
    <div className="App">
      
      <Routes>
      
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login/>} />

          <Route path="/signup" element={<SignUp/>} />
    
          <Route path="/movies" element={ <Movies />} />
           
          <Route path="/movies/:id" element={ <MovieDetails />} />
    
          <Route  path="/addMovie" element={ <AddMovie />} />
           
          <Route path="/TicTacToe-Game" element={<TicTacToeGame />} />
      
          {/* <Route exact path="/color-Game" element={<Reducer />} /> */}
     
          {/* <Route exact path="/basic-form" element={  <BasicForm/>} /> */}
    
          {/* <Route exact path="/movie-edit/:id" element={ <Edit />} /> */}
           
          <Route path="*" element={
             <>
            <h1>404 thala!</h1>
            <img src="https://www.bing.com/th/id/OGC.32302a413d868359b8cc10dafaa069bd?pid=1.7&rurl=https%3a%2f%2fcdn.wallpapersafari.com%2f31%2f5%2fRuyK1a.gif&ehk=PPh%2bqZiGwpWEumoNT64vnt0Rj02XTgXQp9dtSTMXUrQ%3d" alt=""></img>
             </>
           } />
    
    </Routes>
      
    </div>
    </themeCtx.Provider>
  );
}


export default App;
export const themeCtx = createContext(null);