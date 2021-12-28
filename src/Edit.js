import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import Badge from '@mui/material/Badge';
import ThumbDownOffAltTwoToneIcon from '@mui/icons-material/ThumbDownOffAltTwoTone';
import { themeCtx } from './App';

import {useFormik} from "formik";
import * as yup from 'yup';

//Edit component
export function Edit() {

  const { id } = useParams();
  const history = useHistory();

  const [name, naming] = useState("");
  const [image, imaging] = useState("");
  const [trailer, setTrailer] = useState("");
  const [rating, rate] = useState("");
  const [summary, story] = useState("");

  const reAssigning = ({ name, image, trailer, rating, summary }) => {
    naming(name);
    imaging(image);
    setTrailer(trailer);
    rate(rating);
    story(summary);
  };
  const editing = () => {
    fetch(`https://61c412daf1af4a0017d99281.mockapi.io/movies/${id}`, { method: "GET" })
      .then((data) => data.json())
      .then((movie) => reAssigning(movie));
  };
  useEffect(editing, []);


  const [theme] = useContext(themeCtx);
  const style = (theme) ? "blackEdit" : "whiteEdit";


  const [show, showing] = useState(true);

  const [likes, liking] = useState(Math.random().toFixed(1) * 10);
  const [disLikes, disliking] = useState(Math.random().toFixed(1) * 10);

  const check = (rating >= 8.5) ? "green" : (rating > 4.5) ? "yellow" : "red";
  const style1 = (check === "green") ? { background: "green", color: "white" } : (check === "yellow") ? { background: "yellow", color: "black" } : { background: "red", color: "white" };
  const check1 = (rating >= 8.5) ? "😀" : (rating >= 4.5) ? "🙂" : "😒";

  return (
    <div className={style}>
      <div className="addMovie">
        <Box className="box" sx={{ display: 'grid', gridTemplateColumns: "1fr", gap: 0.5, padding: "0.5rem" }} autoComplete="off">
          <h3 className="head">Set the movie in your Own way!!!</h3>

          {/* <TextField helperText="Please enter movie name" color="error" margin="dense" className="inputs" id="standard-basic" value={name} label="Name" variant="standard" onChange={(event) => { naming(event.target.value); }} />

          <TextField helperText="Please enter the image link" color="error" margin="dense" className="inputs" id="standard-basic" value={image} label="ThumbNail Link" variant="standard" onChange={(event) => { imaging(event.target.value); }} />

          <TextField helperText="Please enter the trailer link" color="error" margin="dense" className="inputs" id="standard-basic" value={trailer} label="Trailer Link" variant="standard" onChange={(event) => { setTrailer(event.target.value); }} />

          <TextField helperText="Please enter the rating out of 10" color="error" margin="dense" className="inputs" id="standard-basic" value={rating} label="Rating" variant="standard" onChange={(event) => { rate(event.target.value); }} />

          <TextField helperText="Please add a short story about the movie (max: 20 words*)" color="error" margin="dense" className="inputs" value={summary} id="standard-basic" label="Summary" variant="standard" onChange={(event) => { story(event.target.value); }} />

          <Button className="button" variant="contained" onClick={() => Edits()}>Add Changes</Button>
          <Button className="cancelButton" variant="contained" color="error" onClick={() => { history.push(`/movies`); }}>Cancel</Button> */}
          <BasicForm name={name} image={image} trailer={trailer} rating={rating} summary={summary} id={id} />
        </Box>
      </div>

      <div>
        <h3 className="head">preview</h3>
        <div className="card">
          <img src={image} alt={name}></img>
          <div className="nameAndRAndD">
            <div className="nameAndR">
              <h1>{name}</h1>
              <p className="rating">{check1}<span style={style1}>{rating}</span></p>
            </div>
          </div>

          <div className="buttons">
            <Button className="spoiler" onClick={() => { showing(!show); }} variant="contained" sx={{ color: "#0088f8", background: "gold" }}>Spoiler?👀</Button>
            <IconButton className="info" onClick={() => { history.push(`/movies/${id}`); }} sx={{ color: "gold" }}><InfoIcon /></IconButton>
          </div>
          {show ? <p className="summary"><b>Summary - </b>{summary}</p> : ""}

          <div className="Likes">
            <Badge className="button" badgeContent={likes} color="primary">
              <ThumbUpTwoToneIcon className="like" onClick={() => liking(likes + 1)} />
            </Badge>
            <Badge className="button" badgeContent={disLikes} size="larger" color="error">
              <ThumbDownOffAltTwoToneIcon className="disLike" onClick={() => disliking(disLikes + 1)} />
            </Badge>
          </div>
        </div>
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


function BasicForm({name,trailer,image,rating,summary,id}){
  let history = useHistory();

  const Edits = (values,id) => {
    const editedMovie = values;
    fetch(`https://61c412daf1af4a0017d99281.mockapi.io/movies/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(editedMovie),
        headers: { "Content-Type": "application/json" }
      })
      .then(() => history.push("/movies"));
  };

  const {values,handleChange,handleBlur,handleSubmit,touched,errors} = 
  useFormik({
      initialValues:{name:"",image:"",trailer:"",rating:"",summary:""},
     // validate: validateForm,
     validationSchema: formValidationSchema,

     onSubmit:(values)=>{
         Edits(values,id);
        console.log(values);
     }
    })
  
  return(
    <form onSubmit={handleSubmit}>

      <TextField
      id="name"
      name="name"
      value={name} 
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
      value={image}
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
      value={trailer}
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
      value={rating}
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
      value={summary}
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