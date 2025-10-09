import { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { changeUserRole, setUserActive } from "@redux/actions/admin";
import { Card, Col, Row } from 'react-bootstrap';
import "./TableUsers.css"

const TableUsers = ({ data }) => {
  const dispatch = useDispatch();
  const [userid, SetUserid] = useState("")
  const selectElement = useRef();

  const headers_users = ["Email", "Username", "Rol", "Active"]
  const { email, username, rol, active } = data
  const data_users = [email, username]
  const rol_options = ["USER", "ADMIN"]

  const currentUser = (data) => {
    SetUserid(() => data.id)
  }

  const handleSelect = () => {
    const value = selectElement.current.value;
    const params = {
      "id_user": userid,
      "rol": value
    }
   
    dispatch(changeUserRole(params))
  };

  const handleToggle = (e) => {
    const checkbox = e.target.checked;
    const params = {
      "id_user": userid,
      "active": checkbox
    }

    dispatch(setUserActive(params))
  }

  return (
    <div onClick={() => currentUser(data)}>
      <Card className='user-card'>
        <Row className='border-bottom pb-2 user-card-headers'>
          {
            headers_users?.map((header) => (
              <Col key={header} md={3} className="col-item">
                <span >
                  {header}
                </span>
              </Col >
            ))
          }
        </Row>

        <Row className='mt-2'>
          {
            data_users?.map(data => (
              <Col key={data} md={3} className="col-item my-1 px-3">
                <span >
                  {data}
                </span>
              </Col >
            ))
          }
          <Col md={3} className="col-item my-1 px-3">
            <select className='select' ref={selectElement} defaultValue={rol} onChange={(e) => handleSelect(e)}>
              {
                rol_options?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))
              }
            </select>
          </Col >
          <Col md={2} className="col-item my-1 px-3">
            <label className="switch">
              <input type="checkbox" defaultChecked={active} onChange={handleToggle} />
              <span className="slider round"></span>
            </label>
          </Col >
        </Row>
      </Card>
    </div>
  );
};

export default TableUsers;