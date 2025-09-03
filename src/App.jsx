import axios from "axios";
import remove from "../assets/images/illustration-empty-cart.svg";
import carbon from "../assets/images/icon-carbon-neutral.svg";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import BasicModal from "./ConfirmOrderModal";

function App() {
  const [datas, setDatas] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [total, setTotal] = useState({ totalPrice: 0, totalCount: 0 });
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    axios
      .get("/data.json")
      .then((res) => {
        setDatas(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function filterHandler(e) {
    setOrderList(
      orderList.filter((item) => item.orderName !== e.currentTarget.id)
    );

    if (orderList.length < 1) {
      setTotal({ ...total, totalPrice: 0 });
    }
  }

  useEffect(() => {
    if (orderList.length === 0) {
      setTotal({ ...total, totalPrice: 0 });
    }
    let sum = 0;
    orderList.forEach((item) => {
      sum += item.orderPrice;
    });
    console.log(sum);
    setTotal({ ...total, totalPrice: sum });
  }, [orderList]);

  useEffect(() => {
    if (!closed) {
      setOrderList([]);
    }
  }, [closed]);

  return (
    <div className="h-full flex flex-col sm:flex-row justify-center items-center sm:items-start p-4">
      <div className="">
        <h1 className="text-4xl text-center sm:text-start font-extrabold mb-2">
          DESSERTS
        </h1>
        <div className="flex flex-wrap  flex-col sm:flex-row gap-2 select-none">
          {datas.map((item, index) => (
            <Cart
              setTotal={setTotal}
              total={total}
              orderList={orderList}
              setOrderList={setOrderList}
              key={index}
              image={item.image.desktop}
              name={item.name}
              category={item.category}
              price={item.price}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-col w-96 gap-4 bg-white shadow-2xl p-4 select-none">
          <h1 className="text-3xl text-center text-red-400 font-bold">
            Your's Cart ({total.totalCount})
          </h1>

          <div className="flex justify-center flex-col items-center">
            {total.totalCount === 0 && (
              <>
                <img className="w-48 h-48" src={remove} alt="" />
                <div>Your added items will appear here.</div>
              </>
            )}
          </div>

          {orderList.map(
            (item, index) =>
              item.orderAmount > 0 && (
                <div
                  key={index}
                  className="border-b-2 border-gray-500 flex flex-row items-center justify-between"
                >
                  <div>
                    <h1 className="font-bold">{item.orderName}</h1>
                    <div className="flex gap-4">
                      <span className="text-red-500">{item.orderAmount}x</span>
                      <span className="font-extralight">
                        @${item.orderPrice / item.orderAmount}
                      </span>
                      <span>${item.orderPrice}</span>
                    </div>
                  </div>

                  <div>
                    <button
                      className="border-2 rounded-full p-2"
                      id={item.orderName}
                      onClick={filterHandler}
                    >
                      X
                    </button>
                  </div>
                </div>
              )
          )}

          {total.totalPrice !== 0 && (
            <div className="flex flex-col">
              <div className="p-2 flex justify-between items-center">
                <span>Order Total</span>
                <span className="text-4xl">
                  ${orderList.length === 0 ? 0 : total.totalPrice}
                </span>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <div className="p-2 rounded-lg bg-gray-200 flex flex-row justify-start gap-2 items-center">
                  <img src={carbon} alt="" />
                  <span>
                    This is a{" "}
                    <span className="font-bold">carbon-delivery </span>
                    neutral
                  </span>
                </div>

                {
                  <BasicModal
                    closed={closed}
                    setClosed={setClosed}
                    setOrderList={setOrderList}
                    total={total}
                    orderList={orderList}
                  />
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
