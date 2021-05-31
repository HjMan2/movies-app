import PropTypes from 'prop-types'
const Pagination = ({onPageChange, itemsCount, pageSize, currentPage}) => {
        const pagesCount = Math.ceil(itemsCount / pageSize)
        if(pagesCount === 1) return null;
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    {
                        ','.repeat(pagesCount - 1).split(',').map((page, index) => {
                            return(
                            <li key={index + 1} className={index + 1 === currentPage ? 'page-item active' : 'page-item'}>
                                <a className="page-link" onClick={() => onPageChange(index + 1)}>
                                    {index + 1}
                                </a>
                            </li>
                            );
                        })
                    }
                </ul>
            </nav>
        );
}

Pagination.propTypes = {
    onPageChange: PropTypes.func.isRequired, 
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired
}
 
export {Pagination};