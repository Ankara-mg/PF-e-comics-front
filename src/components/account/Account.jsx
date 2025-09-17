import { Link, useNavigate } from "react-router-dom";

import { useAuth0 } from '@auth0/auth0-react';
import Profile from '../login/Profile'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuthContext } from '../../context/authContext'
import "./Account.css"



const Account = () => {
  const { logout } = useAuthContext();
  // const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth0()

  function Logout() {
    logout()
    navigate('/home')

  }
  const rol = JSON.parse(localStorage.getItem("ROL"))
 
  return (
    <NavDropdown title="Account" id="navbarScrollingDropdown">
      <div className='login-style d-flex ps-3'>
        <span className="material-symbols-outlined" >
          account_circle
        </span>
        <span className='ms-2'>
          {/* <Login /> */}

          {isAuthenticated ? (
            <>
              <Profile />
            </>
          ) : (

              localStorage.getItem("token")?
              <span>
                {localStorage.getItem("user").replace(/['"]+/g, '')}
              </span>:
              <Link to={'/login'}>
                <span>login</span>
              </Link>



              // <ModalLogin/>

          )}
        </span>
      </div>

      {/* loa favoritoas van a estar en el panel de administracion  y el libro no tiene funcionalidad*/}
      {/* <NavDropdown.Item href="#action5" className='d-flex'>
        <span className="material-symbols-outlined">
          book
        </span>

        <span className='ms-2'>
          <Link to='/fav'><button>perfil</button></Link>
        </span>

      </NavDropdown.Item> */}

      {/* si se da click al boton con el nombre ya lleva el panel, ya sea de usuario o de admin */}
      <NavDropdown.Item href="#" className='d-flex'>
      {rol&&
        <span className="material-symbols-outlined">
          dashboard
        </span>
      }
      {rol&&
        <span className='ms-2'>
          <Link to='/user/purchases'>
           <p>My comics</p>
          </Link>
        </span>
        }
        

      </NavDropdown.Item>
      
      <NavDropdown.Item href="#" className='d-flex'>
      {rol&&
        <span className="material-symbols-outlined">
          dashboard
        </span>
      }
      {rol&&
          <span className='ms-2'>
          <Link to='/user/fav'>
           <p>Favorites</p>
          </Link>
        </span>
      }
        
      
      
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={() => Logout()} className='d-flex'>


        {/* {rol ? 
          <Link to = '/user/logout'  >
          <span className='ms-2 '>
          Exit
          </span>
          </Link>:
          null
          }
         */}
         <div>
        {rol &&
          <span className='ms-2 '>
            Exit
          </span>}
         </div>




      </NavDropdown.Item>
    </NavDropdown >
  )
}

export default Account;