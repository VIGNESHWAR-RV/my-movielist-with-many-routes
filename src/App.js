
import './App.css';
//for hooks
import {useState} from 'react';
//for router
import {Link,Redirect} from 'react-router-dom';
//for-context
import {createContext} from 'react';

//for-animation
import 'animate.css';
// material-UI
import { NavBar } from './NavBar';





// function Theming(){
//   const [theme] = useContext(themeCtx);
//   return(
//     <div>
        
//         {(theme)?<img src="https://wallpapercave.com/wp/Om3yOQJ.jpg" alt=""></img>:<img src="https://www.pixelstalk.net/wp-content/uploads/2016/09/Hi-Resolution-All-White.jpeg" alt=""></img>}
//     </div>
//   )
// }

// //ColorGame -  component
// function ColorGame(){
//   const[colorList,addColor]=useState(["green","blue","gold","red"]);
//     const[color,setColor]=useState("orange");
//     const [theme] = useContext(themeCtx);
//   const style={background:(theme)?"black":"white",color:(theme)?"white":"black"};
//   return(
//     <div style={style}>
//        <input  style={{background:color}} placeholder="enter the value" onChange={(event)=>setColor(event.target.value)} value={color}/>
//        <button onClick={()=>addColor([...colorList,color])}>Add Color</button>
//        {colorList.map((color,index)=><Color key={index} value={color}/>)}
//     </div>
//   );
// }

// function Color({value}){
//       return(
//         <div style={{width:"10rem",height:"10rem",background:(value)}}>
//         </div>
//       )
// }

function App() {

//   const movies =
//  [{id:"100",name:"RRR",trailer:"https://www.youtube.com/embed/NgBoMJy386M",
//  image:"https://www.filmibeat.com/ph-big/2021/12/rrr_163903031450.jpg",
//  rating:9,
//  summary:"A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920's."},
//  {id:"101",name:"Bahubhali-2",trailer:"https://www.youtube.com/embed/G62HrubdD6o",
//  image:"https://wallpapercave.com/dwp2x/wp4027395.jpg",
//  rating:8.5,
//  summary:"When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom."},
//  {id:"102",name:"Bahubhali-1",trailer:"https://www.youtube.com/embed/sOEg_YZQsTI",
//  image:"https://wallpapercave.com/dwp2x/wp1851939.jpg",
//  rating:8,
//  summary:"In ancient India, an adventurous and daring man becomes involved in a decades-old feud between two warring peoples."},
//  {id:"103",name:"Naan-E",trailer:"https://www.youtube.com/embed/q4h_e3RO_Ck",
//  image:"https://wallpapercave.com/wp/wp7489196.jpg",
//  rating:7,
//  summary:"Since the head of a housefly is made up almost entirely of eye and very little muscle, conveying emotion as the fly was extremely difficult."},
//  {id:"104",name:"Maveeran",trailer:"https://www.youtube.com/embed/f6g2TLmiG8Q",
//  image:"http://i.indiglamour.com/photogallery/tamil/movies/2011/may10/Maaveeran/wide/Maaveeran_5715.jpg",
//  rating:4,
//  summary:"A warrior gets reincarnated 400 years later, after trying to save the princess and the kingdom, who also dies along with him. He then sets back again to fight against all odds and win back his love."},
//  ];


 const [theme, setTheme] = useState(false);

  return (
    <themeCtx.Provider value={[theme, setTheme]}>
    <div className="App">
       <NavBar/>
    </div>
    </themeCtx.Provider>
  );
}


export default App;
export const themeCtx = createContext(null);