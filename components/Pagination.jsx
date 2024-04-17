const Pagination = ({ page, pageSize, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <div className="mt-10 flex justify-center items-center">
        <button
            className="mr-2 px-2 py-1 border border-gray-300 rounded"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
        >
            Previous
        </button>
        <span className="mx-2">
            Page {page} of {totalPages}
        </span>
        <button
            className="ml-2 px-2 py-1 border border-gray-300 rounded"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
        >
            Next
        </button>
        </div>
    );
};

export default Pagination;
