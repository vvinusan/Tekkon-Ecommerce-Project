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
  CompanyLink,
  MainWrap,
} from "../styles/ItemMapStyles";

//Rendering All Items and Pagination

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 360 / 20;
  const itemsPerPage = 20;

  const [items, setItems] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data.items);
      });

    fetch("/companies")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data.data);
      });
  }, []);

  //Pagination code

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = items.slice(startIndex, endIndex);

  return (
    <Wrapper>
      <HomePageTextWrap>
        <HomePageText>All Items</HomePageText>
      </HomePageTextWrap>
      {items.length === 0 ? (
        <Loading />
      ) : (
        <GridWrap>
          <AllItemGrid>
            {itemsToShow.map((item) => {
              const company = companies.find(
                (company) => company._id === item.companyId
              );
              return (
                <MainWrap key={item._id}>
                  <ItemWrap key={item.id}>
                    <ItemLink key={item._id} to={`/item/${item._id}`}>
                      <ImgWrap>
                        <Img src={item.imageSrc} />
                      </ImgWrap>
                      <h2>{item.name}</h2>
                      <h3>{item.price}</h3>
                    </ItemLink>
                    <CompanyLink
                      href={company && company.url}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {company && company.name}
                    </CompanyLink>
                  </ItemWrap>
                </MainWrap>
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

export default HomePage;
