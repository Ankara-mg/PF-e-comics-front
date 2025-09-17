import NavBar from "../../components/navBar/Navbar";
import Favorites from "../favorites/Favorites";
import './userprofile.css'

function UserProfile() {
  return (
    <div >
    <NavBar/>
     
     {/* <div className="titulocomics">
     <h1> <b>YOUR FAVORITE COMICS</b>  </h1>
     </div> */}
    
    <Favorites/>
      
        
    </div>
     
  );
}

export default UserProfile;


