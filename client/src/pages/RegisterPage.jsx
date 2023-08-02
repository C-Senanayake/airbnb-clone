import { Link ,useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from 'axios';
function RegisterPage() {
  const navigate = useNavigate();
  const [formData,setFormData] =useState({
    userName:'',
    email:'',
    password:'',
    cPassword:''
  });

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

