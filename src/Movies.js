import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { NavBar } from './NavBar';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import Badge from '@mui/material/Badge';
import ThumbDownOffAltTwoToneIcon from '@mui/icons-material/ThumbDownOffAltTwoTone';
import { themeCtx } from './App';
import { API } from "./API";

//movies component
export function Movies() {
  const [list, addingToList] = useState([]);

  // console.log(list);

  const user_auth = sessionStorage.getItem("user_auth");

  const getList = () => {
    fetch(`${API}/movies`, { method: "GET",headers:{user_auth} })
      .then((data) => data.json())
      .then((movies) => addingToList(movies))
      .catch((e)=>alert(e.message));
  };
  const DeleteItem = (id) => {
    //  const listAfterDelete =  list.filter((movie,id)=>(id!==index));
    //  deleting([...listAfterDelete]);
    //   console.log("moviedeleted");
    fetch(`${API}/movies/${id}`, { method: 'DELETE' })
      .then((data) => data.json())
      .then(() => getList());
  };
  useEffect(getList, [user_auth]);


  const [theme] = useContext(themeCtx);
  const style = (theme) ? "overallBlack" : "overallWhite";
  return (
    <>
     <NavBar/>
    <div className={style}>
      
      {(list.length > 0)
          ? list.map(({ id, name, poster, summary }, index) => <EachMovie key={index} id={id} name={name} poster={poster} summary={summary} delFunc={DeleteItem} />)
          :""
        }
    </div>
    </>
  );
}
function EachMovie({ id, name, poster, summary, delFunc }) {

  const navigate = useNavigate();
  const [show, showing] = useState(false);

  const [likes, liking] = useState(Math.random().toFixed(1) * 10);
  const [disLikes, disliking] = useState(Math.random().toFixed(1) * 10);


  // const check = (rating >= 8.5) ? "green" : (rating > 4.5) ? "yellow" : "red";
  // const style = (check === "green") ? { background: "green", color: "white" } : (check === "yellow") ? { background: "yellow", color: "black" } : { background: "red", color: "white" };
  // const check1 = (rating >= 8.5) ? "😀" : (rating >= 4.5) ? "🙂" : "😒";
  return (
    <>
    <div className="card">
      <img src={poster} alt={name}></img>
      <div className="nameAndRAndD" style={{display:"flex"}}>
        <div className="nameAndR">
          <h1>{name}</h1>
          {/* <p className="rating">{check1}<span style={style}>{rating}</span></p> */}
        </div>
        {/* <div style={{marginLeft:"auto"}}>
           <IconButton className='delete' color="error" onClick={() => navigate(`/movie-edit/${id}`)} >
              <EditOutlinedIcon sx={{ color: "red" }} />
           </IconButton>

           <IconButton className="delete" aria-label="delete" size="large" onClick={() => delFunc(id)}>
             <DeleteTwoToneIcon className="deleteColor" sx={{ color: "red" }} />
           </IconButton>
        </div> */}
      </div>

      <div className="buttons">

        <Button className="spoiler" onClick={() => { showing(!show); }} variant="contained" sx={{ color: "#0088f8", background: "gold" }}>Short Spoiler?👀</Button>

      </div>
      {show ? <p className="summary"><b>Summary - </b>{summary}</p> : ""}

      <div className="Likes">

        <Badge className="button" badgeContent={likes} color="primary">
          <ThumbUpTwoToneIcon className="like" onClick={() => liking(likes + 1)} />
        </Badge>

        <Button className="info" onClick={() => { navigate(`/movies/${id}`); }} >
            Review
        </Button>
      
        <Badge className="button" badgeContent={disLikes} size="larger" color="error">
          <ThumbDownOffAltTwoToneIcon className="disLike" onClick={() => disliking(disLikes + 1)} />
        </Badge>
      </div>
    </div>
    </>);
}
