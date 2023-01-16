import { Paginate } from "@/components/Paginate";
import ProductCard from "@/components/ProductCard";
import { ProductCardLoading } from "@/components/ProductCardLoading";
import { PATH } from "@/config/path";
import { useQuery } from "@/hooks/useQuery";
import { useSearch } from "@/hooks/useSearch";
import { productService } from "@/services/product";
import { array } from "@/utils/array";
import queryString from "query-string";
import { Link } from "react-router-dom";

export const ProfileWishlist = () => {
  const [search] = useSearch({ page: 1, limit: 9 });
  const qs = queryString.stringify(search);
  const { data: { data: products = [], paginate = {} } = {}, loading } =
    useQuery({
      queryFn: () => productService.getWishList(`${qs}`),
      dependencyList: [qs],
    });
  return (
    <>
      <div className="row">
        {loading ? (
          array(9).map((_, i) => (
            <div key={i} className="col-6 col-md-4">
              <ProductCardLoading />
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((e) => (
            <div key={e.id} className="col-6 col-md-4">
              <ProductCard showRemove {...e} />
            </div>
          ))
        ) : (
          <p className="text-xl border p-5 w-full text-center">
            Hiện bạn chưa có sản phẩm yêu thích nào, bạn có thể đưa bất kỳ sản
            phẩm nào bạn muốn vào sản phẩm yêu thích 😞
            <br />
            <Link className="btn btn-sm btn-dark mt-5" to={PATH.shop}>
              Sản phẩm
            </Link>
          </p>
        )}
      </div>
      <Paginate totalPage={paginate.totalPage} />
    </>
  );
};

export default ProfileWishlist;
