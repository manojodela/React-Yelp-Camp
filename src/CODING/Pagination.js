import ReactPaginate from "react-paginate";

const Pagination = ({ countlist, paginateData }) => {

    const handlePageClick = (data) => {
        let currentPage = data.selected*10;
        paginateData(currentPage);
    };

    return <>
        <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={countlist}
            marginPagesDisplayed={countlist}
            pageRangeDisplayed={countlist}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-end "}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
        />
    </>


}

export default Pagination;