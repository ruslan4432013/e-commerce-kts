import { FC } from "react";

import { ReactComponent as ArrowIcon } from "@shared/assets/icons/arrow.svg";
import cn from "classnames";

import s from "./styles.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  disabled?: boolean;
}

export const Pagination: FC<PaginationProps> = (props) => {
  const { currentPage, totalPages, onPageChange, disabled = false } = props;
  const pageNumbers = [];

  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage <= 2) {
    for (let i = 1; i <= 4; i++) {
      pageNumbers.push(i);
    }
    pageNumbers.push("...");
    pageNumbers.push(totalPages);
  } else if (currentPage >= totalPages - 1) {
    pageNumbers.push(1);
    pageNumbers.push("...");
    for (let i = totalPages - 3; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    pageNumbers.push("...");
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      pageNumbers.push(i);
    }
    pageNumbers.push("...");
    pageNumbers.push(totalPages);
  }

  return (
    <div className={s.pagination}>
      <button
        className={s.pagination_arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
      >
        <ArrowIcon className={s.icon} />
      </button>
      <div>
        {pageNumbers.map((number, index) =>
          number === "..." ? (
            <span key={`${number}--${index}`} className={"pagination__dots"}>
              ...
            </span>
          ) : (
            <button
              key={number}
              className={cn(s.pagination_button, {
                [s.pagination_button__active]: currentPage === number,
              })}
              onClick={() => onPageChange(number as number)}
              disabled={disabled}
            >
              {number}
            </button>
          )
        )}
      </div>
      <button
        className={s.pagination_arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
      >
        <ArrowIcon className={cn(s.icon, s.icon_right)} />
      </button>
    </div>
  );
};
