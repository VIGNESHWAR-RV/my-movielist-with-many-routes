import { useNavigate } from 'react-router-dom';
import { useContext,useEffect,useState } from 'react';
import { themeCtx } from './App';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { API } from './API';

//home componenet
export function Login() {

  
  useEffect(()=>{

    function start(){
     
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope:""
      })
    }
     
    gapi.load("client:auth2",start);
  },[])


  const [theme] = useContext(themeCtx);
  const style = (theme) ? "blackHome" : "whiteHome";
  return (

    <div className={style}>
       <div className=" animate__animated animate__bounceInDown">
        <h1>Welcome Back, User</h1>

           <div className='loginFormOuterDiv'>
             <GoogleLoginBox/>
             <hr/>
             <LoginForm/>
           </div>

      </div>
    </div>

  );
}




function GoogleLoginBox(){

  const navigate = useNavigate();


  const handleSuccess=(res)=>{
    const {email,name,imageUrl,googleId } = res.profileObj;
    const body = {email,name,imageUrl,googleId};
    console.log(body);
    async function login(body){

       const response = await fetch(`${API}/login`,{method:"POST",
                                                    headers:{"Content-Type":"application/json"},
                                                    body:JSON.stringify(body)});

       const data = await response.json();

        if(response.status === 200){
            sessionStorage.setItem("user_auth",data.token);
            navigate("/movies");
            return;
        }
        else{
          alert("something went wrong while signing up");
          return;
        }
    }
    login(body);
  }

  const handleFailure=(res)=>{
     alert("Login attempt is cancelled");
  }

  return(
    <Box>
       <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Login With Google"
              // render={(renderProps)=>(
              //   <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
              //       LoginWithGoogle
              //   </button>
              // )}
              onSuccess={handleSuccess}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
              style={{ marginTop: '100px' }}
              isSignedIn={false}
          ></GoogleLogin>
    </Box>
  )
}

function LoginForm(){

  const navigate = useNavigate();

  const [userName,setUserName] = useState("");
  const [email,setEmail] = useState("");



  const handleSubmit=(e)=>{
      e.preventDefault();
      const body = {userName,email};

      async function login(body){

        const response = await fetch(`${API}/login`,{method:"POST",
                                                     headers:{"Content-Type":"application/json"},
                                                     body:JSON.stringify(body)});
 
        const data = await response.json();
 
         if(response.status === 200){
             sessionStorage.setItem("user_auth",data.token);
             navigate("/movies");
             return;
         }
         else{
           alert("something went wrong while signing up");
           return;
         }
     }
     login(body);

  }

  return(
    <>
    <form onSubmit={handleSubmit}>

      <input type="text" 
             required 
             pattern='^[A-Za-z0-9.,- ]{2,}$'
             value={userName} 
             onChange={(e)=>setUserName(e.target.value)}
             placeholder='Enter your User Name'/>

      <br/>

      <input type="email" 
             required 
             pattern='^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$' 
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             placeholder='Enter your registered email'
             />

      <br/>

      <Button type="submit">Login</Button>

      <div style={{display:"flex",alignItems:"center"}}>
         <h3><i>New User??</i></h3>
         <Button type="button" onClick={()=>navigate("/signup")}>Sign Up</Button>
      </div>

    </form>
    </>
  )
}