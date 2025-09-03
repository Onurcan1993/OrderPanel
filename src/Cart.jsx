import basketLogo from "../public/assets/images/icon-add-to-cart.svg";
import increment from "../public/assets/images/icon-increment-quantity.svg";
import decrement from "../public/assets/images/icon-decrement-quantity.svg";

import { useEffect, useState } from "react";

function Cart({
  total,
  setTotal,
  orderList,
  setOrderList,
  image,
  name,
  category,
  price,
}) {
  const [count, setCount] = useState(0);
  const [addTo, setAddTo] = useState(true);

  function addToCartHandler() {
    setAddTo(false);
    setCount(1);

    const newOrder = {
      orderImage: image,
      orderName: name,
      orderCategory: category,
      orderAmount: 1,
      orderPrice: price,
    };

    setOrderList((prevList) => {
      const exist = prevList.find((item) => item.orderName === name);
      if (exist) {
        return prevList.map((item) =>
          item.orderName === name ? newOrder : item
        );
      } else {
        return [...prevList, newOrder];
      }
    });
  }

  function amountHandler(e) {
    let newCount = count;

    if (e.currentTarget.id === "increment") {
      newCount = count + 1;
    } else if (e.currentTarget.id === "decrement") {
      newCount = count > 0 ? count - 1 : 0;
    }

    setCount(newCount);

    const newOrder = {
      orderImage: image,
      orderName: name,
      orderCategory: category,
      orderAmount: newCount,
      orderPrice: price * newCount,
    };

    setOrderList((prevList) => {
      const exist = prevList.find((item) => item.orderName === name);
      if (exist) {
        return prevList.map((item) =>
          item.orderName === name ? newOrder : item
        );
      } else if (newCount > 0) {
        return [...prevList, newOrder];
      } else {
        return prevList; // count 0 ise listeden çıkarma (isteğe göre ekleyebilirsin)
      }
    });

    if (newCount === 0) setAddTo(true);
  }

  useEffect(() => {
    let totalPrice = 0;
    let totalAmount = 0;
    orderList.forEach((item) => {
      totalPrice += item.orderPrice;
      totalAmount += item.orderAmount;
    });
    setTotal({ ...total, totalPrice: totalPrice, totalCount: totalAmount });
  }, [count]);

  useEffect(() => {
    orderList.length === 0 ? setCount(0) : setCount(count);
    orderList.length === 0 ? setAddTo(true) : setAddTo(addTo);
  }, [orderList]);

  return (
    <div className="">
      <div className="flex justify-center items-center flex-col relative cursor-pointer">
        <img
          className={`w-48 h-48 rounded-xl border ${
            !addTo ? "border-red-500" : "border-inherit"
          }`}
          src={image}
          alt=""
        />

        {addTo ? (
          <button
            onClick={addToCartHandler}
            className="flex flex-row items-center gap-2 border-2 p-2 rounded-2xl absolute -bottom-5 bg-white"
          >
            <div className="flex justify-between gap-2">
              <img src={basketLogo} alt="" />
              <span>Add To Cart</span>
            </div>
          </button>
        ) : (
          <div className="flex flex-row items-center gap-2 border-2 p-2 rounded-2xl absolute -bottom-5 bg-red-500 w-28 justify-between">
            <button onClick={amountHandler} id="decrement">
              <img className="w-4" src={decrement} alt="Decrement" />
            </button>

            <span className="text-white text-2xl">{count}</span>

            <button onClick={amountHandler} id="increment">
              <img className="w-4" src={increment} alt="Increment" />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col py-2 mt-4">
        <span>{category}</span>
        <span>{name}</span>
        <span>${price}</span>
      </div>
    </div>
  );
}

export default Cart;
