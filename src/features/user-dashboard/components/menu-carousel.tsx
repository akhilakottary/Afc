import { Carousel } from 'antd';
import './menu-carousel.css';

interface Item {
  id: number;
  name: string;
  image: string;
}

interface Props {
  items: Item[];
}

const SpecialCarousel = ({ items }: Props) => {
  return (
    <div className="carousel-section">
      <h3 className="carousel-title">Today's Special</h3>
      <Carousel
        autoplay
        infinite
        dots
        className="carousel-container"
        centerMode
        slidesToShow={2.5}
        autoplaySpeed={1500}
        responsive={[
          {
            breakpoint: 9999, // large screens
            settings: {
              slidesToShow: 2.5,
            },
          },
          {
            breakpoint: 768, // tablets and below
            settings: {
              slidesToShow: 2.6,
            },
          },
        ]}
      >
        {items.map((item) => (
          <div key={item.id} className="carousel-slide">
            <div className="carousel-card">
              <img src={item.image} alt={item.name} className="carousel-image" />
              <p className="carousel-name">{item.name}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SpecialCarousel;