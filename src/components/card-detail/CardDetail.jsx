import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getComicDetail } from "@redux/actions/comics";
import { useNavigate, useParams } from "react-router-dom";
// import Loading from "../loading/Loading";
import NavBar from '../navBar/Navbar'
import Issues from '../issues/Issues';


import "./cardDetail.css"


const CardDetail = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const theme_params = useSelector((state) => state.global.theme);
  const { theme } = theme_params;
  const comic = useSelector((state) => state.comics.comic);
  const { id } = useParams()
  // const rol = JSON.parse(localStorage.getItem("ROL"))
  const { image, name, deck, description, start_year } = comic

  useEffect(() => {
    dispatch(getComicDetail(id))
  }, [dispatch, id])


  useEffect(() => {
    if (Object.entries(comic).length > 0) {
      // format and add description
      const desc_content = document.getElementById("desc")
      const removeHref = (text) => {
        const pattern = /href="(.*?)"/g
        return text.replaceAll(pattern, 'href="javascript:()=> false;" disabled="disabled"');
      }
      desc_content.innerHTML = description ? removeHref(description) : "";

      // set theme
      const description_bkg = document.getElementById("description-detail");
      const infoIssues = document.getElementById("info-issues");
      description_bkg.className = `description-detail-${theme}`
      infoIssues.className = `info-issues-${theme}`
    }
  })


  // if (Object.entries(comic).length === 0) return <p>Loading...</p>
  return (
    <>
      <div className='container-detail' >
        <NavBar searchbar={true} />
        <span className="material-symbols-outlined undo" onClick={() => navigate(-1)}>undo</span>
        <span className='undo-text' onClick={() => navigate(-1)}>Back</span>
        {Object.entries(comic).length > 0 ?
          (<div className='card-detail d-flex'>
            <div className='img-detail'>
              <img src={image} alt="" />
            </div>
            <div className='info-detail'>
              {/* <Link to={rol ? '/user/home' : '/home'}>
                <span id='undo' className="material-symbols-outlined undo">
                  undo
                </span>
              </Link> */}
              <div id='description-detail'>
                <p className='description-title'>{name} ({start_year})</p>
                <p className='description-subtitle'>{deck}</p>
                <p id='desc'></p>
              </div>
            </div>
          </div>) :
          (<div className='pos-loading'>
            Loading...
            {/* <Loading data={Object.entries(comic)} state={true} timeWait={4000} /> */}
          </div>
          )
        }
        <div id='info-issues' className='mt-5'>
          {
            Object.entries(comic).length > 0 && <Issues volume_id={id}></Issues>
          }

        </div>

      </div >
    </>
  );
}

export default CardDetail;

