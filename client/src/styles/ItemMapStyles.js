import styled from "styled-components";
import { Link } from "react-router-dom";

//Styles used for mapping out items

export const ItemLink = styled(Link)`
  text-decoration: none;
  color: black;
  border-radius: 25px;
  background-color: #fff;
`;

export const HomePageTextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`;
export const HomePageText = styled.h2`
  border-bottom: 3px solid black;
  width: 200px;
  text-align: center;
  font-family: "nimbus-sans", sans-serif;
  font-weight: 400;
  font-style: normal;
`;

export const ImgWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #caadd2;
  border-radius: 25px 25px 0px 0px;
`;
export const GridWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const AllItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2em;
  margin-left: 5em;
`;

export const Img = styled.img`
  width: 200px;
  margin: 10px;
  border-radius: 30px;
  max-width: 200px;
  max-height: 200px;
  min-height: 200px;
  box-shadow: 5px 5px black;
  border: 3px solid black;
`;
export const ItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 450px;
  background-color: #caadd2;
  border: 3px solid black;
  border-radius: 25px;
  box-shadow: 1px 1px black;
  position: relative;
`;

export const MainWrap = styled.div`
  h2 {
    padding-top: 15px;
    padding-left: 10px;
    font-family: "nimbus-sans", sans-serif;
    font-weight: 700;
    font-style: italic;
    word-wrap: break-word;
    font-size: 20px;
    background-color: #caadd2;
  }

  h3 {
    padding-top: 15px;
    padding-left: 10px;
    font-family: "nimbus-sans", sans-serif;
    font-weight: 700;
    font-style: italic;
    background-color: #caadd2;
  }
`;

export const CompanyLink = styled.a`
  background-color: #caadd2;
  border-radius: 5px;
  color: black;
  padding: 15px;
  border: 3px solid black;
  font-family: "nimbus-sans", sans-serif;
  font-weight: 700;
  font-style: italic;
  word-wrap: break-word;
  font-size: 20px;
  bottom: 30px;
  left: 70px;
  position: absolute;
  text-decoration: none;

  &:visited {
    color: black;
  }

  &:hover {
    background-color: #b5d2ad;
    color: white;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #b5d2ad;
`;
