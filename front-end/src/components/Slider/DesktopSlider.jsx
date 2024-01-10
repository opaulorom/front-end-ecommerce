import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useState, useEffect } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile, mobileM, mobileS, mobileL, mobileB } from "../resp";


const Container = styled.div`

  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
  ${mobileS({display: "none"  })}
  ${mobileM({ display: "none"  })}
  ${mobileL ({display: "none"  })}
  ${mobileB ({  display: "none"   })}

  @media (700px <= width <= 1280px) {
    display: none;
  

  }
  @media (600px <= width <= 960px) {
    display: none;
  

  }

  @media (800px <= width <= 1280px)  {
    display: block;

   
  

  }

  @media (800px <= width <= 1280px)  and (orientation: portrait) {
    display: none;
   
  

  }

  
  
  
  @media (800px <= width <= 1280px) {
    display: none;
   
  

  }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  

`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`

  
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  @media (800px <= width <= 1280px) {

    font-size: 40px;
  
  }
`;

const Title = styled.h1`
  font-size: 70px;
  @media (800px <= width <= 1280px) {
    white-space: nowrap;
    font-size: 50px;

   
  

  }

 
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Mude o intervalo conforme necessário (em milissegundos)

    return () => clearInterval(interval);
  }, [slideIndex]);

  const nextSlide = () => {
    setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
  };

  const prevSlide = () => {
    setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
  };

  const handleClick = (direction) => {
    let newIndex;
    if (direction === 'left') {
      newIndex = slideIndex > 0 ? slideIndex - 1 : 2;
    } else {
      newIndex = slideIndex < 2 ? slideIndex + 1 : 0;
    }
    setSlideIndex(newIndex);
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
      <ArrowBackIosIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
           
            <InfoContainer>
          

    <div>
      <Title>{item.title}</Title>
      <Desc>{item.desc}</Desc>
      <Button>SAIBA MAIS!</Button>
    </div>
 


            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardIosIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
