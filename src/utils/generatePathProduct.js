import { PATH } from "@/config/path";
import { generatePath } from "react-router-dom";
import { slugify } from "./slugify";

export const generatePathProduct = (product) =>
  `${generatePath(PATH.productDetail, { slug: slugify(product.name) })}-p${
    product.id
  }`;
