import { useState, useEffect } from "react";
import Loading from "./Loading";
import Pagination from "./Pagination";
import {
  ItemLink,
  HomePageText,
  HomePageTextWrap,
  ImgWrap,
  GridWrap,
  AllItemGrid,
  Img,
  ItemWrap,
  Wrapper,
} from "../styles/ItemMapStyles";

//Rendering Fitness Items and Pagination
const Fitness = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 180 / 20;
  const itemsPerPage = 20;

  const [fitnessItems, setFitnessItems] = useState([]);

  useEffect(() => {
    fetch(`/items/Fitness`)
      .then((res) => res.json())
      .then((data) => {
        setFitnessItems(data.data.items);
      });
  }, []);

  //Pagination code

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = fitnessItems.slice(startIndex, endIndex);

  return (
    <Wrapper>
      <HomePageTextWrap>
        <HomePageText>Fitness Items</HomePageText>
      </HomePageTextWrap>
      {fitnessItems.length === 0 ? (
        <Loading />
      ) : (
        <GridWrap>
          <AllItemGrid>
            {itemsToShow.map((item) => {
              return (
                <ItemLink key={item._id} to={`/item/${item._id}`}>
                  <ItemWrap key={item.id}>
                    <ImgWrap>
                      <Img src={item.imageSrc} />
                    </ImgWrap>
                    <h2>{item.name}</h2>
                    <h3>{item.price}</h3>
                  </ItemWrap>
                </ItemLink>
              );
            })}
          </AllItemGrid>
        </GridWrap>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Wrapper>
  );
};

export default Fitness;
