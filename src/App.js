
import './App.css';
//for hooks
import {useState} from 'react';
//for router
import {Route,Link,Switch,Redirect,useHistory,useParams} from 'react-router-dom';

//for-animation
import 'animate.css';
// material-UI
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import {createContext,useContext} from 'react';

//MUI-for navBar component
// import IconButton from '@mui/material/IconButton';
// import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

//MUI-for EachMovie component
// import InfoIcon from '@mui/icons-material/Info';
// import IconButton from '@mui/material/IconButton';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

//MUI- for Movie List component



//navbar component
function NavBar({movies,adding}){
  const [theme, setTheme] = useContext(themeCtx);
  const history = useHistory();
  return(<div>
  <AppBar className="appbar" position="static" sx={(theme)?{background:"gold",color:"black"}:{background:"#0088f8",color:"white"}}>
    <Toolbar>
      <div>
      <Button color="inherit" variat="text" onClick={()=>history.push(`/`)} >
         <span className="animate__animated animate__bounceInLeft animate__slow	">Home</span>
      </Button>
      <Button color="inherit" variant="text" onClick={()=>history.push(`/movies`)} >
         <span className="animate__animated animate__bounceInLeft animate__slow	">Movies</span> 
      </Button>
      <Button color="inherit" variant="text" onClick={()=>history.push(`/addMovie`)} >
         <span className="animate__animated animate__bounceInLeft animate__slow	">Add Movies</span>
      </Button>
      <Button color="inherit" variant="text" onClick={()=>history.push(`/TicTacToe-Game`)} >
      <span className="animate__animated animate__bounceInLeft animate__slow ">TicTacToe Game</span> 
      </Button>
      </div>
      <div className="theming">
      <button onClick={()=>setTheme(!theme)}>checking theme</button>
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
             <Home/>
         </Route>
         <Route exact path="/movies">
            <Movies list={movies} deleting={adding}/>
         </Route>
         <Route exact path="/movies/:id">
            <MovieDetails list={movies}/>
         </Route>
         <Route exact path="/addMovie">
             <AddMovie list={movies} addingToList={adding}/>
         </Route>
         <Route exact path="/themes">
              <Theming/>
         </Route>
         <Route exact path="/TicTacToe-Game">
               <TicTacToeGame/>
         </Route>
         <Route exact path="/Color-Game">
               <ColorGame/>
         </Route>
         <Route path="**">
              <h1>404 thala!</h1>
              <img src="https://www.bing.com/th/id/OGC.32302a413d868359b8cc10dafaa069bd?pid=1.7&rurl=https%3a%2f%2fcdn.wallpapersafari.com%2f31%2f5%2fRuyK1a.gif&ehk=PPh%2bqZiGwpWEumoNT64vnt0Rj02XTgXQp9dtSTMXUrQ%3d" alt=""></img>
         </Route>
       </Switch>
  </div>)
}

//home componenet
function Home(){
  const history = useHistory();
  const [theme] = useContext(themeCtx);
  const style=(theme)?"blackHome":"whiteHome";
  return(
  <div className={style}>
    <span className=" animate__animated animate__headShake animate__infinite	infinite"><b>Hiii , Guest!!!</b></span>
    <div className="animate__animated animate__lightSpeedInRight ">
    <h1 >What are you Looking for???</h1><button onClick={()=>history.push(`/movies`)}>Movies?</button> (or) <button onClick={()=>history.push(`/TicTacToe-Game`)}>game?</button>
    </div>
  </div>)
}

function Theming(){
  const [theme] = useContext(themeCtx);
  return(
    <div>
        
        {(theme)?<img src="https://wallpapercave.com/wp/Om3yOQJ.jpg" alt=""></img>:<img src="https://www.pixelstalk.net/wp-content/uploads/2016/09/Hi-Resolution-All-White.jpeg" alt=""></img>}
    </div>
  )
}

//movies component
function Movies({list,deleting}){
  const DeleteItem=(index)=>{
     const listAfterDelete =  list.filter((movie,id)=>(id!==index));
     deleting([...listAfterDelete]);
      console.log("moviedeleted");
  }
  const [theme] = useContext(themeCtx);
  const style = (theme)?"overallBlack":"overallWhite";
  return(
    <div className={style}>
       {list.map(({name,image,rating,summary},index)=><EachMovie key={index} id={index} name={name} image={image} rating={rating} summary={summary} delFunc = {DeleteItem}/>)}
    </div>
  );
}

