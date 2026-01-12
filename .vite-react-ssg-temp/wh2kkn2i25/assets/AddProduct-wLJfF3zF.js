import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { d as db, b as uploadImageSecure } from "../index.mjs";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { Plus, Palette, RefreshCw, UploadCloud, Trash2 } from "lucide-react";
import { c as compressImage } from "./imageOptimizer-CONHIO2n.js";
import "vite-react-ssg";
import "react-router-dom";
import "firebase/auth";
import "firebase/app";
import "react-helmet-async";
import "@vercel/analytics/react";
const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [gender, setGender] = useState("Male");
  const [isFeatured, setIsFeatured] = useState(false);
  const [variants, setVariants] = useState([]);
  const [currentColor, setCurrentColor] = useState("");
  const [currentImages, setCurrentImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const finalPrice = useMemo(() => {
    const priceVal = Number(originalPrice);
    const discountVal = Number(discountPercentage);
    if (isNaN(priceVal) || priceVal <= 0 || isNaN(discountVal) || discountVal < 0 || discountVal > 100) {
      return null;
    }
    return Math.round(priceVal * (1 - discountVal / 100));
  }, [originalPrice, discountPercentage]);
  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      const files = e.target.files;
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
          try {
            setUploadProgress(`Uploading ${file.name}...`);
            const compressedFile = await compressImage(file);
            const url = await uploadImageSecure(compressedFile, void 0);
            if (url) {
              uploadedUrls.push(url);
            } else {
              console.error("Secure upload failed for", file.name);
              alert(`Failed to upload ${file.name} via secure server`);
            }
          } catch (error) {
            console.error("Error processing file", file.name, error);
            alert(`Error processing ${file.name}: ${error instanceof Error ? error.message : String(error)}`);
          }
        }
      }
      setCurrentImages([...currentImages, ...uploadedUrls]);
      setUploading(false);
      setUploadProgress("");
    }
  };
  const removeCurrentImage = (index) => setCurrentImages(currentImages.filter((_, i) => i !== index));
  const addManualUrl = () => {
    const url = prompt("Enter Image URL manually:");
    if (url) setCurrentImages([...currentImages, url]);
  };
  const handleAddVariant = () => {
    if (!currentColor || currentImages.length === 0) {
      alert("Please enter a Color Name and upload at least one image.");
      return;
    }
    setVariants([...variants, { color: currentColor, images: currentImages }]);
    setCurrentColor("");
    setCurrentImages([]);
  };
  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };
  const generateSafeId = (name) => {
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const randomSuffix = Math.floor(1e3 + Math.random() * 9e3);
    return `${cleanName}-${randomSuffix}`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || originalPrice === "" || stock === "" || !description || !brand || finalPrice === null) {
      setMessage({ type: "error", text: "Please check all basic fields." });
      return;
    }
    if (variants.length === 0) {
      setMessage({ type: "error", text: "Please add at least one Color Variant." });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const customDocId = generateSafeId(productName);
      const productData = {
        name: productName,
        originalPrice: Number(originalPrice),
        discount: Number(discountPercentage),
        price: finalPrice,
        stock: Number(stock),
        description,
        brand,
        gender,
        isFeatured,
        variants,
        imageUrls: variants[0].images,
        createdAt: serverTimestamp(),
        id: customDocId,
        slug: customDocId
        // AUTO-GENERATED SLUG
      };
      await setDoc(doc(db, "products", customDocId), productData);
      setMessage({ type: "success", text: `Product saved successfully! ID: ${customDocId}` });
      setProductName("");
      setOriginalPrice("");
      setDiscountPercentage(0);
      setStock("");
      setDescription("");
      setVariants([]);
      setBrand("");
      setIsFeatured(false);
      window.scrollTo(0, 0);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };
  const inputStyle = "w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none transition-colors";
  const labelStyle = "block text-gray-300 mb-2 font-bold text-sm uppercase tracking-wide";
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl border border-gray-700 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-6 border-b border-gray-700 pb-4", children: /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-white flex items-center", children: [
      /* @__PURE__ */ jsx(Plus, { className: "mr-2 text-yellow-500" }),
      " Add New Product"
    ] }) }),
    message && /* @__PURE__ */ jsx("div", { className: `p-4 mb-6 rounded-lg text-center font-bold ${message.type === "success" ? "bg-green-900/50 text-green-200 border border-green-500" : "bg-red-900/50 text-red-200 border border-red-500"}`, children: message.text }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelStyle, htmlFor: "productName", children: "Product Name" }),
        /* @__PURE__ */ jsx("input", { type: "text", id: "productName", name: "productName", value: productName, onChange: (e) => setProductName(e.target.value), className: inputStyle, placeholder: "e.g. Omega Seamaster" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-900/50 p-4 rounded-lg border border-gray-700", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelStyle, htmlFor: "originalPrice", children: "Original Price (Rs)" }),
          /* @__PURE__ */ jsx("input", { type: "number", id: "originalPrice", name: "originalPrice", value: originalPrice, onChange: (e) => setOriginalPrice(e.target.value === "" ? "" : parseFloat(e.target.value)), className: inputStyle, min: "1", placeholder: "0" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelStyle, htmlFor: "discountPercentage", children: "Discount (%)" }),
          /* @__PURE__ */ jsx("input", { type: "number", id: "discountPercentage", name: "discountPercentage", value: discountPercentage, onChange: (e) => setDiscountPercentage(e.target.value === "" ? 0 : parseFloat(e.target.value)), className: inputStyle, min: "0", max: "100", placeholder: "0" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelStyle, children: "Final Price" }),
          /* @__PURE__ */ jsx("div", { className: "h-[50px] flex items-center px-4 rounded bg-gray-700 border border-gray-600 text-green-400 font-bold text-lg", children: finalPrice !== null ? `Rs. ${finalPrice.toLocaleString()}` : "..." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelStyle, htmlFor: "stock", children: "Stock Qty" }),
          /* @__PURE__ */ jsx("input", { type: "number", id: "stock", name: "stock", value: stock, onChange: (e) => setStock(e.target.value === "" ? "" : parseFloat(e.target.value)), className: inputStyle, min: "0", placeholder: "10" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelStyle, htmlFor: "brand", children: "Brand" }),
          /* @__PURE__ */ jsx("input", { type: "text", id: "brand", name: "brand", value: brand, onChange: (e) => setBrand(e.target.value), className: inputStyle, placeholder: "Rolex" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelStyle, htmlFor: "gender", children: "Gender" }),
          /* @__PURE__ */ jsxs("select", { id: "gender", name: "gender", value: gender, onChange: (e) => setGender(e.target.value), className: inputStyle, children: [
            /* @__PURE__ */ jsx("option", { value: "Male", children: "Male ♂️" }),
            /* @__PURE__ */ jsx("option", { value: "Female", children: "Female ♀️" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 bg-gray-700/30 p-3 rounded border border-gray-600", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", id: "isFeatured", checked: isFeatured, onChange: (e) => setIsFeatured(e.target.checked), className: "h-5 w-5 text-yellow-500 rounded focus:ring-yellow-500 cursor-pointer" }),
        /* @__PURE__ */ jsx("label", { htmlFor: "isFeatured", className: "text-gray-300 cursor-pointer font-medium select-none", children: 'Mark as "Featured Product" on Homepage' })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelStyle, htmlFor: "description", children: "Description" }),
        /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "description",
              name: "description",
              value: description,
              onChange: (e) => setDescription(e.target.value),
              rows: 6,
              className: `${inputStyle} resize-none pr-16 focus:ring-2 focus:ring-yellow-500/50`,
              placeholder: "Write a compelling description that highlights the watch's key features, materials, and what makes it special..."
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-3 right-3 text-xs text-gray-500", children: [
            /* @__PURE__ */ jsx("span", { className: description.length > 500 ? "text-yellow-400" : "", children: description.length }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: " / 500+" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-500 bg-gray-700/50 px-2 py-1 rounded-full", children: "💡 Include: movement type, case size, water resistance, strap material" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 p-6 rounded-xl border border-gray-600", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-yellow-500 font-bold mb-4 flex items-center text-lg", children: [
          /* @__PURE__ */ jsx(Palette, { className: "mr-2" }),
          " Image & Color Manager"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400 block mb-1", htmlFor: "colorName", children: "1. Color Name" }),
            /* @__PURE__ */ jsx("input", { type: "text", id: "colorName", name: "colorName", value: currentColor, onChange: (e) => setCurrentColor(e.target.value), className: inputStyle, placeholder: "e.g. Silver Dial" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm text-gray-400 block mb-1", children: "2. Upload Images" }),
            /* @__PURE__ */ jsxs("label", { className: "cursor-pointer flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition w-full shadow-lg", children: [
              uploading ? /* @__PURE__ */ jsx(RefreshCw, { className: "animate-spin mr-2", size: 20 }) : /* @__PURE__ */ jsx(UploadCloud, { className: "mr-2", size: 20 }),
              uploading ? uploadProgress : "Select Files",
              /* @__PURE__ */ jsx("input", { type: "file", id: "productImages", name: "productImages", multiple: true, accept: "image/*", onChange: handleFileChange, className: "hidden", disabled: uploading })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: addManualUrl, className: "text-xs text-gray-500 mt-2 hover:text-gray-300 underline", children: "Or use URL" })
          ] })
        ] }),
        currentImages.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 mb-4 p-3 bg-gray-800 rounded border border-gray-700", children: currentImages.map((url, index) => /* @__PURE__ */ jsxs("div", { className: "relative w-20 h-20 group", children: [
          /* @__PURE__ */ jsx("img", { src: url, alt: "Preview", className: "w-full h-full object-cover rounded border border-gray-500" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeCurrentImage(index), className: "absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsx(Trash2, { size: 12 }) })
        ] }, index)) }),
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: handleAddVariant, className: "w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center shadow-lg transition-transform transform active:scale-95", children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2" }),
          " Add This Variant"
        ] })
      ] }),
      variants.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: labelStyle, children: "Ready to Save:" }),
        variants.map((v, idx) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-gray-700 p-3 rounded border border-gray-600 shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded bg-gray-800 overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: v.images[0], alt: "", className: "w-full h-full object-cover" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold text-white block", children: v.color }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-400", children: [
                v.images.length,
                " images"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeVariant(idx), className: "text-red-400 hover:text-red-200 p-2 hover:bg-gray-600 rounded", children: /* @__PURE__ */ jsx(Trash2, { size: 18 }) })
        ] }, idx))
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading || uploading, className: "w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-extrabold py-4 rounded-xl text-lg shadow-xl hover:shadow-yellow-500/20 transition-all transform hover:scale-[1.01]", children: loading ? "Uploading Product..." : "PUBLISH PRODUCT" })
    ] })
  ] });
};
export {
  AddProduct as default
};
