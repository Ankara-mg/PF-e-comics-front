import { useState } from 'react';
import { useSelector } from "react-redux";
import Carousel from 'react-bootstrap/Carousel';
import hero1 from "../../assets/intro1.jpg"
import hero2 from "../../assets/doomsday.jpg"
import hero3 from "../../assets/dev-d2Py_uhXJQo-unsplash.jpg"
import hero4 from "../../assets/comic_hand.jpg"
import hero5 from "../../assets/philip-myrtorp-0FVVmFF00_0-unsplash.jpg"
import hero6 from "../../assets/waldemar-brandt.jpg"
import hero7 from "../../assets/erik-mclean-27kCu7bXGEI-unsplash.jpg"
import Item from './Item';
import "./Carrousel.css"

const ControlledCarousel = () => {
  const theme_params = useSelector((state) => state.params.theme_params);
  const { theme } = theme_params

  const [index, setIndex] = useState(0);
  const listImg_item1 = [hero1, hero3, hero4]
  const listImg_item2 = [hero6, hero2, hero7]
  const listImg_item3 = [hero4, hero5]
  const listImg_item4 = [hero1]
  let time_iterval = 4000

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={`container-carrousel bg-${theme}`} >
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item interval={time_iterval}>
          <Item listImages={listImg_item1} >
          </Item>
        </Carousel.Item>
        <Carousel.Item interval={time_iterval} >
          <Item listImages={listImg_item2} >
          </Item>
        </Carousel.Item>
        <Carousel.Item interval={time_iterval}>
          <Item listImages={listImg_item3} >
          </Item>
        </Carousel.Item>
        <Carousel.Item interval={time_iterval}>
          <Item listImages={listImg_item4} >
          </Item>
        </Carousel.Item>
      </Carousel >
    </div >
  );
}

export default ControlledCarousel