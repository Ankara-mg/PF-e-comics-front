import { useAuthContext } from '../../context/authContext';
import { useEffect } from 'react';

export default function Logout() {
  const {logout} = useAuthContext();
 
    useEffect(() => {
      localStorage.clear()
      logout() 
      
    })
    return null  
}
