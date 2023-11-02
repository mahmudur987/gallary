import styled from "styled-components";

export const MainContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const ImageContainer = styled.figure`
  max-width: 250px;
  width: 100%;
  min-height: 300px;
  img:hover {
    opacity: 0.5;
  }
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
