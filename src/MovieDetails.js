import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { themeCtx } from './App';
import Card  from '@mui/material/Card';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import { API } from './API';
import { NavBar } from './NavBar';

//movieDetails component
export function MovieDetails() {


  const { id } = useParams();

  const [movie, setMovie] = useState("");
  const [triggerUpdate,setTriggerUpdate] = useState(false);
  const [userReview,setUserReview] = useState("");
  const [showInput,setShowInput] = useState(true);

  const getMovies = () => {
    const user_auth = sessionStorage.getItem("user_auth");
    fetch(`${API}/movies/${id}`, { method: "GET",headers:{user_auth} })
      .then((data) => data.json())
      .then((movie) => {
          //  console.log(movie);
          if(movie.userReview !== "" && movie.userReview !== undefined && movie.userReview !== null){    
            setUserReview(movie.userReview);
            setShowInput(false);
          }
            setMovie(movie);
        });
  };

  useEffect(getMovies, [id,triggerUpdate]);


  const handleReviewChange = (e)=>{
    setUserReview(e.target.value);
  }

  const reviewSubmit=()=>{
     
    if(userReview !== "" && userReview !== null && userReview !== undefined){
        async function submit(){
          const user_auth = sessionStorage.getItem("user_auth");
          const response =  await fetch(`${API}/movies/${id}`,{method:"PUT",body:JSON.stringify({userReview}),headers:{"Content-Type": "application/json",user_auth}})
          if(response.status === 200){
             setShowInput(false);
             setTriggerUpdate(prevState=>!prevState);
          }else{
             alert("error while updating review,please try again later");
          }
        }  
         submit();
    }
    else{
       alert("please enter a valid review to submit");
    }

  }

  const [theme] = useContext(themeCtx);
  const style = (theme) ? "overallMovieBlack" : "overallMovieWhite";
  return (
    <>
    <NavBar/>
    <div className={style}>
      <div className="movieDetail">

        {(movie !== "")
          ? <div className="movieDetails">
              <iframe src={movie.trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              <h1>{movie.name}</h1>
              <h2><b>IMDB -</b> {movie.rating}⭐</h2>
              <p><b>Summary -</b> {movie.summary}</p>
            </div>
          :<></>}

          {(movie !== "")
            ? <div className='movieReviews'>
                 <h1 className='reviewHeading'><i>Reviews</i></h1>
                 <div className="reviewBox">
                   { (movie?.reviews?.length > 0)
                        ? movie.reviews.map((review,index)=>
                            <Card key={index} className="reviewCard">
                                <h2 className="reviewUserName">{review.userName}</h2>
                                <p className='reviewText'>{review.text}</p>
                            </Card>)
                        : <h3 style={{textAlign:"center",margin:"25%"}}>Be the first one to review😀</h3>}
                 </div>
                 {((userReview !== "" && showInput) || userReview==="")
                   ? <div className='reviewInputBox'>
                          <textarea 
                             placeholder='Write your thoughts here'
                             value={userReview}
                             onChange={handleReviewChange}>
                          </textarea>
                          <IconButton onClick={reviewSubmit}>
                              <SendIcon/>
                          </IconButton>
                     </div>
                   : <Button className="editReview" onClick={()=>setShowInput(true)}>
                        Edit Review
                     </Button>}
              </div>
            :<></>}

      </div>
    </div>
    </>);
}
