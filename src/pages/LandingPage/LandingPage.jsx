import "./LandingPage.css"
import { Link } from 'react-router-dom'
import logo from '../../assets/LogoRed2.png'
import comic1 from '../../assets/Comics/Comic1.jpg'
import comic2 from '../../assets/Comics/Comic2.jpg'
import comic3 from '../../assets/Comics/Comic3.jpg'
import comic4 from '../../assets/Comics/Comic4.jpg'
import comic5 from '../../assets/Comics/Comic5.jpg'
import comic6 from '../../assets/Comics/Comic6.jpg'

import sale50 from '../../assets/Comics/Sales/Sale50.png'
import offer from '../../assets/Comics/Sales/Offer.png'
import bestseller from '../../assets/Comics/Sales/BestSeller.png'

import patternYellow from '../../assets/Comics/patternYellow.jpg'
import patternBlue from '../../assets/Comics/patternBlue.jpg'

const LandingPage = () => {

  return (
    <>
      <section className='landing-section'>
        <img src={patternYellow} className="circle" alt='' />
        <img src={patternBlue} className="circle2" alt='' />
        <header className='shadow-lg sticky bg-gray-100  border-b-2 border-gray-100'>
          <Link to="/home"><img src={logo} alt="logo" className='logo' /></Link>
          <ul>
            <li><a href='/home'>Home</a></li>
            <li><a href='/login'>Login</a></li>
            <li><a href='/login'>Sign Up</a></li>
          </ul>
        </header>
        <div className="cont">
          <div className="textBox">
            <h2>It`s not just Comics <br />It`s <span>E-Comics</span></h2>
            <p>Looking for a comic? E-Comics is your place to find it. The best prices, the best comics and the best promotions</p>
            <a className="shop" href="/home">Go Shop</a>
          </div>
          <div className='imgBox'>
            <img src={comic1} width={180} height={200} alt="comic" />
            <img src={comic2} width={180} height={200} alt="comic" />
            <img src={comic3} width={180} height={200} alt="comic" />
            <img src={comic4} width={180} height={200} alt="comic" />
            <img src={comic5} width={180} height={200} alt="comic" />
            <img src={comic6} width={180} height={200} alt="comic" />
          </div>
          <ul className='thumb'>
            <Link to="/cardDetail/773"><li><img src={sale50} alt="sale" width={150} height={150} /></li></Link>
            <Link to="/cardDetail/1174"><li><img src={offer} alt="offer" width={150} height={150} /></li></Link>
            <Link to="/cardDetail/796"><li><img src={bestseller} alt="best" width={150} height={150} /></li></Link>
          </ul>
        </div>
      </section>
    </>
  )
}

export default LandingPage