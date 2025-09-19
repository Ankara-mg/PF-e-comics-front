import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'
import { creategame } from '../../redux/actions/filters'



export default function Profile() {

  const { user, isAuthenticated, isLoading } = useAuth0()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(creategame(user))
  },)



  if (isLoading) {
    return <div>Loading...</div>
  }

  return (


    isAuthenticated && (
      <div>Profile
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>Email:{user.email}</p>
      </div>
    )
  )
}
