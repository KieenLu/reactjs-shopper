import { useQuery } from "@/hooks/useQuery";
import { productService } from "@/services/product";
import { withListLoading } from "@/utils/withListLoading";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { ProductCardLoading } from "../ProductCardLoading";

const ListProductCard = withListLoading(ProductCard, ProductCardLoading);
export const ListProductCardDiscover = ({ link, query }) => {
  const {
    data: { data = [] },
    loading,
  } = useQuery({
    queryFn: () => productService.getProduct(query),
  });

  return (
    <div className="row">
      <ListProductCard
        loading={loading}
        data={data}
        wraperClass="col-12 col-md-3"
        loadingCount={8}
      />
      <div className="col-12">
        {/* Link  */}
        <div className="mt-7 text-center">
          <Link className="link-underline" to={link}>
            Discover more
          </Link>
        </div>
      </div>
    </div>
  );
};
