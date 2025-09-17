import { BsLinkedin, BsGithub } from 'react-icons/bs'
import Sergio from '../../assets/devs/SergioFoto.jpeg'
import Daniel from '../../assets/devs/Daniel.jpeg'
import Sol from '../../assets/devs/SolDev.jpeg'
import Juan from '../../assets/devs/JuanDev.jpeg'
import Johan from '../../assets/devs/JohanDev.jpg'
import Jorge from '../../assets/devs/JorgeDev.jpg'
import Logo from '../../assets/LogoRed2.png'
import "./footer.css"

const Footer = () => {
  return (
    <div className="containerFooter">
      <footer
        className="text-center text-lg-start text-white footerPage"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="p-4 pb-0">

          <div className="sectionFooter">

            <div className="row">

              <div className="col-md-3 col-lg-3 col-xl-3">
                <h5 className="text-uppercase font-weight-bold">
                  E- Comics
                </h5>
                <p>
                  Proyecto grupal final del bootcamp Soy Henry
                </p>
                <img src={Logo} alt="logo" width={200} height={100} className="mt-5" />
              </div>

              <div className="col-md-9 col-lg-9 col-xl-9">
                <h5 className="text-uppercase mb-4 font-weight-bold">Developers Team</h5>
                <div className="containerDevs">
                  <div className="containerDev">
                    <h6>Daniel Gonzalez Avila (bode)</h6>
                    <img src={Daniel} className="imgRedonda mt-1" alt='' />
                    <div className="containerIcons">
                      <a className="github" href='https://github.com/Dagoav' target="_blank" rel="noreferrer">
                        <BsGithub />
                      </a>
                      <a href='https://www.linkedin.com/in/daniel-gonzalez-avila-75770b234/' target="_blank" rel="noreferrer">
                        <BsLinkedin />
                      </a>
                    </div>
                  </div>

                  <div className="containerDev">
                    <h6>Jorge Alejandro Gonzales Firigua (cizañas)</h6>
                    <img src={Jorge} className="imgRedonda mt-1" alt='' />
                    <div className="containerIcons">
                      <a className="github" href='https://github.com/alejo10913' target="_blank" rel="noreferrer">
                        <BsGithub />
                      </a>
                      <a href='https://www.linkedin.com/in/jorge-alejandro-gonzález-58398a4b' target="_blank" rel="noreferrer">
                        <BsLinkedin />
                      </a>
                    </div>
                  </div>

                  <div className="containerDev">
                    <h6>Juan Carlos Ramirez Pinilla (capo de front)</h6>
                    <img src={Juan} className="imgRedonda mt-1" alt='' />
                    <div className="containerIcons">
                      <a className="github" href='https://github.com/juank27ra' target="_blank" rel="noreferrer">
                        <BsGithub />
                      </a>
                      <a href='https://www.linkedin.com/in/juan-carlos-ramirez-pinilla-a8518077/' target="_blank" rel="noreferrer">
                        <BsLinkedin />
                      </a>
                    </div>
                  </div>

                  <div className="containerDev">
                    <h6>Antonella Sol Román (la gata del código)</h6>
                    <img src={Sol} className="imgRedonda mt-1" alt='' />
                    <div className="containerIcons">
                      <a className="github" href='https://github.com/Ankara-mg' target="_blank" rel="noreferrer">
                        <BsGithub />
                      </a>
                      <a href='https://www.linkedin.com/in/sol-rom%C3%A1n-9a4b55221/' target="_blank" rel="noreferrer">
                        <BsLinkedin />
                      </a>
                    </div>
                  </div>

                  <div className="containerDev">
                    <h6>Johan Stiven Turmeque (404)</h6>
                    <img src={Johan} className="imgRedonda mt-1" alt='' />
                    <div className="containerIcons">
                      <a className="github" href='https://github.com/turmeque' target="_blank" rel="noreferrer">
                        <BsGithub />
                      </a>
                      <a href='https://www.linkedin.com/in/sergio-moyano-a-1425b6a/' target="_blank" rel="noreferrer">
                        <BsLinkedin />
                      </a>
                    </div>
                  </div>

                  <div className="containerDev">
                    <h6>Sergio Daniel Moyano (Woky)</h6>
                    <img src={Sergio} className="imgRedonda mt-1" alt='' />
                    <div className="containerIcons">
                      <a className="github" href='https://github.com/woky88' target="_blank" rel="noreferrer">
                        <BsGithub />
                      </a>
                      <a href='https://www.linkedin.com/in/sergio-moyano07' target="_blank" rel="noreferrer">
                        <BsLinkedin />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div
          className="text-center p-3 footerCopyR"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright:
          <a className="text-white" href="/home"
          > E- Comics </a
          >
        </div>

      </footer>
    </div>
  )
}


export default Footer