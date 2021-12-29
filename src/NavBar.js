import { Route, Switch, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Brightness7SharpIcon from '@mui/icons-material/Brightness7Sharp';
import Brightness4SharpIcon from '@mui/icons-material/Brightness4Sharp';
import { TicTacToeGame } from './TicTacToeGame';
import { MovieDetails } from './MovieDetails';
import { AddMovie } from './AddMovie';
import { Movies } from './Movies';
import { Home } from './Home';
import { Edit } from './Edit';
import { themeCtx } from './App';

import {useFormik} from "formik";
import * as yup from 'yup';
import { Reducer } from './Redux';


//navbar component
export function NavBar() {
  const [theme, setTheme] = useContext(themeCtx);
  const themeName = (theme) ? "lightMode" : "darkMode";
  const history = useHistory();
  return (<div>
    <AppBar position="static" sx={(theme) ? { background: "gold", color: "black" } : { background: "#0088f8", color: "white" }}>
      <Toolbar className={themeName}>

        <div className="buttonsDiv">
          <Button className="navButtons" color="inherit" variat="text" onClick={() => history.push(`/`)}>
            <span className="animate__animated animate__bounceInLeft animate__slow	">Home</span>
          </Button>


          <Button className="navButtons" color="inherit" variant="text" onClick={() => history.push(`/movies`)}>
            <span className="animate__animated animate__bounceInLeft animate__slow	">Movies</span>
          </Button>


          <Button className="navButtons" color="inherit" variant="text" onClick={() => history.push(`/addMovie`)}>
            <span className="animate__animated animate__bounceInLeft animate__slow	">Add Movies</span>
          </Button>


          <Button className="navButtons" color="inherit" variant="text" onClick={() => history.push(`/TicTacToe-Game`)}>
            <span className="animate__animated animate__bounceInLeft animate__slow ">TicTacToe Game</span>
          </Button>


          <Button className="navButtons" color="inherit" variant="text" onClick={() => history.push(`/color-Game`)}>
            <span className="animate__animated animate__bounceInLeft animate__slow ">Redux</span>
          </Button>
        </div>
        <div className="themeSwitch">
          {(theme)
            ? <button className="animate__animated animate__bounceInRight animate__slow" onClick={() => setTheme(!theme)}><Brightness7SharpIcon /></button>
            : <button className="animate__animated animate__bounceInRight animate__slow" onClick={() => setTheme(!theme)}><Brightness4SharpIcon /></button>}
        </div>
      </Toolbar>
    </AppBar>
    {/* <nav>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/movies">Movies</Link>
          </div>
          <div>
            <Link to="/addMovie">Add Movies</Link>
          </div>
          <div>
            <Link to="/films">Films</Link>
          </div>
         </nav>  */}
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/movies">
        <Movies />
      </Route>
      <Route exact path="/movies/:id">
        <MovieDetails />
      </Route>
      <Route exact path="/addMovie">
        <AddMovie />
      </Route>
      <Route exact path="/TicTacToe-Game">
        <TicTacToeGame />
      </Route>
      <Route exact path="/color-Game">
        <Reducer />
      </Route>
      <Route exact path="/basic-form">
          <BasicForm/>
      </Route>
      <Route exact path="/movie-edit/:id">
        <Edit />
      </Route>
      <Route path="**">
        <h1>404 thala!</h1>
        <img src="https://www.bing.com/th/id/OGC.32302a413d868359b8cc10dafaa069bd?pid=1.7&rurl=https%3a%2f%2fcdn.wallpapersafari.com%2f31%2f5%2fRuyK1a.gif&ehk=PPh%2bqZiGwpWEumoNT64vnt0Rj02XTgXQp9dtSTMXUrQ%3d" alt=""></img>
      </Route>
    
    </Switch>
  </div>);
}


// Normal HTML refreshes page on submission 
// formik doesnt allow to refresh..
//formik - handleOnchange , handleSubmit , handleBlur , prevent page refresh

// const validateForm = (values)=>{
//   const errors = {};
//   //console.log("validateForm",values);

// if(!values.email){
//   errors.email = "required!!!"
// }
// else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//   errors.email = 'Invalid email address';
// }
// else if(values.email.length < 5){
//      errors.email = "Please provide a longer email";
//  }

//  if(!values.password){
//    errors.password = "required!!!"
//  }else if(values.password.length < 8){
//    errors.password = "please type a longer password😎"
//  }else if(values.password.length > 12){
//    errors.password = "please type a shorter password😅"
//  }



//   //console.log(errors);
//   return errors;
// }

// function BasicForm(){
//   const formik = useFormik({
//       initialValues:{email:``,password:""},
//       validate: validateForm,
//       onSubmit: (values)=>{
//         console.log("onSubmit",values);
//       }
//     })
//   return(
//     <form onSubmit={formik.handleSubmit}>
//       <input 
//       id="email"
//       name="email"
//       value={formik.values.email} 
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}

