import styled from "styled-components";
import { Context } from "./Context";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import Loading from "./Loading";

const ItemDetails = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const { specItem, setSpecItem, isLoading, setIsLoading, cart, setCart } =
    useContext(Context);

  useEffect(() => {
    fetch(`/item/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        setSpecItem(data.data.item);
        setIsLoading(false);
      });
  }, [itemId]);

  // pushing item into shopping cart
  const handleAddToCart = () => {
    const foundItem = cart.find((item) => item._id === specItem._id);

    if (foundItem) {
      const otherItems = cart.filter((item) => {
        return item._id !== specItem._id;
      });
      if (foundItem.quantity !== foundItem.numInStock) {
        const newItem = {
          ...foundItem,
          quantity: (foundItem.quantity = foundItem.quantity + 1),
        };
        setCart([...otherItems, newItem]);
      } else {
        alert("Sold out!");
      }
    } else {
      const newItem = { ...specItem, quantity: 1 };
      setCart((current) => [...current, newItem]);
    }

    fetch("/addCart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: specItem.name,
        numInStock: specItem.numInStock,
        _id: specItem._id,
        price: specItem.price,
        category: specItem.category,
        imageSrc: specItem.imageSrc,
        quantity: 1,
      }),
    });

    navigate("/shopping-cart");
  };

  //Rendering description based of item category

  const categoryDescription = () => {
    if (specItem?.category === "Fitness") {
      return (
        <p>
          Tekkon believes in using tech as an integral part of your fitness
          journey. That is why we offer the best accessories to help you achieve
          your goals!
        </p>
      );
    } else if (specItem?.category === "Medical") {
      return (
        <p>
          Health is priority number one. Rest ensured that you can use our tech
          wearables to help keep your greatest priority great.{" "}
        </p>
      );
    } else if (specItem?.category === "Lifestyle") {
      return (
        <p>
          Fashion, watches, tech. Tekkon's lifestyle choices are par to none.
        </p>
      );
    } else if (specItem?.category === "Gaming") {
      return (
        <p>
          While Tekkon's current gaming offerings are slim, I do not feel that
          much has to be said about them. I mean, just look at them, might as
          well add to cart already.
        </p>
      );
    } else {
      return <p>Not Working</p>;
    }
  };

  return (
    <>
      {!isLoading ? (
        <Wrapper>
          <ItemWrapper>
            <ImgWrap>
              <Image src={specItem?.imageSrc} />
            </ImgWrap>
            <InfoWrap>
              <Title>{specItem?.name}</Title>
              <Category>{specItem?.category}</Category>
              <CategoryDescription>{categoryDescription()}</CategoryDescription>
              <PriceAddWrap>
                <Price>{specItem?.price}</Price>
                {specItem?.numInStock === 0 && (
                  <OutOfStock>Out of stock</OutOfStock>
                )}
                {specItem?.numInStock !== 0 && (
                  <AddToCart onClick={handleAddToCart}>Add to cart</AddToCart>
                )}
              </PriceAddWrap>
            </InfoWrap>
          </ItemWrapper>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
};

const PriceAddWrap = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding-top: 20px;
  align-items: center;
  gap: 20px;
`;
const CategoryDescription = styled.div`
  font-size: 20px;
  width: 70%;

  padding: 10px;
`;
const Category = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 28px;
  font-style: italic;
  font-weight: 500;
  border-bottom: 3px solid black;
  width: fit-content;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 15px;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #b5d2ad;
`;

const ItemWrapper = styled.div`
  display: flex;
  background-color: #caadd2;
  height: 300px;
  border: 1px solid black;
  box-shadow: 1px 1px black;
  margin: 20px;
  border-radius: 25px;
`;

const Title = styled.div`
  font-size: 35px;
  padding-top: 15px;
  padding-left: 10px;
  font-family: "nimbus-sans", sans-serif;
  font-weight: 700;
  word-wrap: break-word;
  border-bottom: 2px solid black;
  width: fit-content;
  padding: 5px;

  margin-top: 10px;
  border-top: 0px;
  border-left: 0px;
`;
const Price = styled.div`
  font-size: 25px;
  font-style: italic; ;
`;
const Image = styled.img`
  height: 250px;
  width: 250px;
  margin: 10px;
  border-radius: 30px;
  box-shadow: 5px 5px black;
  border: 3px solid black;
`;

const OutOfStock = styled.div`
  font-size: 20px;
`;

const AddToCart = styled.button`
  font-size: 24px;
  width: 200px;
  height: 45px;
  background-color: #b5d2ad;
  color: black;
  border: none;
  border-radius: 8px;

  :hover {
    cursor: pointer;
    transform: scale(1.07);
    transition: all 0.1s;
  }

  :active {
    transform: scale(0.9);
  }
`;

export default ItemDetails;
