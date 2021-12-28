import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { themeCtx } from './App';
import {useFormik} from "formik";
import * as yup from 'yup';

//addMovie component
export function AddMovie() {
  const [theme] = useContext(themeCtx);
  const style = (theme) ? "blackAdd" : "whiteAdd";


  return (
    <div className={style}>
      <div className="addMovie">
        <Box className="box" sx={{ display: 'grid', gridTemplateColumns: "1fr", gap: 0.5, padding: "0.5rem" }} autoComplete="off">
          <h3 className="head">Add your Favourite Movie too!!!</h3>
          <BasicForm />
        </Box>
      </div>
    </div>);
}

const formValidationSchema = yup.object({
  name: yup.string()
            .required("No one can add a movie without Movie Name?😀"),
  image:yup.string()
           .required("so ,where is the poster?😀"),
  trailer:yup.string()
              .required("Movie can be boring but We can create hype with trailer😀"),
  rating:yup.number()
            .required("Often people watch movies only by reviews😁"),
  summary:yup.string()
             .required("so What is this all about friend🤷‍♂️")
})


function BasicForm(){
  let history = useHistory();

  const adding = (values) => {
    const newMovie = values;
    fetch("https://61c412daf1af4a0017d99281.mockapi.io/movies",
      {
        method: "POST",
        body: JSON.stringify(newMovie),
        headers: { "Content-Type": "application/json" }
      })
      .then(() => history.push(`/movies`));
  };

  const {values,handleChange,handleBlur,handleSubmit,touched,errors} = 
  useFormik({
      initialValues:{name:"",image:"",trailer:"",rating:"",summary:""},
     // validate: validateForm,
     validationSchema: formValidationSchema,

     onSubmit:(values)=>{
         adding(values);
        console.log(values);
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
      />
      <br/>
      <span> {touched.name && errors.name ? errors.name : ""}</span>
     
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
      />
      <br/>
      <span> {touched.image && errors.image ? errors.image : ""}</span>
     
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
      />
      <br/>
      <span>{touched.trailer && errors.trailer ? errors.trailer : ""}</span>
      
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
      />
      <br/>
      <span>{touched.rating && errors.rating ? errors.rating : ""}</span>
   
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
      />
      <br/>
      <span>{touched.summary && errors.summary ? errors.summary : ""}</span>
      
      <br/>
      <br/>

      <Button className="button" type="submit" variant="contained">Add Movie</Button>
      <Button className="cancelButton" variant="contained" color="error" onClick={() => { history.push(`/movies`); }}>Cancel</Button>
    </form>
  );
}