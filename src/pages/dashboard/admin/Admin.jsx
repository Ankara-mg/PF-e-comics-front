import {
  RiSearch2Line,
  RiEyeLine,
  RiMoneyDollarCircleLine,
} from 'react-icons/ri'
import {
  MdShoppingCart,
  MdVerifiedUser
} from 'react-icons/md'

import "./Admin.css"

const Admin = () => {
  return (
    <div className="mainAdm">
      <div className="topbar">
        <div className="search">
          <label>
            <input type="text" placeholder='Search...' />
            <RiSearch2Line className='iconL' />
          </label>
        </div>
        <div className='user'>
          <img src="https://i.pinimg.com/474x/6c/4b/c7/6c4bc78afdb8791da5fe508c7ce82337--robot-illustration-mascot-robot.jpg" alt="logo" />
        </div>
      </div>
      <div className="cardBoxDashboard">
        <div className="cardDashboard">
          <div>
            <div className="numbers">1,500</div>
            <div className="cardName">Daily Users</div>
          </div>
          <div className="iconBx">
            <RiEyeLine />
          </div>
        </div>
        <div className="cardDashboard">
          <div>
            <div className="numbers">80</div>
            <div className="cardName">Users Register</div>
          </div>
          <div className="iconBx">
            <MdVerifiedUser />
          </div>
        </div>
        <div className="cardDashboard">
          <div>
            <div className="numbers">203</div>
            <div className="cardName">Comics Selling</div>
          </div>
          <div className="iconBx">
            <MdShoppingCart />
          </div>
        </div>
        <div className="cardDashboard">
          <div>
            <div className="numbers">$5,452</div>
            <div className="cardName">Earning</div>
          </div>
          <div className="iconBx">
            <RiMoneyDollarCircleLine />
          </div>
        </div>
      </div>

      <div className="detail">
        <div className="recentOrders">
          <div className="cardHeader">
            <h2>Recent Orders</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;