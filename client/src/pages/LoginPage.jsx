import { Link ,useNavigate} from "react-router-dom"
import { useContext, useState } from "react"
import axios from "axios";
import { UserContext } from "../UserContext";
import { BiLogoGoogle } from "react-icons/bi";
import {useGoogleLogin} from '@react-oauth/google';
import jwt_decode from "jwt-decode";
function LoginPage() {
  const navigate = useNavigate();
  const [formData,setFormData]=useState({
    email:'',
    password:''
  })
  const [error,setError] = useState(null);
  const {setUser} = useContext(UserContext);

//   const [error,setError] = useState();

  const {email,password} = formData;

  const onChange = (e)=>{
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
    }))
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(formData);
    setError(null);
    if(!formData.email || !formData.password){
      setError("Require all fields");
    }else{
      axios.post("/users/",formData)
      .then((response)=>{
          console.log(response.data)
          const decoded = jwt_decode(response.data);
          console.log(decoded)
          setUser(decoded);
          // if(response.data.key==="message"){
          //   setError(response.data.value);
          // }
          navigate('/');
        })
        .catch((error) => {
          setError(error.response.data);
          // setError("Registration failed. Please try again later");
          // Handle the error, e.g., display an error message to the user
      });
    }
  }
  const handleGoogleLoginSuccess = (tokenResponse) => {
    console.log("TOken",tokenResponse.access_token);
      axios.post("/users/google",{
      googleAccessToken: tokenResponse.access_token
    })
      .then((response)=>{
          console.log(response.data)
          const decoded = jwt_decode(response.data);
          console.log(decoded)
          setUser(decoded);
          // if(response.data.key==="message"){
          //   setError(response.data.value);
          // }
          navigate('/');
        })
        .catch((error) => {
          setError(error.response.data);
          // setError("Registration failed. Please try again later");
          // Handle the error, e.g., display an error message to the user
      });
  }

  const login = useGoogleLogin({
    onSuccess: tokenResponse => handleGoogleLoginSuccess(tokenResponse),
  });
  return (
    <div className="mt-4 grow flex items-center justify-around">
        <div className="-mt-32">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            {error && <div className="bg-red-600 p-2 text-center text-white font-bold rounded my-2">{error}</div>}
            <form className="max-w-md mx-auto " onSubmit={handleSubmit} >
                <input type="email" name="email" 
                onChange={onChange} 
                value={email} 
                placeholder="Email"/>
                <input type="password" name="password" 
                onChange={onChange} 
                value={password} 
                placeholder="Password"/>
                <button type="submit" className="primary">Login</button>
                <div onClick={() => login()} className="bg-primary p-2 w-full text-white rounded-2xl mt-2 flex items-center justify-center gap-1"><BiLogoGoogle className="text-2xl"/>GoogleLogin</div>
                <div className="text-center py-2 text-gray-500">
                    Do not have an account yet?
                    <Link className="underline text-black" to='/register'>Register now</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage
