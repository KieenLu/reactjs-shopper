import { PATH } from "@/config/path";
import { useCategories, useCategory } from "@/hooks/useCategories";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@/hooks/useQuery";
import { productService } from "@/services/product";
import { array } from "@/utils/array";
import { currency } from "@/utils/currency";
import { Drawer } from "antd";
import queryString from "query-string";
import { Link, generatePath } from "react-router-dom";
import Skeleton from "../Skeleton";
import { slugify } from "@/utils/slugify";

export const SearchDrawer = ({ open, onClose }) => {
  const { data: categories } = useCategories();
  const [value, setValue] = useDebounce("");
  const [categoryId, setCategoryId] = useDebounce(0);
  const category = useCategory(categoryId);

  const query = queryString.stringify({
    limit: 5,
    name: value || undefined,
    categories: categoryId || undefined,
  });

  const { data: { data: products = [] } = {}, loading } = useQuery({
    queryFn: () => productService.getProduct(`${query}`),
    enabled: !!value,
    dependencyList: [query],
  });
  const queryLink = queryString.stringify({
    search: value || undefined,
  });

  const viewAllLink =
    (category
      ? generatePath(PATH.category, {
          slug: slugify(category.title),
          id: category.id,
        })
      : PATH.shop) + `?${queryLink}`;
  return (
    <Drawer
      open={open}
      onClose={onClose}
      headerStyle={{ display: "none" }}
      bodyStyle={{ padding: 0 }}
      width={470}
    >
      <div className="modal-content">
        {/* Close */}
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={onClose}
        >
          <i className="fe fe-x" aria-hidden="true" />
        </button>
        {/* Header*/}
        <div className="modal-header line-height-fixed font-size-lg">
          <strong className="mx-auto">Tìm kiếm sản phẩm</strong>
        </div>
        {/* Body: Form */}
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label className="sr-only" htmlFor="modalSearchCategories">
                Categories:
              </label>
              <select
                onChange={(ev) => setCategoryId(parseInt(ev.target.value))}
                className="custom-select"
                id="modalSearchCategories"
              >
                <option>Tất cả sản phẩm</option>
                {categories.map((e) => (
                  <option value={e.id} key={e.id}>
                    {e.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group input-group-merge">
              <input
                defaultValue={value}
                onChange={(ev) => setValue(ev.target.value?.trim())}
                className="form-control"
                type="search"
                placeholder="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-border" type="submit">
                  <i className="fe fe-search" />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-body border-top font-size-sm">
          {/* Heading */}
          {value ? (
            <p>Kết quả tìm kiếm:</p>
          ) : (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              Tìm kiếm sản phẩm dành cho bạn.
            </p>
          )}
          {/* Items */}
          {/* {value && loading ? (
            array(5).map((_, i) => <CartItemLoading key={i} />)
          ) : products.length > 0 ? (
            products.map((e) => <CartItem key={e.id} {...e} />)
          ) : (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              Không có sản phẩm nào phù hợp. 🙁
            </p>
          )} */}
          {value &&
            (loading ? (
              array(5).map((_, i) => <CartItemLoading key={i} />)
            ) : products.length > 0 ? (
              products.map((e) => <CartItem key={e.id} {...e} />)
            ) : (
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                Không có sản phẩm nào phù hợp. 🙁
              </p>
            ))}

          {/* Button */}
          {value && (
            <Link
              to={viewAllLink}
              onClick={onClose}
              className="px-0 text-reset font-bold"
            >
              View All <i className="fe fe-arrow-right ml-2" />
            </Link>
          )}
        </div>
        {/* Body: Empty (remove `.d-none` to disable it) */}
        <div className="d-none modal-body">
          {/* Text */}
          <p className="mb-3 font-size-sm text-center">
            Nothing matches your search
          </p>
          <p className="mb-0 font-size-sm text-center">😞</p>
        </div>
      </div>
    </Drawer>
  );
};

const CartItem = ({ name, real_price, price, slug, id, images }) => {
  const salePrice = price - real_price;
  console.log(slug);
  return (
    <div className="row align-items-center position-relative mb-5">
      {salePrice > 0 && (
        <div className="card-sale badge badge-dark card-badge card-badge-left text-uppercase">
          - {Math.floor((salePrice / price) * 100)}%
        </div>
      )}
      <div className="col-4 col-md-3">
        {/* Image */}
        <img className="img-fluid" src={images?.[0]?.thumbnail_url} alt="..." />
      </div>
      <div className="col position-static">
        {/* Text */}
        <div className="mb-0 font-weight-bold">
          <Link className="stretched-link text-body" to={""}>
            {name}
          </Link>
          <br />
          <div className="card-product-price">
            {real_price < price ? (
              <>
                <span className="text-primary sale">
                  {currency(real_price)}
                </span>
                <span className="font-size-xs text-gray-350 text-decoration-line-through ml-1">
                  {currency(price)}
                </span>
              </>
            ) : (
              <>
                <span className="text-xl flex h-full items-end">
                  {currency(real_price)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItemLoading = () => {
  return (
    <div className="row align-items-center position-relative mb-5">
      <div className="col-4 col-md-3">
        {/* Image */}
        <Skeleton width={73} height={100} />
      </div>
      <div className="col position-static">
        {/* Text */}
        <div className="mb-0 font-weight-bold">
          <a className="stretched-link text-body" href="#">
            <Skeleton height={42.5} />
          </a>{" "}
          <br />
          <span className="text-muted">
            <Skeleton width={150} height={20} />
          </span>
        </div>
      </div>
    </div>
  );
};
