import axios from "axios";
import { base_url, config } from "../../utils/axioConfig";

const getProducts = async (data) => {
  const response = await axios.get(
    `${base_url}product?${data?.brand?`brand=${data?.brand}&&`:""}${data?.tag?`tags=${data?.tag}&&`:""}${data?.category?`category=${data?.category}&&`:""}${data?.minPrice?`price[gte]=${data?.minPrice}&&`:""}${data?.maxPrice?`price[lte]=${data?.maxPrice}&&`:""}${data?.sort?`sort=${data?.sort}&&`:""}`);
  if (response.data) {
    return response.data;
  }
};
const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data;
  }
};
const addWishlist = async (prodId) => {
  const response = await axios.put(
    `${base_url}product/wishlist`,
    { prodId },
    config
  );
  console.log(config);
  return response.data;
};

const rateProduct = async (data) => {
  const response = await axios.put(`${base_url}product/rating`, data, config);
  console.log(config);
  return response.data;
};

export const productService = {
  getProducts,
  addWishlist,
  getSingleProduct,
  rateProduct,
};
