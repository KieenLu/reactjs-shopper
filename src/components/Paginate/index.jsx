import { cn } from "@/utils";
import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export const Paginate = ({ totalPage, name = "page" }) => {
  const [search] = useSearchParams();
  const currentPage = parseInt(search.get(name) || "1");
  const { pathname } = useLocation();

  const urlSearchParam = new URLSearchParams(search); // tạo ra một object mới

  const renderItem = () => {
    let start = currentPage - 2;
    let end = currentPage + 2;

    if (start < 1) {
      start = 1;
      end = 5;
    }

    if (end > totalPage) {
      end = totalPage;
      start = totalPage - 5;
      if (start < 1) start = 1;
    }

    let list = [];
    for (let i = start; i <= end; i++) {
      urlSearchParam.set(name, i);
      list.push(
        <li key={i} className={cn("page-item", { active: i === currentPage })}>
          <Link
            className="page-link"
            to={`${pathname}?${urlSearchParam.toString()}`}
          >
            {i}
          </Link>
        </li>
      );
    }
    return list;
  };

  urlSearchParam.set(name, currentPage - 1);
  const prevLink = `${pathname}?${urlSearchParam.toString()}`;

  urlSearchParam.set(name, currentPage + 1);
  const nextLink = `${pathname}?${urlSearchParam.toString()}`;

  if (totalPage <= 1) return null;
  return (
    <nav className="d-flex justify-content-center justify-content-md-end">
      <ul className="pagination pagination-sm text-gray-400">
        {currentPage > 1 && (
          <li className="page-item">
            <Link className="page-link page-link-arrow" to={prevLink}>
              <i className="fa fa-caret-left" />
            </Link>
          </li>
        )}

        {renderItem()}
        {currentPage < totalPage && (
          <li className="page-item">
            <Link className="page-link page-link-arrow" to={nextLink}>
              <i className="fa fa-caret-right" />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
