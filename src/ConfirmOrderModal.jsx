import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import okey from "../public/assets/images/icon-order-confirmed.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ closed, orderList, total, setClosed }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setClosed(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Stilini değiştirmeden sadece dış button'u kaldırdım */}
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: "#ef4444", // bg-red-500
          p: 2, // padding: theme spacing * 2
          width: "100%", // w-full
          borderRadius: "1rem", // rounded-xl
          color: "white", // text-white
          "&:hover": {
            backgroundColor: "#dc2626", // hover için biraz koyu kırmızı
          },
        }}
      >
        Confirm Order
      </Button>
      {closed && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div>
                <img src={okey} alt="" />
                <h1 className="font-extrabold">Order Confirmed</h1>
                <br />
                <div className="bg-red-100 rounded-md p-2 gap-y-2">
                  {orderList.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-1">
                      <div>
                        <img
                          className="w-12 h-12"
                          src={item.orderImage}
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="flex flex-col">
                          <span className="text-sm">{item.orderName}</span>
                          <div className="text-xs flex justify-between flex-row gap-x-2 w-48">
                            <div className="flex flex-row justify-between gap-x-4">
                              <span className="text-red-500">
                                {item.orderAmount}x
                              </span>
                              <span>${item.orderPrice / item.orderAmount}</span>
                            </div>
                            <div>
                              <span>${item.orderPrice}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="p-2 flex justify-between items-center">
                    <span className="text-sm">Order Total</span>
                    <span className="text-2xl">
                      ${orderList.length === 0 ? 0 : total.totalPrice}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setClosed(!closed)}
                  className="bg-red-500 p-2 w-full rounded-xl text-white"
                >
                  Start New Order
                </button>
              </div>
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
}
