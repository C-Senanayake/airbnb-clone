import { Link ,useNavigate } from "react-router-dom"
import { useState ,useContext} from "react";
import { UserContext } from "../UserContext";
import { BiLogoGoogle } from "react-icons/bi";
import {useGoogleLogin} from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import axios from 'axios';
function RegisterPage() {
  const navigate = useNavigate();
  const [formData,setFormData] =useState({
    userName:'',
    email:'',
    password:'',
    cPassword:''
  });

  const {setUser} = useContext(UserContext);
  
  const [error,setError] = useState(null);

  const onChange = (e)=>{
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
    }))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(formData);
    if(!formData.cPassword || !formData.email || !formData.password || !formData.userName){
      setError("Require all the fields!")
    }
    else{
      if(cPassword===password){
          setError(null);
          var updatedFormData = {...formData};
          delete updatedFormData['cPassword'];
          // setFormData(updatedFormData)
          console.log("Updated::",updatedFormData)
          axios.post("/users/register",updatedFormData)
          .then((response)=>{
              console.log("Response::",response)
              navigate('/login');
          })
          .catch((error) => {
              setError(error.response.data);
              // Handle the error, e.g., display an error message to the user
          });  
      }else{
          setError("Passwords do not match")
      }
    }
  }

  // const signInGoogle = (e)=>{
  //   e.preventDefault();
  //   axios.post("/users/google",{
  //     googleAccessToken: accessToken
  //   })
  //     .then((response)=>{
  //         console.log(response.data)
  //         const decoded = jwt_decode(response.data);
  //         console.log(decoded)
  //         setUser(decoded);
  //         // if(response.data.key==="message"){
  //         //   setError(response.data.value);
  //         // }
  //         navigate('/');
  //       })
  //       .catch((error) => {
  //         setError(error.response.data);
  //         // setError("Registration failed. Please try again later");
  //         // Handle the error, e.g., display an error message to the user
  //     });
  // }
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

  const {userName,email,password,cPassword} = formData;
  return (
    <div className="mt-4 grow flex items-center justify-around">
        <div className="-mt-32">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            {error && <div className="bg-red-600 p-2 text-center text-white font-bold rounded my-2">{error}</div>}
            <form className="max-w-md mx-auto " onSubmit={handleSubmit}>
                <input type="text" name="userName" value={userName}  onChange={onChange} placeholder="Chamath Senanayake"/>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Email"/>
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Password"/>
                <input type="password" name="cPassword" value={cPassword} onChange={onChange} placeholder="Confirm Password"/>
                <button className="primary">Register</button>
                <div onClick={() => login()} className="bg-primary p-2 w-full text-white rounded-2xl mt-2 flex items-center justify-center gap-1"><BiLogoGoogle className="text-2xl"/>GoogleLogin</div>
                <div className="text-center py-2 text-gray-500">
                    Already a memebr?
                    <Link className="underline text-black" to='/login'>Login</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegisterPage;

