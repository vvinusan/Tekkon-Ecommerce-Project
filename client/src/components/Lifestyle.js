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

//Rendering Lifestyle Items and Pagination

const Lifestyle = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 120 / 20;
  const itemsPerPage = 20;

  const [lifestyleItems, setLifestyleItems] = useState([]);

  useEffect(() => {
    fetch(`/items/Lifestyle`)
      .then((res) => res.json())
      .then((data) => {
        setLifestyleItems(data.data.items);
      });
  }, []);

  //Pagination code

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = lifestyleItems.slice(startIndex, endIndex);

  return (
    <Wrapper>
      <HomePageTextWrap>
        <HomePageText>Lifestyle Items</HomePageText>
      </HomePageTextWrap>
      {lifestyleItems.length === 0 ? (
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

export default Lifestyle;
