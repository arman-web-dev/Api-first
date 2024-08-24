import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

function Rating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="rating-container">
      <span className="rating-text">Rating: {rating.toFixed(1)}</span>
      <span className="icon">
        {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} color="#FFD700" />)}
        {halfStar && <FaStarHalfAlt color="#FFD700" />}
        {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} color="#FFD700" />)}
      </span>
    </div>
  );
}

function App() {
  let [product, setProduct] = useState([]);
  
  let getdata = () => {
    axios.get('https://dummyjson.com/products').then((response) => {
      setProduct(response.data.products);
    });
  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <Container>
        <Row>
          {product.map((item, i) => (
            <Col key={i} lg={4}>
              <div className="Metarial">
                <img src={item.thumbnail} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{`${item.description.slice(0, 50)}... see more`}</p>
                <h3>Stock: {item.stock}</h3>
                <div className="rating-wrapper">
                  <Rating rating={item.rating} />
                </div>
                <h3>Price: ${item.price}</h3>
                <h3>Discount: {item.discountPercentage}%</h3>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