//       type="email" 
//       placeholder='Enter your E-mail'
//       />
//       {formik.touched.email && formik.errors.email ? formik.errors.email : ""}

//       <br/>
      
//       <input 
//       id="password"
//       name="password"
//       value={formik.values.password} 
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}

//       type="password" 
//       placeholder='Enter your Password'
//       />
//       {formik.touched.password && formik.errors.password ? formik.errors.password : ""}

//       <br/>
    
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// const validateForm = (values)=>{
//   const errors = {};
//   //console.log("validateForm",values);


//   // for email input
// if(!values.email){
//   errors.email = "required!!!"
// }
// else if(values.email.length < 5){
//   errors.email = "Please provide a longer email";
// }
// else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//   errors.email = 'Invalid email address';
// }

//   //for password input
//  if(!values.password){
//    errors.password = "required!!!"
//  }else if(values.password.length < 8){
//    errors.password = "please type a longer password😎"
//  }else if(values.password.length > 12){
//    errors.password = "please type a shorter password😅"
//  }


//   //console.log(errors);
//   return errors;
// }

// function BasicForm(){
//   const {values,handleChange,handleBlur,handleSubmit,touched,errors} = 
//   useFormik({
//       initialValues:{email:``,password:""},
//       validate: validateForm,
//       onSubmit: (values)=>{
//         console.log("onSubmit",values);
//       }
//     })
//   return(
//     <form onSubmit={handleSubmit}>
//       <input 
//       id="email"
//       name="email"
//       value={values.email} 
//       onChange={handleChange}
//       onBlur={handleBlur}

//       type="email" 
//       placeholder='Enter your E-mail'
//       />
//       {touched.email && errors.email ? errors.email : ""}

//       <br/>
      
//       <input 
//       id="password"
//       name="password"
//       value={values.password} 
//       onChange={handleChange}
//       onBlur={handleBlur}

//       type="password" 
//       placeholder='Enter your Password'
//       />
//       {touched.password && errors.password ? errors.password : ""}

//       <br/>
    
//       <button type="submit">Submit</button>
//     </form>
//   );
// }


       //form validation with yup 

  const formValidationSchema = yup.object({
       email: yup.string()
                 .min(5,"need a longer Email😎")
                 .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"its not an email I guess🤨")
                 .required("why not?😀"),
       password:yup.string()
                   .min(8,"need a longer password😎")
                   .max(12,"too much to remember😅")
                   .required("why not?😀")

  })


// const validateForm = (values)=>{
//   const errors = {};
//   //console.log("validateForm",values);


//   // for email input
// if(!values.email){
//   errors.email = "required!!!"
// }
// else if(values.email.length < 5){
//   errors.email = "Please provide a longer email";
// }
// else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//   errors.email = 'Invalid email address';
// }

//   //for password input
//  if(!values.password){
//    errors.password = "required!!!"
//  }else if(values.password.length < 8){
//    errors.password = "please type a longer password😎"
//  }else if(values.password.length > 12){
//    errors.password = "please type a shorter password😅"
//  }


//   //console.log(errors);
//   return errors;
// }

function BasicForm(){
  const {values,handleChange,handleBlur,handleSubmit,touched,errors} = 
  useFormik({
      initialValues:{email:``,password:""},
     // validate: validateForm,
     validationSchema: formValidationSchema,
      onSubmit: (values)=>{
        console.log("onSubmit",values);
      }
    })
  return(
    <form onSubmit={handleSubmit}>
      <input 
      id="email"
      name="email"
      value={values.email} 
      onChange={handleChange}
      onBlur={handleBlur}

      type="email" 
      placeholder='Enter your E-mail'
      />
      {touched.email && errors.email ? errors.email : ""}

      <br/>
      
      <input 
      id="password"
      name="password"
      value={values.password} 
      onChange={handleChange}
      onBlur={handleBlur}

      type="password" 
      placeholder='Enter your Password'
      />
      {touched.password && errors.password ? errors.password : ""}

      <br/>
    
      <button type="submit">Submit</button>
    </form>
  );
}


