import React from 'react'
import { Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {

    const navigate = useNavigate()
    // if (keyword) {
    //     keyword = keyword.split('?keyword=')[1].split('&')[0]
    // }
    if (keyword && keyword.includes('?keyword=')) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    } else {
        keyword = ''
    }
    // console.log('KEYWORD', keyword)

    return (pages > 1 && (
        <Pagination className="pagination-container">
            {[...Array(pages).keys()].map((x) => (
            <Pagination.Item
                key={x + 1}
                onClick={() => navigate(`?keyword=${keyword}&page=${x + 1}`)}
                active={x + 1 === page}
                to={{
                    search: `?keyword=${keyword}&page=${x + 1}`
                }}
            >
                {x + 1}
            </Pagination.Item>
            ))}
        </Pagination>
    )
    )
}

export default Paginate
