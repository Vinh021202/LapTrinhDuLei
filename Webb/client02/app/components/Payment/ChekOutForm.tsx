import { Style } from "@/app/style/stylelogin";
import { useLoadUserQuery } from "@/redux/features/api/apiSilce";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "http://localhost:8000";
const socketId = socketIO(ENDPOINT, {
    transports: ["websocket"]  // Sử dụng WebSocket transport
});

type Props = {
  setOpen: any;
  data: any;
  user: any;
};

const ChekOutForm = ({ setOpen, data,user }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      createOrder({ courseId: data._id, paymet_info: paymentIntent });

    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      socketId.emit("notification" , {
        title: "đơn hàng mới",
        message: `Bạn có một đơn đặt hàng mới từ ${data.name}`,
        userId: user._id,
      })
      redirect(`/course-access/${data._id}`);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [orderData, error]);



  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text" className={`${Style.button} mt-2 !h-[35px]`}>
          {isLoading ? "Paying..." : "Pay now"}
        </span>
      </button>
      {/* Hiển thị bất kỳ thông báo lỗi hoặc thành công nào */}
      {message && (
        <div id="payment-message" className="text-[red]">
          {message}
        </div>
      )}
    </form>
  );
};

export default ChekOutForm;
