import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
function ProfilePage() {
  const navigate = useNavigate();
  const {user,setUser,ready} = useContext(UserContext);
  const {redirect,setRedirect} = useState(null);
  const {readyy,setReadyy} = useState(false);
  let {subpage} = useParams();
  if(subpage===undefined){
    subpage='profile';
  }
  console.log(subpage);

  const logout = ()=>{
    axios.get('/users/logout')
    .then((response)=>{
      console.log(response);
      setUser(null);
      setReadyy(true);
      setRedirect('/');
    })
  }

  
  if(!ready){
    return 'Loading...';
  }
  if(ready && !user && !redirect){
    navigate('/login')
  }
  if(readyy && redirect){
    navigate(redirect);
  }
  return (
    <div>
      <AccountNav/>
      {subpage==='profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br/>
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage==='places' && (
        <PlacesPage/>
      )}
    </div>
  )
}

export default ProfilePage
