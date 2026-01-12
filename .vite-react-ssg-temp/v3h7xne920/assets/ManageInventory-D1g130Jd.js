import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { d as db } from "../index.mjs";
import { getDocs, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { RefreshCw, Search, Edit, Trash2, MessageCircle, CheckCircle, PackageCheck, XCircle } from "lucide-react";
import "vite-react-ssg";
import "firebase/auth";
import "firebase/app";
import "react-helmet-async";
import "@vercel/analytics/react";
const ManageInventory = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [inventorySearch, setInventorySearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Active");
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productSnapshot = await getDocs(collection(db, "products"));
      const list = productSnapshot.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() }));
      setProducts(list.sort((a, b) => {
        var _a, _b;
        return (((_a = b.createdAt) == null ? void 0 : _a.seconds) || 0) - (((_b = a.createdAt) == null ? void 0 : _b.seconds) || 0);
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchOrders = async () => {
    try {
      const orderSnapshot = await getDocs(collection(db, "orders"));
      const list = orderSnapshot.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() }));
      setOrders(list.sort((a, b) => {
        var _a, _b;
        return (((_a = b.placedAt) == null ? void 0 : _a.seconds) || 0) - (((_b = a.placedAt) == null ? void 0 : _b.seconds) || 0);
      }));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);
  const filteredProducts = products.filter(
    (p) => p.name.toLowerCase().includes(inventorySearch.toLowerCase())
  );
  const searchFilteredOrders = orders.filter(
    (o) => o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) || o.id.toLowerCase().includes(orderSearch.toLowerCase())
  );
  const finalOrders = searchFilteredOrders.filter((o) => {
    if (activeTab === "Active") return ["Pending Payment", "Pending Confirmation", "Processing"].includes(o.status);
    if (activeTab === "Delivered") return o.status === "Delivered";
    if (activeTab === "Cancelled") return o.status === "Cancelled";
    return true;
  });
  const getStockStatus = (stock) => {
    if (stock === 0) return /* @__PURE__ */ jsx("span", { className: "text-red-400 font-bold text-xs", children: "Out of Stock" });
    if (stock < 5) return /* @__PURE__ */ jsxs("span", { className: "text-yellow-500 font-bold text-xs", children: [
      "Low (",
      stock,
      ")"
    ] });
    return /* @__PURE__ */ jsxs("span", { className: "text-green-400 font-bold text-xs", children: [
      stock,
      " in stock"
    ] });
  };
  const handleEditClick = (id) => {
    navigate(`/admin/edit/${id}`);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteDoc(doc(db, "products", id));
      setMessage("Product deleted.");
      fetchProducts();
    }
  };
  const handleUpdateStatus = async (orderId, newStatus) => {
    const confirmMsg = newStatus === "Delivered" ? "Mark this order as completed/delivered?" : `Mark order as ${newStatus}?`;
    if (window.confirm(confirmMsg)) {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      setMessage(`Order moved to ${newStatus}.`);
      fetchOrders();
    }
  };
  const openWhatsAppNotify = (order) => {
    let msg = `Assalam-o-Alaikum ${order.customer.fullName}! `;
    if (order.status === "Processing") {
      msg += `Your WristHub Order #${order.id.substring(0, 5)} has been confirmed and is being processed.`;
    } else if (order.status === "Delivered") {
      msg += `Your WristHub Order #${order.id.substring(0, 5)} has been delivered. We hope you love your new timepiece!`;
    } else {
      msg += `Regarding your WristHub Order #${order.id.substring(0, 5)}...`;
    }
    window.open(`https://wa.me/${order.customer.phoneNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };
  if (loading) return /* @__PURE__ */ jsx("div", { className: "p-10 text-center text-white", children: "Loading Dashboard..." });
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-white mb-6", children: "Inventory & Order Management" }),
    message && /* @__PURE__ */ jsx("div", { className: "p-3 mb-4 rounded text-center bg-blue-900/50 text-blue-200", children: message }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 rounded-lg border border-gray-700 flex flex-col max-h-[85vh]", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-gray-700 space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white", children: "Inventory" }),
            /* @__PURE__ */ jsx("button", { onClick: fetchProducts, children: /* @__PURE__ */ jsx(RefreshCw, { size: 20, className: "text-gray-400 hover:text-white" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Search products...",
                value: inventorySearch,
                onChange: (e) => setInventorySearch(e.target.value),
                className: "w-full bg-gray-800 text-white text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-600 focus:border-yellow-500 focus:outline-none"
              }
            ),
            /* @__PURE__ */ jsx(Search, { size: 16, className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-y-auto p-2 flex-grow custom-scrollbar", children: filteredProducts.map((prod) => {
          var _a;
          return /* @__PURE__ */ jsxs("div", { className: "mb-3 bg-gray-800 p-3 rounded-lg border border-gray-700 flex items-center justify-between hover:bg-gray-700/50 transition-colors", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 overflow-hidden", children: [
              /* @__PURE__ */ jsx("img", { src: ((_a = prod.imageUrls) == null ? void 0 : _a[0]) || "/placeholder.png", alt: "", className: "w-12 h-12 rounded object-contain bg-white border border-gray-600" }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-sm truncate w-32 sm:w-48", children: prod.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-yellow-500 text-xs", children: [
                  "Rs. ",
                  prod.price.toLocaleString()
                ] }),
                getStockStatus(prod.stock)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex space-x-2 flex-shrink-0", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => handleEditClick(prod.id), className: "p-2 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition-colors", children: /* @__PURE__ */ jsx(Edit, { size: 16 }) }),
              /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(prod.id), className: "p-2 bg-red-600/20 text-red-400 rounded hover:bg-red-600 hover:text-white transition-colors", children: /* @__PURE__ */ jsx(Trash2, { size: 16 }) })
            ] })
          ] }, prod.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 rounded-lg border border-gray-700 flex flex-col max-h-[85vh]", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-gray-700 space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white", children: "Orders" }),
            /* @__PURE__ */ jsx("button", { onClick: fetchOrders, children: /* @__PURE__ */ jsx(RefreshCw, { size: 20, className: "text-gray-400 hover:text-white" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex space-x-2 bg-gray-800 p-1 rounded-lg", children: ["Active", "Delivered", "Cancelled"].map((tab) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveTab(tab),
              className: `flex-1 py-1 text-xs font-bold rounded-md transition-colors ${activeTab === tab ? "bg-yellow-500 text-gray-900" : "text-gray-400 hover:text-white hover:bg-gray-700"}`,
              children: tab
            },
            tab
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Search Orders...",
                value: orderSearch,
                onChange: (e) => setOrderSearch(e.target.value),
                className: "w-full bg-gray-800 text-white text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-600 focus:border-yellow-500 focus:outline-none"
              }
            ),
            /* @__PURE__ */ jsx(Search, { size: 16, className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "overflow-y-auto p-2 flex-grow custom-scrollbar", children: [
          finalOrders.map((order) => {
            var _a, _b;
            return /* @__PURE__ */ jsxs("div", { className: "p-4 mb-3 rounded-lg bg-gray-800 border border-gray-700 hover:border-gray-600 transition-colors", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm mb-2", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-yellow-500 font-bold", children: [
                  "#",
                  order.id.substring(0, 6)
                ] }),
                /* @__PURE__ */ jsx("span", { className: `px-2 rounded text-xs font-bold ${order.status === "Cancelled" ? "bg-red-900 text-red-200" : order.status === "Delivered" ? "bg-green-900 text-green-200" : order.status === "Processing" ? "bg-blue-900 text-blue-200" : "bg-gray-700 text-gray-300"}`, children: order.status })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-white font-semibold", children: (_a = order.customer) == null ? void 0 : _a.fullName }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs", children: (_b = order.customer) == null ? void 0 : _b.phoneNumber }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-[10px] uppercase mt-1", children: order.paymentMethod })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-white font-bold text-right", children: [
                  "Rs. ",
                  order.totalAmount.toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-3 border-t border-gray-700 flex flex-wrap justify-between items-center gap-2", children: [
                /* @__PURE__ */ jsx("button", { onClick: () => openWhatsAppNotify(order), className: "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 p-2 rounded text-xs font-bold transition", title: "WhatsApp Notify", children: /* @__PURE__ */ jsx(MessageCircle, { size: 16 }) }),
                activeTab === "Active" && order.status !== "Processing" && /* @__PURE__ */ jsxs("button", { onClick: () => handleUpdateStatus(order.id, "Processing"), className: "flex-grow bg-yellow-600/20 text-yellow-500 hover:bg-yellow-600/40 py-1.5 rounded text-xs font-bold flex justify-center items-center transition", children: [
                  /* @__PURE__ */ jsx(CheckCircle, { size: 14, className: "mr-1" }),
                  " Verify"
                ] }),
                activeTab === "Active" && order.status === "Processing" && /* @__PURE__ */ jsxs("button", { onClick: () => handleUpdateStatus(order.id, "Delivered"), className: "flex-grow bg-green-600/20 text-green-400 hover:bg-green-600/40 py-1.5 rounded text-xs font-bold flex justify-center items-center transition", children: [
                  /* @__PURE__ */ jsx(PackageCheck, { size: 14, className: "mr-1" }),
                  " Mark Delivered"
                ] }),
                activeTab === "Active" && /* @__PURE__ */ jsx("button", { onClick: () => handleUpdateStatus(order.id, "Cancelled"), className: "bg-red-900/30 text-red-400 hover:bg-red-900/50 p-2 rounded text-xs font-bold transition", title: "Cancel Order", children: /* @__PURE__ */ jsx(XCircle, { size: 16 }) })
              ] })
            ] }, order.id);
          }),
          finalOrders.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center p-4 text-sm", children: "No orders in this tab." })
        ] })
      ] })
    ] })
  ] });
};
export {
  ManageInventory as default
};