function EachMovie({id,name,image,rating,summary,delFunc}){
  const history = useHistory();
  const [show,showing]= useState(false);

  const[likes,liking]=useState(Math.random().toFixed(1)*10);
  const[disLikes,disliking]=useState(Math.random().toFixed(1)*10);

  const check=(rating>=8.5)?"green" : (rating>4.5)?"yellow" :"red";
  const style=(check==="green")?{background:"green",color:"white"} : (check==="yellow")? {background:"yellow",color:"black"} :  {background:"red",color:"white"} ;
  const check1=(rating>=8.5)?"😀" : (rating>=4.5)? "🙂": "😒" ;
  return(
  <div className="card">
       <img src={image} alt={name}></img>
   <div className="nameAndRAndD">
     <div className="nameAndR">
         <h1>{name}</h1>
         <p className="rating">{check1}<span style={style}>{rating}</span></p>
     </div>
    <IconButton className="delete"  aria-label="delete" size="large" onClick={()=>delFunc(id)}>
         <DeleteTwoToneIcon className="deleteColor" sx={{color:"red"}} />
    </IconButton>
  </div>

    <div className="buttons">
    <Button className="spoiler" onClick={()=>{showing(!show);}} variant="contained" sx={{color:"#0088f8",background:"gold"}}>Spoiler?👀</Button>
    <IconButton className="info" onClick={()=>{history.push(`/movies/${id}`)}} sx={{color:"gold"}}><InfoIcon/></IconButton>
    </div>
      {show ?<p className="summary"><b>Summary - </b>{summary}</p>: ""}
   
      <div className="Likes">
    <Button variant="contained" onClick={()=>liking(likes+1)}>👍{likes}</Button>
    <Button variant="contained" color="error" onClick={()=>disliking(disLikes+1)}>👎{disLikes}</Button>
    </div>
  </div>);
}

//addMovie component
function AddMovie({list,addingToList}){
   const history = useHistory();
   const[name,naming]=useState("Name");
   const[image,imaging] = useState("ThumbNail");
   const[rating,rate]=useState("Rating");
   const[summary,story]=useState("Summary");

   const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
      borderColor: 'white',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: '#0088f8',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  });
  
   function CustomizedInputs({value,onChange}) {
    return (
     
        
        <ValidationTextField
          className="form-control"
          label={value}
          required
          variant="outlined"
          onChange={onChange}
          id="validation-outlined-input"
        />
    );
  }

   return(
    <div>
    <div className="addMovie">
      <Box component="form" noValidate sx={{ display: 'grid', gridTemplateColumns:"1fr", gap: 0.5, padding:"0.5rem" }}>   
        <h3 style={{color:"#0088f8"}}>Add your Favourite Movie too!!!</h3>
        <FormControl variant="standard">
        </FormControl>
        <CustomizedInputs value={name} onChange={(event)=>{naming(event.target.value);}}/>
    
        <FormControl variant="standard">
        </FormControl>
        <CustomizedInputs value={image} onChange={(event)=>{imaging(event.target.value);}}/>
       
        <FormControl variant="standard">
        </FormControl>
        <CustomizedInputs value={rating} onChange={(event)=>{rate(event.target.value);}}/>
    
        <FormControl variant="standard">
        </FormControl>
        <CustomizedInputs value={summary} onChange={(event)=>{story(event.target.value);}}/>
    
       <Button onClick={()=> {const newMovie={name,image,rating,summary};(name!=="Name" && image!=="ThumbNail" && rating!=="Rating" && summary!=="Summary" )?(addingToList([...list,newMovie])):alert("enter the details to add");(name!=="Name" && image!=="ThumbNail" && rating!=="Rating" && summary!=="Summary" )?history.push("/movies"):alert("Enter the details to add");}} variant="contained"   >Add Movie</Button>
       <Button variant="contained" color="error" onClick={()=>{addingToList([...list]); history.push("/movies");}}>Cancel</Button>
       
     </Box>
    </div>
    </div>);
}

