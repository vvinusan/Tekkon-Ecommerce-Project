import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Context } from "./Context";
import Loading from "./Loading";

const ShoppingCart = () => {
  const [isShoppingCartEmpty, setIsShoppingCartEmpty] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const { cart, setCart, isLoading } = useContext(Context);
  const navigate = useNavigate();

  // if cart length is equal zero set isShoppingCartEmpty to true otherwise false
  useEffect(() => {
    if (cart.length === 0) {
      setIsShoppingCartEmpty(true);
    } else {
      setIsShoppingCartEmpty(false);
    }
  }, [cart]);

  //Update stock upon checking out
  const updateItemStock = async (itemId, newStock) => {
    try {
      const response = await fetch(`/item/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStock }),
      });
      if (response.ok) {
        console.log("Item stock updated successfully");
      } else {
        console.error("Failed to update item stock");
      }
    } catch (error) {
      console.error("Error updating item stock:", error);
    }
  };

  // Increase selected stock function
  const handleIncrement = async (id) => {
    // looks over cart items and updates particular item's quantity and updates cart
    const updatedCart = cart.map((item) =>
      id === item._id
        ? {
            ...item,
            quantity: item.quantity + (item.quantity < item.numInStock ? 1 : 0),
          }
        : item
    );
    setCart(updatedCart);

    await fetch("/deleteCart", {
      method: "DELETE",
    }).then((res) => res.json());

    await fetch("/updateCart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updatedCart }),
    });
  };

  // sums cart items and calculate subTotal and set to subTotal state
  useEffect(() => {
    const subtotal = cart.reduce((acc, item) => {
      const price = Number(item.price.substring(1));
      return acc + price * item.quantity;
    }, 0);
    setSubtotal(subtotal);
  }, [cart]);

  // Decrease selected stock function
  const handleDecrement = async (id) => {
    // looks over cart items and updates particular item's quantity and updates cart

    const updatedCart = cart.map((item) =>
      id === item._id
        ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
        : item
    );

    setCart(updatedCart);

    await fetch("/deleteCart", {
      method: "DELETE",
    }).then((res) => res.json());

    await fetch("/updateCart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updatedCart }),
    });
  };

  // Delete function that removes cart item
  const handleCancel = (event, id) => {
    // remove items from cart where id matches, store in newCart and update the cart state
    const newCart = cart.filter((item) => {
      return item._id !== id;
    });
    setCart(newCart);
    fetch(`/deleteCart/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  // Function on Continue Shopping button which redirects user to homepage
  const handleClick = () => {
    navigate("/");
  };

  //CHECKOUT FUNCTION
  //1. Updates new stock values
  //2. Alerts user of completed order
  //3. Clears cart on browser
  //4. Clears cart in Mongo "carts" collection
  const handleCheckout = () => {
    // Update the item stock
    cart.forEach((item) => {
      const newStock = item.numInStock - item.quantity;
      updateItemStock(item._id, newStock);
    });

    window.alert("ORDER COMPLETE!!!!");
    setIsShoppingCartEmpty(true);
    setCart([]);

    fetch("/deleteCart", {
      method: "DELETE",
    }).then((res) => res.json());
  };

  return (
    <>
      {!isLoading ? (
        <>
          {isShoppingCartEmpty ? (
            <Main>
              <>
                <img src="../emptycart.gif" width="480" height="480" />
                <P>There are no items in your cart</P>
                <ContinueShoppingBtn onClick={handleClick}>
                  Continue shopping
                </ContinueShoppingBtn>
              </>
            </Main>
          ) : (
            <>
              <ItemCart>
                <Wrapper>
                  <CartItems>
                    <Heading>My Shopping Cart</Heading>
                    {cart &&
                      cart.map((item, index) => {
                        const price = item.price.substring(1) * item.quantity;
                        return (
                          <Container key={index}>
                            <ImageContainer>
                              <Img2 src={item.imageSrc} alt="Items" />
                            </ImageContainer>
                            <div>
                              <div>
                                <ItemInfo>{item.name}</ItemInfo>
                                <ItemInfo>{item.category}</ItemInfo>
                                <ItemInfos>Stock: {item.numInStock}</ItemInfos>
                              </div>
                            </div>
                            <div>
                              <QuantityBtn
                                onClick={() => handleDecrement(item._id)}
                              >
                                -
                              </QuantityBtn>
                              <label>{item.quantity}</label>
                              <QuantityBtn
                                onClick={() => handleIncrement(item._id)}
                              >
                                +
                              </QuantityBtn>
                            </div>
                            <ItemPrice>${price.toFixed(2)}</ItemPrice>
                            <div>
                              <span>
                                <Cancel
                                  onClick={(event) =>
                                    handleCancel(event, item._id)
                                  }
                                >
                                  <DeleteBtn>Delete</DeleteBtn>
                                </Cancel>
                              </span>
                            </div>
                          </Container>
                        );
                      })}
                    <ContinueShoppingBtn onClick={handleClick}>
                      Continue Shopping
                    </ContinueShoppingBtn>
                  </CartItems>
                  <TotalSummary>
                    <Summary>Order Summary</Summary>
                    <OrderInfo>${subtotal.toFixed(2)}</OrderInfo>
                    <PriceInfo>Subtotal:</PriceInfo>
                    <OrderInfo>${(subtotal * 0.15).toFixed(2)}</OrderInfo>
                    <PriceInfo>Taxes:</PriceInfo>
                    <OrderInfos>${(subtotal * 1.15).toFixed(2)}</OrderInfos>
                    <Total>Total:</Total>
                    <Checkout onClick={handleCheckout}>Checkout</Checkout>
                  </TotalSummary>
                </Wrapper>
              </ItemCart>
            </>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ShoppingCart;

const OrderInfo = styled.span`
  float: right;
  font-size: 20px;
`;

const OrderInfos = styled.span`
  float: right;
  margin-top: 5px;
  font-weight: bold;
  font-size: 18px;
`;

const ItemCart = styled.div`
  width: 95%;
  margin: auto;
  padding: 20px;
`;

const ItemInfo = styled.p`
  font-size: 18px;
  padding-bottom: 10%;
`;

const ItemInfos = styled.p`
  padding-bottom: 2%;
  font-weight: bold;
`;

const QuantityBtn = styled.button`
  background-color: #caadd2;
  padding: 0px 7%;
  margin: 0% 10%;
  font-size: larger;
  cursor: pointer;
`;

const ItemPrice = styled.div`
  font-size: 19px;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 3%;
`;

const CartItems = styled.div`
  margin-right: 30px;
  width: 65%;
`;

const Container = styled.div`
  border: 2px solid silver;
  padding: 23px 10px 23px 20px;
  display: grid;
  grid-template-columns: 20% 35% 16% 7% 5%;
  column-gap: 22px;
  row-gap: 32px;
  margin-bottom: 3%;
  border-radius: 20px;
  box-shadow: 1px 1px 20px 1px #969696;
`;

const Heading = styled.h3`
  margin-bottom: 13px;
  font-weight: bold;
  font-size: 28px;
`;

const ImageContainer = styled.div`
  display: flex;
  float: left;
  margin-right: 5%;
  background-color: aliceblue;
  border-radius: 20px;
`;

const Img2 = styled.img`
  width: 100%;
  border-radius: 20px;
`;

const Cancel = styled.div`
  border-radius: 20px;
  border: none;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const TotalSummary = styled.div`
  padding: 23px;
  background-color: #caadd2;
  width: 20%;
  box-shadow: 1px 3px 2px 1px #969696;
  border-radius: 15px;
  height: fit-content;
  margin-left: 30px;
`;

const Summary = styled.h4`
  margin: 7px 0px 25px 0px;
  font-weight: bold;
  font-size: 25px;
`;

const PriceInfo = styled.p`
  padding-bottom: 7%;
  font-size: 18px;
`;

const Total = styled.p`
  border-top: 1px solid black;
  padding: 2% 0% 12% 0;
  font-weight: bold;
  font-size: 18px;
`;

const Checkout = styled.button`
  width: 100%;
  color: white;
  background-color: #030343;
  font-size: 20px;
  padding: 10px 0px;
  cursor: pointer;
  border-radius: 20px;
  box-shadow: none;
  &:hover {
    box-shadow: 2px 2px 5px 1px #969696;
  }
`;

const Main = styled.div`
  width: 80%;
  margin: auto;
  padding: 20px;
  text-align: center;
`;

const P = styled.p`
  text-align: center;
  font-size: larger;
  padding: 20px;
  font-family: sans-serif;
`;

const ContinueShoppingBtn = styled.button`
  cursor: pointer;
  text-align: center;
  color: black;
  background-color: #caadd2;
  font-size: 30px;
  padding: 2% 3%;
  box-shadow: none;
  border-radius: 15px;
  &:hover {
    box-shadow: 2px 2px 5px 1px #969696;
    color: white;
    background-color: #caadd2;
  }
`;

const DeleteBtn = styled.button`
  color: white;
  background-color: #030343;
  font-size: 20px;
  padding: 10px 5px;
  border-radius: 20px;
  box-shadow: none;
  &:hover {
    box-shadow: 2px 2px 5px 1px #969696;
  }
`;
