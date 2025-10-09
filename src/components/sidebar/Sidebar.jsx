import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from '@redux/reducers/global';
import { getPublishers } from "@redux/actions/publishers";
// import { getAllComics } from "../../redux/actions/comics";
import { filterByPublisher, sortByName, getAllComics } from "@redux/actions/comics";

import "./Sidebar.css"


const Sidebars = () => {
  const dispatch = useDispatch();
  const [/*order*/, setOrder] = useState('')

  // const [currentPage, setCurrentPage] = useState(1) 
  // let characters = useSelector(state => state.filters.characters)
  let publishers = useSelector((state) => state.publishers.publishers)
  const comics = useSelector((state) => state.comics.comics)
  const comicsFilter = useSelector((state) => state.comics.filteredComics)

  useEffect(() => {
    dispatch(getPublishers())
  }, [dispatch])

  function handlePublishers(e) {
    e.preventDefault()
    if(e.target.value === 'null') return
    dispatch(filterByPublisher(e.target.value, comics));
    dispatch(setCurrentPage(1))
  }

  function handleFilterAD(e) {
    e.preventDefault();
    if(e.target.value === 'null') return
    dispatch(sortByName(e.target.value, comicsFilter));
    setOrder(`Ordenado ${e.target.value}`);
    // setCurrentPage(1)
  }

  function resetComics(){
    dispatch(getAllComics())
  }

  return (
    <div style={{ height: "100px" }}>
      <select className='w-25 m-2 p-2 border border-white rounded' onChange={e => handlePublishers(e)}>
        <option value='null' disabled selected >Filter by Publisher...</option>
        {publishers.map((publisher) => (
            <option key={publisher.id} value={publisher.name}>{publisher.name}</option>
          ))}
      </select>

      <select className='w-25 m-2 p-2 border border-white rounded' onChange={(e)=> handleFilterAD(e)}>
        <option value='null' disabled selected>Sort by name...</option>
        <option value="Asc">A - Z</option>
        <option value="Desc">Z - A</option>
      </select>

      <button className='btn btn-light' onClick={resetComics}>
          Reset Filters
      </button>
    </div>
  );
}

export default Sidebars
