import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
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
                <LinkContainer
                    key={x + 1}
                    to={{
                        pathname: isAdmin ? "/admin/productlist" : "/",
                        search: `?keyword=${keyword}&page=${x + 1}`
                    }}
                >
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
    )
}

export default Paginate
