import { ViteReactSSG } from "vite-react-ssg";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback, Suspense } from "react";
import { Link, NavLink, useLocation, Outlet, Navigate, useNavigate, useParams } from "react-router-dom";
import { getAuth, setPersistence, browserSessionPersistence, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";
import { User, X, Menu, Facebook, Instagram, Send, MessageSquare, Bot, Loader, ChevronUp, Home as Home$1, Search, ShoppingBag, ShieldCheck, PlusSquare, LayoutDashboard, LogOut, Watch, Venus, Mars, ChevronDown, Filter, ChevronLeft, ChevronRight, Package, ShieldAlert, CheckCircle, ShoppingCart, Trash2, XCircle } from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
const CartContext = createContext(void 0);
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem("cartItems");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map(
          (item) => item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const updateQuantity = (id, quantity) => {
    setCartItems(
      (prevItems) => prevItems.map(
        (item) => item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter((item) => (item.quantity || 0) > 0)
    );
  };
  const clearCart = () => {
    setCartItems([]);
  };
  const cartCount = cartItems.reduce((count, item) => count + (item.quantity || 0), 0);
  const cartTotal = cartItems.reduce((total, item) => total + Number(item.price) * (item.quantity || 0), 0);
  return /* @__PURE__ */ jsx(CartContext.Provider, { value: { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }, children });
};
const useCart = () => {
  const context = useContext(CartContext);
  if (context === void 0) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
const firebaseConfig = {
  apiKey: "AIzaSyAKufhdQDzsLK1oIAVEGgLkoxlfZq4k5Mg",
  authDomain: "wristhubpk-66ca1.firebaseapp.com",
  projectId: "wristhubpk-66ca1",
  storageBucket: "wristhubpk-66ca1.appspot.com",
  messagingSenderId: "22551385150",
  appId: "1:22551385150:web:b7596209ae5973a7e42d6f",
  measurementId: "G-GKFY8SMF25"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);
const db = getFirestore(app);
const useAuth = () => {
  var _a;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const adminEmail = "wristhubstore@gmail.com";
  const isAdmin = !!user && !!adminEmail && ((_a = user.email) == null ? void 0 : _a.toLowerCase().trim()) === adminEmail.toLowerCase().trim();
  return { user, loading, isAdmin };
};
const ADMIN_PATH$4 = "wristhub-store-7597-adminPanel";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { isAdmin } = useAuth();
  const activeLinkClass = "text-yellow-500 font-semibold";
  const inactiveLinkClass = "text-white hover:text-yellow-500 transition-colors duration-300 font-medium";
  const mobileLinkClass = "block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-yellow-500 hover:bg-gray-800";
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "My Orders", path: "/my-orders" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];
  return /* @__PURE__ */ jsxs("header", { className: "fixed w-full top-0 z-50 transition-all duration-300 bg-brand-dark/95 border-b border-white/5 shadow-lg", children: [
    /* @__PURE__ */ jsx("nav", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-20", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 flex items-center", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/wristhublogo.svg",
            alt: "WristHub",
            className: "h-10 w-auto object-contain"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-white font-serif text-xl tracking-widest md:hidden lg:block uppercase", children: "WristHub" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx("div", { className: "ml-10 flex items-baseline space-x-6", children: navLinks.map((link) => /* @__PURE__ */ jsx(
        NavLink,
        {
          to: link.path,
          className: ({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} text-sm`,
          children: link.name
        },
        link.name
      )) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx(
          NavLink,
          {
            to: "/shop",
            className: ({ isActive }) => `md:hidden font-bold text-sm tracking-wider mr-1 ${isActive ? "text-yellow-500" : "text-white"}`,
            children: "SHOP"
          }
        ),
        isAdmin && /* @__PURE__ */ jsx(Link, { to: `/${ADMIN_PATH$4}/inventory`, className: "text-white hover:text-yellow-500 transition-colors p-2", title: "Admin Panel", children: /* @__PURE__ */ jsx(User, { size: 24 }) }),
        /* @__PURE__ */ jsxs(Link, { to: "/cart", className: "relative text-white hover:text-yellow-500 transition-colors duration-300 p-2", children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" }) }),
          cartCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 h-5 w-5 rounded-full bg-yellow-500 text-gray-900 text-xs flex items-center justify-center font-bold animate-bounce", children: cartCount })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "md:hidden flex items-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsMenuOpen(!isMenuOpen),
            className: "text-gray-300 hover:text-white p-2 focus:outline-none",
            children: isMenuOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
          }
        ) })
      ] })
    ] }) }),
    isMenuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden bg-gray-900 border-t border-gray-800 absolute w-full left-0 top-20 shadow-xl", children: /* @__PURE__ */ jsx("div", { className: "px-4 pt-2 pb-6 space-y-1", children: navLinks.map((link) => /* @__PURE__ */ jsx(
      NavLink,
      {
        to: link.path,
        onClick: () => setIsMenuOpen(false),
        className: ({ isActive }) => `${isActive ? "text-yellow-500 bg-gray-800" : "text-gray-300"} ${mobileLinkClass}`,
        children: link.name
      },
      link.name
    )) }) })
  ] });
};
const Footer = () => {
  const email = "wristhubstore@gmail.com";
  const phonePrimary = "+923155308406";
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" }
  ];
  return /* @__PURE__ */ jsx("footer", { className: "bg-brand-darker border-t border-white/10 mt-auto relative pt-16 pb-8", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "block", children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-serif text-white tracking-widest uppercase", children: "WristHub" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed max-w-xs", children: "Own your time. We curate the finest timepieces for those who value precision and legacy." }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-gray-400 hover:text-brand-gold transition-colors", children: /* @__PURE__ */ jsx(Facebook, { size: 20 }) }),
          /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/wristhubwatch?igsh=MTg0aTUyZjhtaXVxaA==", target: "_blank", className: "text-gray-400 hover:text-brand-gold transition-colors", children: /* @__PURE__ */ jsx(Instagram, { size: 20 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-white font-serif text-lg mb-6", children: "Explore" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: navLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: link.path, className: "text-gray-400 hover:text-brand-gold text-sm transition-colors uppercase tracking-wider", children: link.name }) }, link.name)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-white font-serif text-lg mb-6", children: "Support" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-sm text-gray-400", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `mailto:${email}`, className: "hover:text-brand-gold transition-colors", children: email }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `tel:${phonePrimary}`, className: "hover:text-brand-gold transition-colors", children: phonePrimary }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-brand-gold transition-colors", children: "Contact Form" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/shipping", className: "hover:text-brand-gold transition-colors", children: "Shipping & Returns" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-white font-serif text-lg mb-6", children: "Stay Timeless" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-4", children: "Subscribe to receive updates, access to exclusive deals, and more." }),
        /* @__PURE__ */ jsxs("form", { className: "relative", onSubmit: (e) => e.preventDefault(), children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              name: "email",
              id: "newsletter-email",
              placeholder: "Enter your email",
              className: "w-full bg-gray-800 text-white px-4 py-2 rounded-l-lg border border-gray-700 focus:outline-none focus:border-yellow-500 transition-colors"
            }
          ),
          /* @__PURE__ */ jsx("button", { type: "submit", className: "absolute right-2 top-1/2 -translate-y-1/2 text-brand-gold hover:text-white transition-colors", children: /* @__PURE__ */ jsx(Send, { size: 18 }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs", children: "© 2024 WristHub. All rights reserved." }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-500" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-xs", children: "System Operational" })
      ] })
    ] })
  ] }) });
};
const uploadImageSecure = async (file, token) => {
  try {
    const toBase64 = (file2) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file2);
      reader.onload = () => {
        var _a;
        let encoded = ((_a = reader.result) == null ? void 0 : _a.toString()) || "";
        const base64Content = encoded.split(",")[1];
        resolve(base64Content);
      };
      reader.onerror = (error) => reject(error);
    });
    const imageBase64 = await toBase64(file);
    const headers = {
      "Content-Type": "application/json"
    };
    if (token) ;
    const response = await fetch(`/api/upload-image`, {
      method: "POST",
      headers,
      body: JSON.stringify({ imageBase64 })
    });
    const data = await response.json();
    if (data.success && data.data && data.data.url) {
      return data.data.url;
    } else {
      console.error("Upload failed:", data.error);
      return null;
    }
  } catch (error) {
    console.error("Secure upload error:", error);
    return null;
  }
};
const sendChatMessage = async (message) => {
  try {
    const response = await fetch(`/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    return data.reply || "No response";
  } catch (err) {
    return "Error connecting to AI server";
  }
};
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "model", text: "Assalam-o-Alaikum! WristHub mein khushamdeed. Main aapki kya madad kar sakta hoon? ⌚" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isOpen]);
  const handleSend = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
    const userMessage = userInput.trim();
    const newHistory = [...messages, { text: userMessage, sender: "user" }];
    setMessages(newHistory);
    setUserInput("");
    setIsLoading(true);
    try {
      const botReply = await sendChatMessage(userMessage);
      setMessages((prev) => [...prev, { sender: "model", text: botReply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "model", text: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "fixed bottom-6 right-6 z-[60] bg-yellow-500 text-gray-900 p-4 rounded-full shadow-2xl hover:bg-yellow-400 transition-transform transform hover:scale-110 border-2 border-gray-900",
        "aria-label": "Toggle Chat",
        children: isOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(MessageSquare, { size: 24 })
      }
    ),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "fixed bottom-24 right-6 z-[60] w-80 sm:w-96 h-[500px] max-h-[70vh] bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 p-4 border-b border-gray-700 flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-yellow-500 p-2 rounded-full", children: /* @__PURE__ */ jsx(Bot, { size: 20, className: "text-black" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-white", children: "ChronoBot AI" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-green-400 flex items-center", children: "● Online" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { ref: chatBoxRef, className: "flex-grow p-4 overflow-y-auto space-y-3 bg-gray-800/95 scrollbar-thin scrollbar-thumb-gray-600", children: [
        messages.map((msg, index) => /* @__PURE__ */ jsx("div", { className: `flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-md ${msg.sender === "user" ? "bg-yellow-500 text-gray-900 rounded-tr-none font-medium" : "bg-gray-700 text-white rounded-tl-none border border-gray-600"}`, children: msg.text }) }, index)),
        isLoading && /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-700 px-4 py-2 rounded-2xl rounded-tl-none border border-gray-600 flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(Loader, { className: "animate-spin text-yellow-500", size: 16 }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Thinking..." })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("form", { onSubmit: handleSend, className: "p-3 bg-gray-900 border-t border-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: userInput,
            onChange: (e) => setUserInput(e.target.value),
            placeholder: "Ask about watches...",
            className: "flex-grow bg-gray-800 text-white text-sm border border-gray-600 rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: isLoading || !userInput.trim(),
            className: "bg-yellow-500 text-gray-900 p-3 rounded-full hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            children: /* @__PURE__ */ jsx(Send, { size: 18 })
          }
        )
      ] }) })
    ] })
  ] });
};
const WhatsAppLink = () => {
  const whatsappNumber = "923155308406";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Assalam-o-Alaikum!%20I%20am%20interested%20in%20a%20watch%20from%20WristHub.`;
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) return null;
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: whatsappUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "fixed bottom-24 right-6 z-[50] p-0 rounded-full shadow-xl transition-all hover:scale-110 hover:-translate-y-1",
      "aria-label": "Chat on WhatsApp",
      title: "Chat with us on WhatsApp",
      children: /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg border-2 border-white/10", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "32", height: "32", fill: "white", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" }) }) })
    }
  );
};
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: scrollToTop,
      className: `fixed bottom-24 right-6 z-40 p-3 rounded-full bg-yellow-500 text-gray-900 shadow-lg hover:bg-yellow-400 hover:shadow-glow-md transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`,
      "aria-label": "Back to top",
      children: /* @__PURE__ */ jsx(ChevronUp, { size: 24, strokeWidth: 2.5 })
    }
  );
};
const MobileBottomNav = () => {
  const { cartCount } = useCart();
  const navItems = [
    { icon: /* @__PURE__ */ jsx(Home$1, { size: 22 }), label: "Home", path: "/" },
    { icon: /* @__PURE__ */ jsx(Search, { size: 22 }), label: "Shop", path: "/shop" },
    {
      icon: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(ShoppingBag, { size: 22 }),
        cartCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-2 -right-2 h-4 w-4 rounded-full bg-yellow-500 text-gray-900 text-[10px] flex items-center justify-center font-bold", children: cartCount > 9 ? "9+" : cartCount })
      ] }),
      label: "Cart",
      path: "/cart"
    },
    { icon: /* @__PURE__ */ jsx(Menu, { size: 22 }), label: "More", path: "/about" }
  ];
  return /* @__PURE__ */ jsx("nav", { className: "md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 safe-area-pb", children: /* @__PURE__ */ jsx("div", { className: "flex justify-around items-center h-16", children: navItems.map((item) => /* @__PURE__ */ jsxs(
    NavLink,
    {
      to: item.path,
      className: ({ isActive }) => `flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive ? "text-yellow-500" : "text-gray-400 hover:text-white"}`,
      children: [
        item.icon,
        /* @__PURE__ */ jsx("span", { className: "text-[10px] mt-1 font-medium", children: item.label })
      ]
    },
    item.path
  )) }) });
};
const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const path = location.pathname.split("/")[1];
  const showWhatsAppOnly = path === "contact" || path === "about";
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen font-sans bg-gray-900 text-gray-100 selection:bg-yellow-500 selection:text-gray-900", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: `flex-grow relative z-0 pb-20 md:pb-0 ${isHomePage ? "w-full" : "container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 md:pb-8"}`, children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative z-50", children: [
      showWhatsAppOnly && /* @__PURE__ */ jsx(WhatsAppLink, {}),
      !showWhatsAppOnly && /* @__PURE__ */ jsx(Chatbot, {}),
      /* @__PURE__ */ jsx(BackToTop, {})
    ] }),
    /* @__PURE__ */ jsx(MobileBottomNav, {})
  ] });
};
const ADMIN_PATH$3 = "wristhub-store-7597-adminPanel";
const ClientRoute = () => {
  const { isAdmin, loading } = useAuth();
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "text-white text-center mt-20", children: "Loading..." });
  }
  if (isAdmin) {
    return /* @__PURE__ */ jsx(Navigate, { to: `/${ADMIN_PATH$3}/inventory`, replace: true });
  }
  return /* @__PURE__ */ jsx(Outlet, {});
};
const ADMIN_PATH$2 = "wristhub-store-7597-adminPanel";
const AdminLayout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    navigate(`/${ADMIN_PATH$2}`);
  };
  const linkStyle = "flex items-center px-4 py-2 rounded-md transition-all duration-200";
  const activeLink = "bg-yellow-500 text-gray-900 font-bold shadow-lg transform scale-105";
  const inactiveLink = "text-gray-300 hover:bg-gray-800 hover:text-white";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-900 text-white", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-gray-800 border-b border-gray-700 sticky top-0 z-40", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center py-4 space-y-4 md:space-y-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(ShieldCheck, { className: "text-yellow-500", size: 32 }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-white tracking-wide", children: "Admin Panel" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Secure Management Dashboard" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "flex items-center space-x-2 sm:space-x-4 w-full md:w-auto justify-center", children: [
        /* @__PURE__ */ jsxs(
          NavLink,
          {
            to: `/${ADMIN_PATH$2}/add`,
            className: ({ isActive }) => `${linkStyle} ${isActive ? activeLink : inactiveLink}`,
            children: [
              /* @__PURE__ */ jsx(PlusSquare, { size: 18, className: "mr-2" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm sm:text-base", children: "Add Product" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          NavLink,
          {
            to: `/${ADMIN_PATH$2}/inventory`,
            className: ({ isActive }) => `${linkStyle} ${isActive ? activeLink : inactiveLink}`,
            children: [
              /* @__PURE__ */ jsx(LayoutDashboard, { size: 18, className: "mr-2" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm sm:text-base", children: "Inventory" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "h-6 w-px bg-gray-600 mx-2" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleLogout,
            className: "flex items-center text-red-400 hover:text-red-300 hover:bg-red-900/20 px-3 py-2 rounded-md transition-colors font-medium text-sm",
            children: [
              /* @__PURE__ */ jsx(LogOut, { size: 18, className: "mr-2" }),
              "Logout"
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("main", { className: "max-w-7xl mx-auto p-4 sm:p-6 lg:p-8", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
};
const ADMIN_PATH$1 = "wristhub-store-7597-adminPanel";
const AdminRoute = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-900 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500" }) });
  }
  if (!user) {
    return /* @__PURE__ */ jsx(Navigate, { to: `/${ADMIN_PATH$1}`, replace: true });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-red-900/20 border border-red-500 p-8 rounded-lg text-center max-w-md shadow-2xl", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-red-500 mb-4", children: "Access Denied 🔒" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 mb-2", children: "You are logged in as:" }),
      /* @__PURE__ */ jsx("p", { className: "text-white font-mono bg-black/50 p-2 rounded mb-6 border border-gray-700 break-all", children: user.email }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-6", children: "This account does not have administrative privileges." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => navigate("/"),
          className: "bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded font-bold transition border border-gray-600",
          children: "Go to Home Page"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsx(Outlet, {});
};
const SEO = ({
  title,
  description = "Discover WristHub's premium collection of luxury watches in Pakistan. Elegant designs, superior craftsmanship, and nationwide delivery.",
  canonicalUrl = "https://wristhub.pk",
  image = "https://wristhub.pk/wristhublogo.svg",
  type = "website",
  schema
}) => {
  const siteTitle = `${title} | WristHub Premium`;
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "WristHub Premium Watches",
    "image": "https://wristhub.pk/wristhublogo.svg",
    "@id": "https://wristhub.pk",
    "url": "https://wristhub.pk",
    "telephone": "+923000000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Main Market",
      "addressLocality": "Lahore",
      "postalCode": "54000",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 31.5204,
      "longitude": 74.3587
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "22:00"
    },
    "sameAs": [
      "https://www.facebook.com/wristhubpk",
      "https://www.instagram.com/wristhubpk"
    ]
  };
  const finalSchema = schema || localBusinessSchema;
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: siteTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: siteTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: image }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "en_PK" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: siteTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: image }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(finalSchema) })
  ] });
};
const Home = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SEO, { title: "Coming Soon" }),
    /* @__PURE__ */ jsxs("div", { style: {
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      padding: "50px",
      background: "#f7f7f7",
      color: "#333",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ jsx("h1", { style: { fontSize: "50px", marginBottom: "20px" }, children: "🚧 We'll Be Back Soon!" }),
      /* @__PURE__ */ jsx("p", { style: { fontSize: "20px" }, children: "We are updating our store for a better experience. Please check back shortly." })
    ] })
  ] });
};
const ProductCard = ({ product }) => {
  let coverImage = "https://placehold.co/300?text=No+Image";
  if (product.variants && product.variants.length > 0 && product.variants[0].images.length > 0) {
    coverImage = product.variants[0].images[0];
  } else if (product.imageUrls && product.imageUrls.length > 0) {
    coverImage = product.imageUrls[0];
  }
  let hoverImage = coverImage;
  if (product.variants && product.variants.length > 0 && product.variants[0].images.length > 1) {
    hoverImage = product.variants[0].images[1];
  } else if (product.imageUrls && product.imageUrls.length > 1) {
    hoverImage = product.imageUrls[1];
  }
  const getGenderIcon = (gender) => {
    switch (gender) {
      case "Male":
        return /* @__PURE__ */ jsx(Mars, { size: 16, className: "text-blue-400" });
      case "Female":
        return /* @__PURE__ */ jsx(Venus, { size: 16, className: "text-pink-400" });
      default:
        return /* @__PURE__ */ jsx(Watch, { size: 16, className: "text-gray-400" });
    }
  };
  const originalPrice = product.originalPrice || 0;
  const discount = product.discount || 0;
  const hasDiscount = discount > 0 && originalPrice > product.price;
  return /* @__PURE__ */ jsxs("div", { className: "group relative bg-gray-800 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-700 hover:border-brand-gold/20 flex flex-col h-full", children: [
    /* @__PURE__ */ jsxs(Link, { to: `/product/${product.id}`, className: "block relative aspect-[4/5] bg-gray-700 overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: `w-full h-full object-cover object-center transition-opacity duration-300 ease-in-out ${hoverImage !== coverImage ? "group-hover:opacity-0" : ""}`,
          src: coverImage,
          alt: product.name,
          loading: "lazy",
          decoding: "async",
          width: "300",
          height: "375"
        }
      ),
      hoverImage !== coverImage && /* @__PURE__ */ jsx(
        "img",
        {
          className: "absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out",
          src: hoverImage,
          alt: `${product.name} alternate view`,
          loading: "lazy",
          decoding: "async",
          width: "300",
          height: "375"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute top-2 left-2 flex flex-col gap-1 z-10", children: hasDiscount && /* @__PURE__ */ jsxs("span", { className: "bg-brand-gold text-brand-darker text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wider shadow-sm", children: [
        Math.round(discount),
        "% OFF"
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2 p-1.5 bg-gray-900/60 backdrop-blur-[2px] rounded-full text-white/80 hover:text-white transition-colors z-10", children: getGenderIcon(product.gender) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-3 flex flex-col flex-grow", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xs sm:text-sm font-medium text-gray-100 group-hover:text-brand-gold transition-colors line-clamp-1 mb-1 font-sans tracking-wide", children: product.name }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2 mt-auto", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-sm sm:text-base font-bold text-brand-gold-light", children: [
          "Rs. ",
          product.price.toLocaleString()
        ] }),
        hasDiscount && /* @__PURE__ */ jsxs("span", { className: "text-[10px] sm:text-xs text-gray-500 line-through decoration-brand-gold/50", children: [
          "Rs. ",
          originalPrice.toLocaleString()
        ] })
      ] })
    ] })
  ] });
};
const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brandFilter, setBrandFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [priceSort, setPriceSort] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const uniqueBrands = useMemo(() => {
    const brands = new Set(allProducts.map((p) => p.brand).filter((b) => !!b));
    return ["All", ...Array.from(brands).sort()];
  }, [allProducts]);
  const filteredProducts = useMemo(() => {
    let list = [...allProducts];
    if (brandFilter !== "All") {
      list = list.filter((p) => p.brand === brandFilter);
    }
    if (genderFilter !== "All") {
      list = list.filter((p) => p.gender === genderFilter);
    }
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(lowerCaseSearch) || p.brand && p.brand.toLowerCase().includes(lowerCaseSearch)
      );
    }
    if (priceSort === "asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (priceSort === "desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (priceSort === "newest") {
      list.sort((a, b) => {
        var _a, _b;
        return (((_a = b.createdAt) == null ? void 0 : _a.seconds) || 0) - (((_b = a.createdAt) == null ? void 0 : _b.seconds) || 0);
      });
    }
    return list;
  }, [allProducts, brandFilter, genderFilter, priceSort, searchTerm]);
  const resetFilters = () => {
    setBrandFilter("All");
    setGenderFilter("All");
    setPriceSort("newest");
    setSearchTerm("");
  };
  const [visibleCount, setVisibleCount] = useState(12);
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };
  useEffect(() => {
    setVisibleCount(12);
  }, [brandFilter, genderFilter, priceSort, searchTerm]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = [];
        querySnapshot.docs.forEach((doc) => {
          const data = doc.data();
          let images = [];
          if (data.variants && Array.isArray(data.variants) && data.variants.length > 0) {
            images = data.variants[0].images;
          } else if (data.imageUrls && Array.isArray(data.imageUrls)) {
            images = data.imageUrls;
          } else if (typeof data.imageUrl === "string") {
            images = [data.imageUrl];
          }
          const price = Number(data.price);
          const original = data.originalPrice ? Number(data.originalPrice) : 0;
          productsData.push({
            id: doc.id,
            name: data.name,
            price,
            originalPrice: original,
            discount: data.discount || 0,
            description: data.description,
            brand: data.brand || "Unbranded",
            gender: data.gender || "Unisex",
            imageUrls: images,
            createdAt: data.createdAt
          });
        });
        setAllProducts(productsData);
      } catch (err) {
        setError("Failed to load products. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  if (loading) return /* @__PURE__ */ jsxs("div", { className: "min-h-[60vh] bg-gray-900 flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500 mb-4" }),
    /* @__PURE__ */ jsx("p", { className: "text-white text-xl font-semibold", children: "Curating Collection..." })
  ] });
  if (error) return /* @__PURE__ */ jsx("div", { className: "text-red-500 text-center mt-20 p-4 bg-red-900/20 border border-red-500 mx-4 rounded", children: error });
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 min-h-screen pt-24 pb-12", children: [
    /* @__PURE__ */ jsx(SEO, { title: "Shop", description: "Browse our exclusive collection of luxury watches." }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "h-[120px] mb-8 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 rounded-2xl flex flex-col items-center justify-center p-4 shadow-glow-md relative overflow-hidden group", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-extrabold text-white uppercase tracking-widest drop-shadow-lg z-10 text-center", children: "Premium Collection" }),
        /* @__PURE__ */ jsx("p", { className: "text-yellow-100 text-sm md:text-base font-medium z-10 mt-1", children: "Find your perfect timepiece" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl shadow-lg mb-8 flex flex-col lg:flex-row gap-4 items-center border border-gray-700/50 relative z-30 transition-all", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full lg:w-1/3 group", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search watches, brands...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 pl-11 placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all group-hover:bg-gray-600"
            }
          ),
          /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-yellow-500 transition-colors", size: 20 }),
          searchTerm && /* @__PURE__ */ jsx("button", { onClick: () => setSearchTerm(""), className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white", children: /* @__PURE__ */ jsx(X, { size: 16 }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap md:flex-nowrap gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 items-center custom-scrollbar", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-grow md:flex-grow-0 min-w-[140px]", children: [
            /* @__PURE__ */ jsx("select", { value: brandFilter, onChange: (e) => setBrandFilter(e.target.value), className: "appearance-none w-full md:w-48 bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 pr-10 focus:ring-2 focus:ring-yellow-500 cursor-pointer hover:bg-gray-600 transition-colors", children: uniqueBrands.map((brand) => /* @__PURE__ */ jsx("option", { value: brand, children: brand === "All" ? "All Brands" : brand }, brand)) }),
            /* @__PURE__ */ jsx(ChevronDown, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none", size: 18 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex-grow md:flex-grow-0 min-w-[140px]", children: [
            /* @__PURE__ */ jsxs("select", { value: genderFilter, onChange: (e) => setGenderFilter(e.target.value), className: "appearance-none w-full md:w-40 bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 pr-10 focus:ring-2 focus:ring-yellow-500 cursor-pointer hover:bg-gray-600 transition-colors", children: [
              /* @__PURE__ */ jsx("option", { value: "All", children: "All Genders" }),
              /* @__PURE__ */ jsx("option", { value: "Male", children: "Male ♂️" }),
              /* @__PURE__ */ jsx("option", { value: "Female", children: "Female ♀️" })
            ] }),
            /* @__PURE__ */ jsx(ChevronDown, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none", size: 18 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex-grow md:flex-grow-0 min-w-[140px]", children: [
            /* @__PURE__ */ jsxs("select", { value: priceSort, onChange: (e) => setPriceSort(e.target.value), className: "appearance-none w-full md:w-40 bg-gray-700 text-white border border-gray-600 rounded-lg py-3 px-4 pr-10 focus:ring-2 focus:ring-yellow-500 cursor-pointer hover:bg-gray-600 transition-colors", children: [
              /* @__PURE__ */ jsx("option", { value: "newest", children: "Sort: Newest" }),
              /* @__PURE__ */ jsx("option", { value: "asc", children: "Price: Low to High" }),
              /* @__PURE__ */ jsx("option", { value: "desc", children: "Price: High to Low" })
            ] }),
            /* @__PURE__ */ jsx(ChevronDown, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none", size: 18 })
          ] }),
          (brandFilter !== "All" || genderFilter !== "All" || priceSort !== "newest" || searchTerm) && /* @__PURE__ */ jsx("button", { onClick: resetFilters, className: "px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors whitespace-nowrap", children: "Reset" })
        ] })
      ] }),
      filteredProducts.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center text-gray-400 py-24 bg-gray-800/50 rounded-xl border border-gray-700 border-dashed", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-gray-800 p-4 rounded-full inline-block mb-4", children: /* @__PURE__ */ jsx(Filter, { className: "text-yellow-500", size: 48 }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "No watches found" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "We couldn't find any matches for your filters." }),
        /* @__PURE__ */ jsx("button", { onClick: resetFilters, className: "bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors", children: "Clear All Filters" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6", children: visibleProducts.map((product) => /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsx(ProductCard, { product }) }, product.id)) }),
        visibleCount < filteredProducts.length && /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleLoadMore,
            className: "px-8 py-3 bg-gray-800 text-white border border-gray-600 rounded-full hover:bg-yellow-500 hover:text-gray-900 hover:border-yellow-500 transition-all font-bold tracking-wider uppercase text-sm",
            children: [
              "Load More Watches (",
              filteredProducts.length - visibleCount,
              " remaining)"
            ]
          }
        ) })
      ] })
    ] })
  ] });
};
const ProductDetailsPage = () => {
  var _a, _b;
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        const q = query(collection(db, "products"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const data = docSnap.data();
          const prod = { id: docSnap.id, ...data };
          if (!prod.variants && prod.imageUrls) {
            prod.variants = [{ color: "Standard", images: prod.imageUrls }];
          }
          setProduct(prod);
          if (prod.variants) {
            prod.variants.forEach((variant) => {
              variant.images.forEach((url) => {
                const img = new Image();
                img.src = url;
              });
            });
          }
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        console.error(err);
        setError(`Failed to fetch product. Please try again.`);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);
  const currentImages = ((_b = (_a = product == null ? void 0 : product.variants) == null ? void 0 : _a[activeVariantIndex]) == null ? void 0 : _b.images) || [];
  const nextImage = useCallback(() => {
    setSelectedImageIndex((prev) => prev === currentImages.length - 1 ? 0 : prev + 1);
  }, [currentImages]);
  const prevImage = useCallback(() => {
    setSelectedImageIndex((prev) => prev === 0 ? currentImages.length - 1 : prev - 1);
  }, [currentImages]);
  const triggerFlingAnimation = () => {
    const imgElement = document.getElementById("main-product-image");
    if (!imgElement) return;
    const ghost = imgElement.cloneNode(true);
    const rect = imgElement.getBoundingClientRect();
    ghost.style.position = "fixed";
    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    ghost.style.zIndex = "9999";
    ghost.style.pointerEvents = "none";
    ghost.style.objectFit = "contain";
    ghost.style.transition = "all 0.8s cubic-bezier(0.2, 1, 0.3, 1)";
    ghost.style.borderRadius = "12px";
    ghost.style.opacity = "0.9";
    document.body.appendChild(ghost);
    requestAnimationFrame(() => {
      const targetX = window.innerWidth - 60;
      const targetY = 25;
      ghost.style.left = `${targetX}px`;
      ghost.style.top = `${targetY}px`;
      ghost.style.width = "30px";
      ghost.style.height = "30px";
      ghost.style.opacity = "0";
      ghost.style.transform = "rotate(360deg) scale(0.5)";
    });
    setTimeout(() => {
      if (document.body.contains(ghost)) {
        document.body.removeChild(ghost);
      }
    }, 800);
  };
  const handleAddToCart = () => {
    var _a2, _b2;
    if (!product || isAdmin) return;
    triggerFlingAnimation();
    const selectedColor = ((_b2 = (_a2 = product.variants) == null ? void 0 : _a2[activeVariantIndex]) == null ? void 0 : _b2.color) || "Standard";
    const cartItemName = selectedColor !== "Standard" ? `${product.name} (${selectedColor})` : product.name;
    addToCart({
      id: product.id,
      name: cartItemName,
      price: product.price,
      imageUrl: currentImages[0] || "https://via.placeholder.com/300",
      quantity: 1
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2e3);
  };
  const renderDescription = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    return /* @__PURE__ */ jsx("div", { className: "text-gray-300 text-base leading-relaxed space-y-2 my-6 bg-gray-900/50 p-4 rounded-lg border border-gray-700", children: lines.map((line, index) => {
      if (line.trim().startsWith("-")) {
        return /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx("span", { className: "text-yellow-500 mr-2 mt-1.5 text-xs", children: "●" }),
          /* @__PURE__ */ jsx("span", { children: line.replace("-", "").trim() })
        ] }, index);
      }
      if (line.trim().length === 0) return /* @__PURE__ */ jsx("br", {}, index);
      return /* @__PURE__ */ jsx("p", { children: line }, index);
    }) });
  };
  const productSchema = useMemo(() => {
    if (!product) return void 0;
    return {
      "@context": "https://schema.org/",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://wristhub.pk/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Shop",
              "item": "https://wristhub.pk/shop"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": product.name,
              "item": window.location.href
            }
          ]
        },
        {
          "@type": "Product",
          "name": product.name,
          "image": product.imageUrls,
          "description": product.description,
          "sku": product.id,
          "brand": {
            "@type": "Brand",
            "name": "WristHub"
          },
          "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "PKR",
            "price": product.price,
            "availability": product.stock && product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition"
          }
        }
      ]
    };
  }, [product]);
  if (loading) return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-900 flex items-center justify-center text-white", children: "Loading..." });
  if (error) return /* @__PURE__ */ jsx("div", { className: "text-center text-red-500 mt-20", children: error });
  if (!product) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 min-h-screen py-8 px-4", children: [
    product && /* @__PURE__ */ jsx(
      SEO,
      {
        title: product.name,
        description: `Buy ${product.name} in Pakistan. Price: Rs. ${product.price.toLocaleString()}. ${product.description.substring(0, 100)}...`,
        image: currentImages[0],
        type: "product",
        schema: productSchema
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto bg-gray-800 p-6 md:p-10 rounded-2xl shadow-2xl border border-gray-700", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center border border-gray-600 shadow-inner group", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              id: "main-product-image",
              src: currentImages[selectedImageIndex],
              alt: "Product",
              className: "w-full h-full object-contain p-6 transition-transform duration-500 hover:scale-110"
            }
          ),
          currentImages.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("button", { onClick: prevImage, className: "absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/80 text-white p-3 rounded-full hover:bg-yellow-500 hover:text-black transition-all opacity-0 group-hover:opacity-100", children: /* @__PURE__ */ jsx(ChevronLeft, { size: 24 }) }),
            /* @__PURE__ */ jsx("button", { onClick: nextImage, className: "absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/80 text-white p-3 rounded-full hover:bg-yellow-500 hover:text-black transition-all opacity-0 group-hover:opacity-100", children: /* @__PURE__ */ jsx(ChevronRight, { size: 24 }) })
          ] })
        ] }),
        currentImages.length > 1 && /* @__PURE__ */ jsx("div", { className: "flex space-x-3 mt-6 overflow-x-auto pb-2 scrollbar-hide justify-center", children: currentImages.map((url, index) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedImageIndex(index),
            className: `w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden p-1 border-2 transition-all ${selectedImageIndex === index ? "border-yellow-500 scale-105" : "border-gray-600 hover:border-gray-400 opacity-70 hover:opacity-100"}`,
            children: /* @__PURE__ */ jsx("img", { src: url, alt: "thumb", className: "w-full h-full object-contain" })
          },
          index
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight", children: product.name }),
          product.stock && product.stock > 0 ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center bg-green-900/50 text-green-300 text-xs font-bold px-3 py-1 rounded-full border border-green-700 uppercase tracking-wider", children: [
            /* @__PURE__ */ jsx(Package, { size: 14, className: "mr-1" }),
            " In Stock (",
            product.stock,
            ")"
          ] }) : /* @__PURE__ */ jsx("span", { className: "inline-flex items-center bg-red-900/50 text-red-300 text-xs font-bold px-3 py-1 rounded-full border border-red-700 uppercase tracking-wider", children: "Out of Stock" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-5xl font-bold text-yellow-400 mb-8 tracking-tight", children: [
          "Rs. ",
          product.price.toLocaleString()
        ] }),
        product.variants && product.variants.length > 1 && /* @__PURE__ */ jsxs("div", { className: "mb-8 bg-gray-900/50 p-4 rounded-lg border border-gray-700", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-gray-400 uppercase tracking-wider mb-3", children: [
            "Select Variation: ",
            /* @__PURE__ */ jsx("span", { className: "text-white ml-1", children: product.variants[activeVariantIndex].color })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: product.variants.map((v, idx) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setActiveVariantIndex(idx);
                setSelectedImageIndex(0);
              },
              className: `px-5 py-2 rounded-md border-2 transition-all text-sm font-bold ${activeVariantIndex === idx ? "bg-yellow-500 text-gray-900 border-yellow-500 shadow-lg scale-105" : "bg-gray-800 text-white border-gray-600 hover:border-gray-400"}`,
              children: v.color
            },
            idx
          )) })
        ] }),
        renderDescription(product.description),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-6 border-t border-gray-700", children: [
          isAdmin ? /* @__PURE__ */ jsxs("div", { className: "w-full py-4 px-6 rounded-xl bg-red-900/20 border border-red-500/50 text-red-200 font-bold flex items-center justify-center cursor-not-allowed shadow-lg", children: [
            /* @__PURE__ */ jsx(ShieldAlert, { className: "mr-2" }),
            " Admin View Only (Purchase Disabled)"
          ] }) : /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleAddToCart,
              disabled: isAdded || product.stock === 0,
              className: `w-full py-4 px-6 rounded-xl font-extrabold text-lg uppercase tracking-widest flex items-center justify-center shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 ${isAdded ? "bg-green-600 text-white" : product.stock === 0 ? "bg-gray-600 cursor-not-allowed text-gray-400" : "bg-yellow-500 text-gray-900 hover:bg-yellow-400"}`,
              children: [
                isAdded ? /* @__PURE__ */ jsx(CheckCircle, { className: "mr-2", size: 24 }) : /* @__PURE__ */ jsx(ShoppingCart, { className: "mr-2", size: 24 }),
                isAdded ? "Added to Cart!" : product.stock === 0 ? "Out of Stock" : "Add to Cart"
              ]
            }
          ),
          /* @__PURE__ */ jsxs("button", { onClick: () => navigate("/shop"), className: "w-full mt-4 py-3 px-6 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-gray-700 transition duration-300 flex items-center justify-center", children: [
            /* @__PURE__ */ jsx(ChevronLeft, { size: 16, className: "mr-1" }),
            " Continue Shopping"
          ] })
        ] })
      ] })
    ] })
  ] });
};
const CartPage = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };
  if (cartItems.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] bg-gray-900 rounded-xl p-10 mt-10 shadow-2xl mx-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-4 text-white text-center", children: "Your Cart is Empty 🛒" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg mb-8 text-gray-400 text-center", children: "Time to find your next luxury timepiece." }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/shop",
          className: "px-8 py-3 rounded-lg font-semibold text-lg bg-yellow-500 hover:bg-yellow-600 text-gray-900 transition duration-300 shadow-lg",
          children: "Go to Shop"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "py-8 min-h-screen bg-gray-900", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-center text-white mb-12", children: "Your Shopping Cart" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-grow lg:w-2/3 bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700", children: [
        cartItems.map((item) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6 border-b border-gray-700 py-6 last:border-b-0",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 w-full sm:w-1/2", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-600 bg-white", children: /* @__PURE__ */ jsx("img", { src: item.imageUrl, alt: item.name, className: "w-full h-full object-contain p-1" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-white leading-tight", children: item.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-yellow-400 text-base mt-1", children: [
                    "Rs. ",
                    Number(item.price).toLocaleString()
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 w-full sm:w-auto justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 bg-gray-700 rounded-lg p-1", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleQuantityChange(item.id, (item.quantity || 1) - 1),
                      className: "px-3 py-1 text-white hover:text-yellow-500 transition",
                      disabled: (item.quantity || 1) <= 1,
                      children: "-"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "text-white text-base font-medium w-4 text-center", children: item.quantity || 1 }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleQuantityChange(item.id, (item.quantity || 1) + 1),
                      className: "px-3 py-1 text-white hover:text-yellow-500 transition",
                      children: "+"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-24 text-right hidden md:block", children: /* @__PURE__ */ jsxs("span", { className: "text-white font-bold", children: [
                  "Rs. ",
                  ((item.quantity || 1) * Number(item.price)).toLocaleString()
                ] }) }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => removeFromCart(item.id),
                    className: "p-2 text-red-500 hover:text-red-400 hover:bg-gray-700 rounded-full transition",
                    "aria-label": "Remove item",
                    children: /* @__PURE__ */ jsx(Trash2, { size: 20 })
                  }
                )
              ] })
            ]
          },
          item.id
        )),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-6", children: /* @__PURE__ */ jsx("button", { onClick: clearCart, className: "text-red-400 hover:text-red-300 text-sm underline decoration-red-500/30", children: "Clear Cart" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/3 flex-shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700 sticky top-24", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-6 border-b border-gray-700 pb-4", children: "Order Summary" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Subtotal:" }),
          /* @__PURE__ */ jsxs("span", { className: "text-white font-semibold", children: [
            "Rs. ",
            cartTotal.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Shipping:" }),
          /* @__PURE__ */ jsx("span", { className: "text-green-400 text-sm", children: "Calculated at checkout" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-t border-gray-700 pt-4 mt-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-white text-lg font-bold", children: "Total:" }),
          /* @__PURE__ */ jsxs("span", { className: "text-yellow-500 text-2xl font-bold", children: [
            "Rs. ",
            cartTotal.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => navigate("/checkout"),
            className: "mt-6 w-full py-3 rounded-lg font-bold text-gray-900 bg-yellow-500 hover:bg-yellow-400 transition-all transform hover:scale-[1.02] shadow-lg",
            children: "Proceed to Checkout"
          }
        )
      ] }) })
    ] })
  ] });
};
const NotFound = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-6xl font-bold text-gray-600 mb-4", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-400 mb-8", children: "Page Not Found" }),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors",
        children: "Go Home"
      }
    )
  ] });
};
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
const ToastContext = createContext(void 0);
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3e3);
  }, []);
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return /* @__PURE__ */ jsx(CheckCircle, { className: "text-green-400", size: 22 });
      case "error":
        return /* @__PURE__ */ jsx(XCircle, { className: "text-red-400", size: 22 });
      case "cart":
        return /* @__PURE__ */ jsx(ShoppingCart, { className: "text-yellow-400", size: 22 });
    }
  };
  const getBgColor = (type) => {
    switch (type) {
      case "success":
        return "border-green-500/30 bg-green-500/10";
      case "error":
        return "border-red-500/30 bg-red-500/10";
      case "cart":
        return "border-yellow-500/30 bg-yellow-500/10";
    }
  };
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: { showToast }, children: [
    children,
    /* @__PURE__ */ jsx("div", { className: "fixed top-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none", children: toasts.map((toast) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-xl animate-slide-up ${getBgColor(toast.type)}`,
        children: [
          getIcon(toast.type),
          /* @__PURE__ */ jsx("span", { className: "text-white font-medium text-sm", children: toast.message }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => removeToast(toast.id),
              className: "ml-2 text-gray-400 hover:text-white transition-colors",
              children: /* @__PURE__ */ jsx(X, { size: 16 })
            }
          )
        ]
      },
      toast.id
    )) })
  ] });
};
const PageLoader = () => /* @__PURE__ */ jsx("div", { className: "min-h-[60vh] flex flex-col items-center justify-center bg-gray-900", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4" }) });
const App = () => {
  return /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(ToastProvider, { children: /* @__PURE__ */ jsxs(CartProvider, { children: [
    /* @__PURE__ */ jsx(Analytics, {}),
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(PageLoader, {}), children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] }) }) });
};
const About = React.lazy(() => import("./assets/About-BF7n0xsj.js"));
const Contact = React.lazy(() => import("./assets/Contact-5M8-GSpb.js"));
const FAQ = React.lazy(() => import("./assets/FAQ-Cl1Tr-Fx.js"));
const CheckoutPage = React.lazy(() => import("./assets/CheckoutPage-DhOHDdRU.js"));
const OrderConfirmation = React.lazy(() => import("./assets/OrderConfirmation-DARN8iRX.js"));
const ReviewsPage = React.lazy(() => import("./assets/ReviewsPage-DemEYnn0.js"));
const MyOrders = React.lazy(() => import("./assets/MyOrders-D1ws0SdJ.js"));
const AdminLogin = React.lazy(() => import("./assets/AdminLogin-BvZVjXMM.js"));
const AddProduct = React.lazy(() => import("./assets/AddProduct-wLJfF3zF.js"));
const EditProduct = React.lazy(() => import("./assets/EditProduct-WEAMq9gy.js"));
const ManageInventory = React.lazy(() => import("./assets/ManageInventory-D1g130Jd.js"));
const ADMIN_PATH = "wristhub-store-7597-adminPanel";
const routes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(App, {}),
    children: [
      {
        element: /* @__PURE__ */ jsx(MainLayout, {}),
        children: [
          {
            element: /* @__PURE__ */ jsx(ClientRoute, {}),
            children: [
              { index: true, element: /* @__PURE__ */ jsx(Home, {}) },
              { path: "shop", element: /* @__PURE__ */ jsx(Shop, {}) },
              { path: "about", element: /* @__PURE__ */ jsx(About, {}) },
              { path: "contact", element: /* @__PURE__ */ jsx(Contact, {}) },
              { path: "faq", element: /* @__PURE__ */ jsx(FAQ, {}) },
              { path: "cart", element: /* @__PURE__ */ jsx(CartPage, {}) },
              { path: "checkout", element: /* @__PURE__ */ jsx(CheckoutPage, {}) },
              { path: "watches/:slug", element: /* @__PURE__ */ jsx(ProductDetailsPage, {}) },
              { path: "product/:id", element: /* @__PURE__ */ jsx(ProductDetailsPage, {}) },
              { path: "confirmation/:method", element: /* @__PURE__ */ jsx(OrderConfirmation, {}) },
              { path: "reviews", element: /* @__PURE__ */ jsx(ReviewsPage, {}) },
              { path: "my-orders", element: /* @__PURE__ */ jsx(MyOrders, {}) }
            ]
          }
        ]
      },
      { path: ADMIN_PATH, element: /* @__PURE__ */ jsx(AdminLogin, {}) },
      {
        element: /* @__PURE__ */ jsx(AdminLayout, {}),
        children: [
          {
            element: /* @__PURE__ */ jsx(AdminRoute, {}),
            children: [
              { path: `${ADMIN_PATH}/add`, element: /* @__PURE__ */ jsx(AddProduct, {}) },
              { path: `${ADMIN_PATH}/inventory`, element: /* @__PURE__ */ jsx(ManageInventory, {}) },
              { path: `${ADMIN_PATH}/edit/:id`, element: /* @__PURE__ */ jsx(EditProduct, {}) }
            ]
          }
        ]
      },
      { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) }
    ]
  }
];
const createApp = ViteReactSSG(
  { routes, basename: "/" }
);
export {
  useToast as a,
  uploadImageSecure as b,
  useAuth as c,
  createApp,
  db as d,
  auth as e,
  useCart as u
};
