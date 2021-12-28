import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import Badge from '@mui/material/Badge';
import ThumbDownOffAltTwoToneIcon from '@mui/icons-material/ThumbDownOffAltTwoTone';
import { themeCtx } from './App';

//movies component
export function Movies() {
  const [list, addingToList] = useState([]);

  const getList = () => {
    fetch("https://61c412daf1af4a0017d99281.mockapi.io/movies", { method: "GET" })
      .then((data) => data.json())
      .then((movies) => addingToList(movies));
  };
  const DeleteItem = (id) => {
    //  const listAfterDelete =  list.filter((movie,id)=>(id!==index));
    //  deleting([...listAfterDelete]);
    //   console.log("moviedeleted");
    fetch(`https://61c412daf1af4a0017d99281.mockapi.io/movies/${id}`, { method: 'DELETE' })
      .then((data) => data.json())
      .then(() => getList());
  };
  useEffect(getList, []);


  const [theme] = useContext(themeCtx);
  const style = (theme) ? "overallBlack" : "overallWhite";
  return (
    <div className={style}>
      {list.map(({ id, name, image, rating, summary }, index) => <EachMovie key={index} id={id} name={name} image={image} rating={rating} summary={summary} delFunc={DeleteItem} />)}
    </div>
  );
}
function EachMovie({ id, name, image, rating, summary, delFunc }) {
  const history = useHistory();
  const [show, showing] = useState(false);

  const [likes, liking] = useState(Math.random().toFixed(1) * 10);
  const [disLikes, disliking] = useState(Math.random().toFixed(1) * 10);

  const check = (rating >= 8.5) ? "green" : (rating > 4.5) ? "yellow" : "red";
  const style = (check === "green") ? { background: "green", color: "white" } : (check === "yellow") ? { background: "yellow", color: "black" } : { background: "red", color: "white" };
  const check1 = (rating >= 8.5) ? "😀" : (rating >= 4.5) ? "🙂" : "😒";
  return (
    <div className="card">
      <img src={image} alt={name}></img>
      <div className="nameAndRAndD">
        <div className="nameAndR">
          <h1>{name}</h1>
          <p className="rating">{check1}<span style={style}>{rating}</span></p>
        </div>
        <IconButton className="delete" aria-label="delete" size="large" onClick={() => delFunc(id)}>
          <DeleteTwoToneIcon className="deleteColor" sx={{ color: "red" }} />
        </IconButton>
      </div>

      <div className="buttons">
        <Button className="spoiler" onClick={() => { showing(!show); }} variant="contained" sx={{ color: "#0088f8", background: "gold" }}>Spoiler?👀</Button>
        <IconButton className="info" onClick={() => { history.push(`/movies/${id}`); }} sx={{ color: "gold" }}><InfoIcon /></IconButton>
        <Button className='Edit' color="error" onClick={() => history.push(`/movie-edit/${id}`)}><EditOutlinedIcon/></Button>
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
    </div>);
}