//movieDetai component
function MovieDetails({list}){
  let {id}=useParams();
  let movieViewed = list[id];
  const [theme] = useContext(themeCtx);
  const style = (theme)?"overallBlack":"overallWhite";
  return(
    <div className={style}>
  <div className="movieDetail">
    <div className="movieDetails">
    <iframe width="640" height="360" src={movieViewed.trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    <h1>{movieViewed.name}</h1>
    <h2><b>IMDB-</b>{movieViewed.rating}⭐</h2>
    <p><b>Summary-</b>{movieViewed.summary}</p>
    </div>
  </div>
  </div>);
}

//TicTacToe-Game componenet
function TicTacToeGame(){
   const initialValue = [null, null, null, null, null, null,null, null, null];
   const [gameBoard,setGameBoard] = useState(initialValue);
   const [turn,changeTurn] = useState("");
   const { width, height } = useWindowSize();
   const [theme] = useContext(themeCtx);
   const style1 = (theme)?"overallBlackGame":"overallWhiteGame";

   const change=(index)=>{
     if( !winner  && !gameBoard[index] && turn!==""){
         const gameBoardCopy = [...gameBoard];
         gameBoardCopy[index]=(turn)?"X":"O";
         changeTurn(!turn);
         setGameBoard([...gameBoardCopy]);
     }
   }; 

   const winningCondition = (gameBoard)=>{
     const requirement = [
       [0,1,2],[3,4,5],
       [6,7,8],[0,3,6],
       [1,4,7],[2,5,8],
       [0,4,8],[2,4,6]
     ];

      for(let i of requirement){
        const [a,b,c] = i;
        if(gameBoard[a]!==null && gameBoard[a]===gameBoard[b] && gameBoard[a]===gameBoard[c]){
          return gameBoard[a];
        }
      }
      return null;
   };
    const winner = winningCondition(gameBoard);

    const [hide,setHide]=useState(false);
    const style = {display:(hide)?"none":"block"};

   return(
    <div className={style1} >
      <div>
      <h1 style={{textAlign:"center"}}><b className="childHood">Lets Bring BACK the CHILDHOOD!!!</b></h1> 
      </div>
       <div  style={style}>
         <div className="selecting-portion">
         <h2>Select ONE</h2>
         <div>
         <button style={{color:"#0088f8"}} onClick={()=>{changeTurn(true);setHide(true)}}>X</button>
         <button style={{color:"gold"}} onClick={()=>{changeTurn(false);setHide(true)}}>O</button>
         </div>
        </div>
       </div>
       {(turn===true && !winner)?<h1 className='indicators' style={{color:"#0088f8"}}>Its X's turn </h1>:(turn===false && !winner)?<h1 className='indicators' style={{color:"gold"}}>Its O's turn</h1>:""}
       <div className="overallWinner">
    {(winner) ?<div className="resultAndReset"><Confetti width={width} height={height} /><h2>Winner ~ <b style={{color:"red",fontSize:"4rem"}}>{winner}</b></h2><button onClick={()=>{setGameBoard(initialValue);setHide(false);changeTurn("")}}>Play Again</button></div>:""}
       </div>
       <div className="tictactoe-gameBox">
       <div className="tictactoe-game">
          {gameBoard.map((val,index)=>{return <BoxesInGame key={index} val={val} playerChange={()=>change(index)}  />})}
       </div>
       </div >
     </div>
   )
}

function BoxesInGame({val,playerChange}){
  const style = {color:(val==="X")?"#0088f8":"gold"}

return(
  <div>
    <button style={style} className="game-buttons" onClick={()=>playerChange()}>{val}</button>
    
  </div>
)
}

//ColorGame -  component
function ColorGame(){
  const[colorList,addColor]=useState(["green","blue","gold","red"]);
    const[color,setColor]=useState("orange");
    const [theme, setTheme] = useContext(themeCtx);
  const style={background:(theme)?"black":"white",color:(theme)?"white":"black"};
  return(
    <div style={style}>
       <input  style={{background:color}} placeholder="enter the value" onChange={(event)=>setColor(event.target.value)} value={color}/>
       <button onClick={()=>addColor([...colorList,color])}>Add Color</button>
       {colorList.map((color,index)=><Color key={index} value={color}/>)}
    </div>
  );
}

function Color({value}){
      return(
        <div style={{width:"10rem",height:"10rem",background:(value)}}>
        </div>
      )
}

const themeCtx = createContext(null);

function App() {

  const movies =
 [{name:"RRR",trailer:"https://www.youtube.com/embed/NgBoMJy386M",
 image:"https://www.filmibeat.com/ph-big/2021/12/rrr_163903031450.jpg",
 rating:9,
 summary:"A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920's."},
 {name:"Bahubhali-2",trailer:"https://www.youtube.com/embed/G62HrubdD6o",
 image:"https://wallpapercave.com/dwp2x/wp4027395.jpg",
 rating:8.5,
 summary:"When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom."},
 {name:"Bahubhali-1",trailer:"https://www.youtube.com/embed/sOEg_YZQsTI",
 image:"https://wallpapercave.com/dwp2x/wp1851939.jpg",
 rating:8,
 summary:"In ancient India, an adventurous and daring man becomes involved in a decades-old feud between two warring peoples."},
 {name:"Naan-E",trailer:"https://www.youtube.com/embed/q4h_e3RO_Ck",
 image:"https://wallpapercave.com/wp/wp7489196.jpg",
 rating:7,
 summary:"Since the head of a housefly is made up almost entirely of eye and very little muscle, conveying emotion as the fly was extremely difficult."},
 {name:"Maveeran",trailer:"https://www.youtube.com/embed/f6g2TLmiG8Q",
 image:"http://i.indiglamour.com/photogallery/tamil/movies/2011/may10/Maaveeran/wide/Maaveeran_5715.jpg",
 rating:4,
 summary:"A warrior gets reincarnated 400 years later, after trying to save the princess and the kingdom, who also dies along with him. He then sets back again to fight against all odds and win back his love."},
 ];

 const [list,addingToList]=useState(movies);

 const [theme, setTheme] = useState(false);


  return (
    <themeCtx.Provider value={[theme, setTheme]}>
    <div className="App">
       <NavBar movies={list} adding={addingToList}/>
    </div>
    </themeCtx.Provider>
  );
}

export default App;


