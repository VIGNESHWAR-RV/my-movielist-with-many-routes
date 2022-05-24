//import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { themeCtx } from './App';
import {useFormik} from "formik";
import { NavBar } from './NavBar';
import * as yup from 'yup';
import { API } from "./API";


//addMovie component
export function AddMovie() {

  const [theme] = useContext(themeCtx);
  const style = (theme) ? "blackAdd" : "whiteAdd";


  return (
    <>
    <NavBar/>
    <div className={style}>
      <div className="addMovie">
        <Box className="box" sx={{ display: 'grid', gridTemplateColumns: "1fr", gap: 0.5, padding: "0.5rem" }} autoComplete="off">
          <h3 className="head">Add your Favourite Movie too!!!</h3>
          <BasicForm />
        </Box>
      </div>
    </div>
    </>);
}

const formValidationSchema = yup.object({
  name: yup.string()
            .required("No one can add a movie without Movie Name?😀")
            .max(15,"Why dont we make it easy to read?🙄"),
  image:yup.string()
           .required("so ,where is the poster?😀"),
  trailer:yup.string()
              .required("Movie can be boring but We can create hype with trailer😀"),
  rating:yup.number()
            .required("Often people watch movies only by reviews😁")
            .min(1,"Give a Better Rating⭐")
            .max(10,"Too Much rating😂"),
  summary:yup.string()
             .required("so What is this all about friend🤷‍♂️")
             .min(20 , "Give some spoiler too😂")
             .max(40, "Too much spoilers😅")
})


function BasicForm(){
  let navigate = useNavigate();

  const adding = (values) => {
    const newMovie = values;
    const user_auth = sessionStorage.getItem("user_auth");
    fetch(`${API}/movies`,
      {
        method: "POST",
        body: JSON.stringify(newMovie),
        headers: { "Content-Type": "application/json",user_auth }
      })
      .then(() => navigate(`/movies`));
  };

  const {values,handleChange,handleBlur,handleSubmit,touched,errors} = 
  useFormik({
      initialValues:{name:"",image:"",trailer:"",rating:"",summary:""},
     // validate: validateForm,
     validationSchema: formValidationSchema,

     onSubmit:(values)=>{
         adding(values);
    
     }
    })
  
  return(
    <form onSubmit={handleSubmit}>

      <TextField
      id="name"
      name="name"
      value={values.name} 
      onChange={handleChange}
      onBlur={handleBlur}

      label="Name" 
      variant="standard"
      className="inputs"
      color="error"
      margin='dense'
      placeholder='Enter the Movie Name'
      error={touched.name && errors.name}
      helperText = {(touched.name && errors.name) ? errors.name : ""}
      />
     
      <br/>
      <br/>

      <TextField
      id="image"
      name="image"
      value={values.image}
      onChange={handleChange}
      onBlur={handleBlur}

      label="Thumbnail"
      variant="standard"
      className="inputs"
      color="error"
      margin="dense"
      placeholder='Enter the Thumbnail Link'
      error={touched.image && errors.image}
      helperText = {(touched.image && errors.image) ? errors.image : ""}
      />
     
      <br/>
      <br/>

      <TextField
      id="trailer"
      name="trailer"
      value={values.trailer}
      onChange={handleChange}
      onBlur={handleBlur}

      label="Trailer"
      variant="standard"
      className="inputs"
      color="error"
      margin="dense"
      placeholder='Enter the Trailer Link'
      error={touched.trailer && errors.trailer}
      helperText = {(touched.trailer && errors.trailer) ? errors.trailer : ""}
      />
      
      <br/>
      <br/>

      <TextField
      id="rating"
      name="rating"
      value={values.rating}
      onChange={handleChange}
      onBlur={handleBlur}

      label="Rating"
      variant="standard"
      className="inputs"
      color="error"
      margin="dense"
      type="number"
      placeholder='What is your Rating out of 10'
      error={touched.rating && errors.rating}
      helperText = {(touched.rating && errors.rating) ? errors.rating : ""}
      />
  
      <br/>
      <br/>

      <TextField
      id="summary"
      name="summary"
      value={values.summary}
      onChange={handleChange}
      onBlur={handleBlur}

      label="Summary"
      variant="standard"
      className="inputs"
      color="error"
      margin="dense"
      placeholder='Enter a short description about the Movie'
      error={touched.summary && errors.summary}
      helperText = {(touched.summary && errors.summary) ? errors.summary : ""}
      />
      
      <br/>
      <br/>

      <Button className="button" type="submit" variant="contained">Add Movie</Button>
      <Button className="cancelButton" variant="contained" color="error" onClick={() => { navigate(`/movies`); }}>Cancel</Button>
    </form>
  );
}