import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../../redux/actions/admin";
import TableUsers from './TableUsers';
import "./Users.css"



const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div className='mainAdm'>
      <h2>Users</h2>
      {
        users?.map(user => (
          <TableUsers key={user.id} data={user} />
        ))
      }
    </div>
  );
};


export default Users;