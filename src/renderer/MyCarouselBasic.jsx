import { Carousel } from 'react-bootstrap';
import './MyCarouselBasic.scss';

export default function MyCarouselBasic({
  baseUrl,
  item,
  theme = 'light',
  showCaption = true,
  showIndicators = false,
}) {
  return (
    <Carousel
      data-bs-theme={theme}
      className="MyCarouselBasic"
      style={{ width: '100%' }}
      indicators={showIndicators}
    >
      {item.images.map((it) => (
        <Carousel.Item key={it}>
          <img
            className="d-block w-100"
            src={baseUrl + it}
            alt={item.title}
            style={{ width: '100%', height: 'auto' }}
          />
          {showCaption && (
            <Carousel.Caption>
              <div
                className="text-white"
                style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.25)' }}
              >
                {item.title}
              </div>
            </Carousel.Caption>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
