
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css'
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import { FaRegStar } from "react-icons/fa";


function App() {
  let [product, setProduct] = useState([]);
  let getdata = () =>{
    axios.get('https://dummyjson.com/products').then((respone)=>{
      setProduct(respone.data.products);
      
    });
  }
  useEffect(() =>{
    getdata();
  },[])
  return (
    
    <>
    <Container>
      <Row>
        {product.map((item, i)=>(
        <Col key={i} lg={4}>

        <div className="Metarial">
          <img src={item.thumbnail} alt="" />
         <h3> {item.title}</h3>
         <p> {`${item.description.slice(0,50)}.. see more`}</p>
         <h3> {item.stock}</h3>
         <h3>Rating: {item.rating}<FaRegStar /><FaRegStar />
         <FaRegStar />
         <FaRegStar />

         </h3>
         <h3>Price: ${item.price}</h3>
         <h3>Discount: {item.discountPercentage}%</h3>
        </div>
        </Col>
        ))}
       
      </Row>
    </Container>

    </>
  )
}

export default App
