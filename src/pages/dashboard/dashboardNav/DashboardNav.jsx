import { useEffect } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import {
  RiUser3Fill,
  RiLogoutBoxRLine,
  RiUpload2Line,
} from 'react-icons/ri'

import './DashboardNav.css'

const DashboardNav = () => {
  useEffect(() => {

    let list = document.querySelectorAll('.navAdm ul li')

    list.forEach(elem => {
      elem.addEventListener("click", () => {
        elem.classList.add("selected")
        list.forEach(elem => {
          elem.classList.remove("selected")
        })

      })
    })

    // function activeLink() {
    //   list.forEach((item) =>
    //     item.classList.remove('hovered'))
    //   this.classList.add('hovered');
    // }
    // list.forEach((item) =>
    //   item.addEventListener('mouseover', activeLink))
  })

  return (
    <div className="contAdm">
      <div className='navAdm'>
        <ul>
          <li className='mt-2'>
            {/* no importa esta ruta */}
            <Link to={"/"}>
              <span className='icon'>
                <span className="material-symbols-outlined pt-2" style={{ fontSize: '2.5rem' }}>
                  admin_panel_settings
                </span>
              </span>
              <span className='title'>E-Comics</span>
            </Link>
          </li>
          <li>
            <NavLink to={"/dashboard/admin"} className={({ isActive }) => (isActive ? 'dashboard-active' : 'dashboard-inactive')}>
              <span className='icon'>
                <span className="material-symbols-outlined pt-2" style={{ fontSize: '2.5rem' }}>
                  dashboard
                </span>
              </span>
              <span className='title'>Dashboard</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to={"/dashboard/orders"} className={({ isActive }) => (isActive ? 'dashboard-active' : 'dashboard-inactive')} >
              <span className='icon'>
                <span className="material-symbols-outlined pt-2" style={{ fontSize: '2.5rem' }}>
                  list_alt
                </span>
              </span>
              <span className='title'>Orders</span>
            </NavLink>
          </li> */}
          <li>
            <NavLink to={"/dashboard/users"} className={({ isActive }) => (isActive ? 'dashboard-active' : 'dashboard-inactive')}>
              <span className='icon'><RiUser3Fill /></span>
              <span className='title'>Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/reviews"} className={({ isActive }) => (isActive ? 'dashboard-active' : 'dashboard-inactive')} >
              <span className='icon'>
                <span className="material-symbols-outlined" style={{ fontSize: '2.5rem',paddingTop:'12px' }}>
                  rate_review
                </span>
              </span>
              <span className='title'>Reviews</span>
            </NavLink>
          </li>
          {/* <li>
            <a href="#">
            <span className='icon'><RiLockPasswordLine /></span>
            <span className='title'>Password</span>
            </a>
          </li> */}
          <li>
            <NavLink to={"/dashboard/upload"} className={({ isActive }) => (isActive ? 'dashboard-active' : 'dashboard-inactive')}>
              <span className='icon'><RiUpload2Line /></span>
              <span className='title'>Upload comic</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to={"/dashboard/upload"} className={({ isActive }) => (isActive ? 'dashboard-active' : 'dashboard-inactive')}>
              <span className='icon'><RiUpload2Line /></span>
              <span className='title'>Upload issues</span>
            </NavLink>
          </li> */}
          <li>
            <NavLink to={"/dashboard/logout"} className={({ isActive }) => (isActive ? 'dashboard-active' : 'dashboard-inactive')}>
              <span className='icon'><RiLogoutBoxRLine /></span>
              <span className='title'>Exit</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  )
}

export default DashboardNav