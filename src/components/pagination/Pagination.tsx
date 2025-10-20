import "./pagination.css";
import {type FC, memo} from "react";
import {useSearchParams} from "react-router-dom";

type PaginationType = {
    totalPages: number;
};

export const Pagination: FC<PaginationType> = memo(({totalPages}) => {
    const [page, setPage] = useSearchParams();

    const currentPage = Number(page.get("page")) || 1;

    const maxVisible = 5;
    const pages: number[] = [];

    const limitedTotal = Math.min(totalPages, 500);

    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(limitedTotal, start + maxVisible - 1);

    for (let i = start; i <= end; i++) pages.push(i);

    const updatePage = (newPage: number) => {
        const params: Record<string, string> = {};
        page.forEach((value, key) => {
            if (key !== "page") params[key] = value;
        });
        params.page = newPage.toString();

        setPage(params);
    }

    const handlePrev = () => currentPage > 1 && updatePage(currentPage - 1);
    const handleNext = () => currentPage < limitedTotal && updatePage(currentPage + 1);

    return (
        <div className={"pagination"}>
            {currentPage > 1 && (
                <button className={"page-btn"} onClick={handlePrev}>
                    {"<"}
                </button>
            )}

            {start > 1 && (
                <>
                    <button className={"page-btn"} onClick={() => updatePage(1)}>1</button>
                    {start > 2 && <span className={"dots"}>...</span>}
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    className={`page-btn ${page === currentPage ? "active" : ""}`}
                    onClick={() => updatePage(page)}>
                    {page}
                </button>
            ))}

            {end < limitedTotal && (
                <>
                    {end < limitedTotal - 1 && <span className={"dots"}>...</span>}
                    <button className={"page-btn"} onClick={() => updatePage(limitedTotal)}>
                        {limitedTotal}
                    </button>
                </>
            )}

            {currentPage < limitedTotal && (
                <button className={"page-btn"} onClick={handleNext}>
                    {">"}
                </button>
            )}
        </div>
    );
});
