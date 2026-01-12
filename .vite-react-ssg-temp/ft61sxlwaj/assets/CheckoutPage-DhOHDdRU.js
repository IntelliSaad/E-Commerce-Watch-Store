import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { u as useCart, d as db } from "../index.mjs";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { Truck, CreditCard, ShoppingBag } from "lucide-react";
import emailjs from "@emailjs/browser";
import "vite-react-ssg";
import "firebase/auth";
import "firebase/app";
import "react-helmet-async";
import "@vercel/analytics/react";
const sendOrderNotificationEmail = async (orderData) => {
  const serviceId = "service_y8blc6e";
  const templateId = "template_t8f587o";
  const publicKey = "c-ldYxWA_NlzVZgG_";
  const itemsList = orderData.items.map((item) => `${item.name} x${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`).join("\n");
  const templateParams = {
    order_number: orderData.orderNumber,
    customer_name: orderData.customerName,
    customer_email: orderData.customerEmail || "Not provided",
    customer_phone: orderData.customerPhone,
    customer_address: `${orderData.customerAddress}, ${orderData.customerCity}`,
    payment_method: orderData.paymentMethod === "COD" ? "Cash on Delivery" : "Bank/Easypaisa",
    total_amount: `Rs. ${orderData.totalAmount.toLocaleString()}`,
    items_list: itemsList
  };
  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log("Order notification email sent successfully");
    return true;
  } catch (error) {
    console.error("Failed to send order notification email:", error);
    return false;
  }
};
const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    phoneNumber: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  if (cartItems.length === 0) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/cart", replace: true });
  }
  const handleInputChange = (e) => {
    setCustomerInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleOrderPlacement = async (e) => {
    e.preventDefault();
    if (!customerInfo.fullName || !customerInfo.address || !customerInfo.city || !customerInfo.phoneNumber) {
      setMessage({ type: "error", text: "Please fill in all shipping details." });
      return;
    }
    setIsProcessing(true);
    setMessage(null);
    try {
      const initialStatus = paymentMethod === "COD" ? "Pending Confirmation" : "Pending Payment";
      const orderNumber = Math.floor(Math.random() * 9e4) + 1e4;
      const orderData = {
        orderNumber,
        customer: customerInfo,
        paymentMethod,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: Number(item.price),
          quantity: item.quantity,
          imageUrl: item.imageUrl
        })),
        totalAmount: Number(cartTotal),
        status: initialStatus,
        placedAt: serverTimestamp()
      };
      await addDoc(collection(db, "orders"), orderData);
      sendOrderNotificationEmail({
        orderNumber,
        customerName: customerInfo.fullName,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phoneNumber,
        customerAddress: customerInfo.address,
        customerCity: customerInfo.city,
        paymentMethod,
        totalAmount: Number(cartTotal),
        items: orderData.items.map((item) => ({
          name: item.name,
          quantity: item.quantity || 1,
          price: item.price
        }))
      });
      clearCart();
      navigate(`/confirmation/${paymentMethod}`, {
        state: {
          total: cartTotal,
          orderNumber,
          customerPhone: customerInfo.phoneNumber,
          customerName: customerInfo.fullName
        }
      });
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage({ type: "error", text: `Order failed. ${error.message}` });
    } finally {
      setIsProcessing(false);
    }
  };
  const inputStyle = "w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all";
  const labelStyle = "block text-gray-400 text-sm mb-1 font-medium ml-1";
  return /* @__PURE__ */ jsxs("div", { className: "py-12 bg-gray-900 min-h-screen", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-center text-white mb-10", children: "Checkout" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:w-2/3 bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700 order-2 lg:order-1", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mb-6 flex items-center", children: [
          /* @__PURE__ */ jsx(Truck, { className: "mr-3 text-yellow-500", size: 24 }),
          " Shipping Details"
        ] }),
        message && /* @__PURE__ */ jsx("div", { className: `p-4 mb-6 rounded-lg text-center text-sm font-bold ${message.type === "error" ? "bg-red-900/50 text-red-200 border border-red-500/50" : "bg-green-900 text-green-300"}`, children: message.text }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleOrderPlacement, className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: labelStyle, htmlFor: "fullName", children: "Full Name *" }),
              /* @__PURE__ */ jsx("input", { type: "text", id: "fullName", name: "fullName", value: customerInfo.fullName, onChange: handleInputChange, className: inputStyle, required: true, placeholder: "e.g. Ahmed Khan" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: labelStyle, htmlFor: "email", children: "Email (Optional - for order updates)" }),
              /* @__PURE__ */ jsx("input", { type: "email", id: "email", name: "email", value: customerInfo.email, onChange: handleInputChange, className: inputStyle, placeholder: "your@email.com" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: labelStyle, htmlFor: "address", children: "Full Address *" }),
              /* @__PURE__ */ jsx("textarea", { id: "address", name: "address", value: customerInfo.address, onChange: handleInputChange, className: `${inputStyle} h-24 resize-none`, required: true, placeholder: "House #, Street, Area..." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelStyle, htmlFor: "city", children: "City *" }),
              /* @__PURE__ */ jsx("input", { type: "text", id: "city", name: "city", value: customerInfo.city, onChange: handleInputChange, className: inputStyle, required: true, placeholder: "e.g. Lahore" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelStyle, htmlFor: "phoneNumber", children: "Phone Number (WhatsApp) *" }),
              /* @__PURE__ */ jsx("input", { type: "tel", id: "phoneNumber", name: "phoneNumber", value: customerInfo.phoneNumber, onChange: handleInputChange, className: inputStyle, required: true, placeholder: "0300-1234567" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-white mt-8 mb-4 flex items-center border-t border-gray-700 pt-6", children: [
            /* @__PURE__ */ jsx(CreditCard, { className: "mr-3 text-yellow-500", size: 24 }),
            " Payment Method"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("label", { className: `flex items-center p-4 rounded-lg cursor-pointer border transition-all ${paymentMethod === "COD" ? "bg-gray-700 border-yellow-500 ring-1 ring-yellow-500" : "bg-gray-700/50 border-gray-600 hover:bg-gray-700"}`, htmlFor: "paymentStart", children: [
              /* @__PURE__ */ jsx("input", { type: "radio", id: "paymentStart", name: "paymentMethod", value: "COD", checked: paymentMethod === "COD", onChange: () => setPaymentMethod("COD"), className: "w-5 h-5 text-yellow-500 focus:ring-yellow-500" }),
              /* @__PURE__ */ jsx("span", { className: "ml-3 text-white font-medium", children: "Cash On Delivery" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: `flex items-center p-4 rounded-lg cursor-pointer border transition-all ${paymentMethod === "EASYPAYSA" ? "bg-gray-700 border-yellow-500 ring-1 ring-yellow-500" : "bg-gray-700/50 border-gray-600 hover:bg-gray-700"}`, htmlFor: "paymentEasypaisa", children: [
              /* @__PURE__ */ jsx("input", { type: "radio", id: "paymentEasypaisa", name: "paymentMethod", value: "EASYPAYSA", checked: paymentMethod === "EASYPAYSA", onChange: () => setPaymentMethod("EASYPAYSA"), className: "w-5 h-5 text-yellow-500 focus:ring-yellow-500" }),
              /* @__PURE__ */ jsx("span", { className: "ml-3 text-white font-medium", children: "Bank / Easypaisa" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { type: "submit", disabled: isProcessing, className: `mt-8 w-full py-4 rounded-lg font-bold text-lg shadow-lg transition-all ${isProcessing ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-400 text-gray-900 hover:scale-[1.01]"}`, children: [
            /* @__PURE__ */ jsx(ShoppingBag, { className: "inline mr-2 mb-1", size: 20 }),
            isProcessing ? "Processing..." : `Place Order • Rs. ${cartTotal.toLocaleString()}`
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/3 flex-shrink-0 order-1 lg:order-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 sticky top-24", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-white mb-4 border-b border-gray-700 pb-3", children: "Order Summary" }),
        /* @__PURE__ */ jsx("div", { className: "max-h-60 overflow-y-auto pr-2 space-y-3 custom-scrollbar", children: cartItems.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start text-sm", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-gray-300 w-2/3", children: [
            item.name,
            " ",
            /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
              "x",
              item.quantity
            ] })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-white font-medium", children: [
            "Rs. ",
            (Number(item.price) * (item.quantity || 1)).toLocaleString()
          ] })
        ] }, item.id)) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-t border-gray-700 pt-4 mt-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-white text-lg font-bold", children: "Total" }),
          /* @__PURE__ */ jsxs("span", { className: "text-yellow-500 text-2xl font-bold", children: [
            "Rs. ",
            cartTotal.toLocaleString()
          ] })
        ] })
      ] }) })
    ] })
  ] });
};
export {
  CheckoutPage as default
};
