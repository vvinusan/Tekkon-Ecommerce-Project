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

//Rendering Gaming Items and Pagination

const Gaming = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20 / 20;
  const itemsPerPage = 20;

  const [gamingItems, setGamingItems] = useState([]);

  useEffect(() => {
    fetch(`/items/Gaming`)
      .then((res) => res.json())
      .then((data) => {
        setGamingItems(data.data.items);
      });
  }, []);

  //Pagination code

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = gamingItems.slice(startIndex, endIndex);

  return (
    <Wrapper>
      <HomePageTextWrap>
        <HomePageText>Gaming Items</HomePageText>
      </HomePageTextWrap>
      {gamingItems.length === 0 ? (
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

export default Gaming;
