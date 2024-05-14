import axios from 'axios'
import { 
    PUNTORI_LIST_REQUEST,
    PUNTORI_LIST_SUCCESS,
    PUNTORI_LIST_FAIL,

    PUNTORI_DETAILS_REQUEST,
    PUNTORI_DETAILS_SUCCESS,
    PUNTORI_DETAILS_FAIL,


    PUNTORI_DELETE_REQUEST,
    PUNTORI_DELETE_SUCCESS,
    PUNTORI_DELETE_FAIL,

    PUNTORI_CREATE_REQUEST,
    PUNTORI_CREATE_SUCCESS,
    PUNTORI_CREATE_FAIL,

    PUNTORI_UPDATE_REQUEST,
    PUNTORI_UPDATE_SUCCESS,
    PUNTORI_UPDATE_FAIL

} from '../constants/puntoriConstants'

export const listPuntoris = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: PUNTORI_LIST_REQUEST })

        const { data } = await axios.get(`/api/puntoris${keyword}`)

        dispatch({
            type: PUNTORI_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PUNTORI_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// export const listTopPuntoris = () => async (dispatch) => {
//     try {
//         dispatch({ type: PUNTORI_TOP_REQUEST })

//         const { data } = await axios.get(`/api/puntoris/top/`)

//         dispatch({
//             type: PUNTORI_TOP_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: PUNTORI_TOP_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }

export const listPuntoriDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PUNTORI_DETAILS_REQUEST })

        console.log("Fetching NOW")
        const { data } = await axios.get(`/api/puntoris/${id}`)
        console.log("Fetching DONE")

        dispatch({
            type: PUNTORI_DETAILS_SUCCESS,
            payload: data
        })
        console.log("Po vjen qetu")
    } catch (error) {
        dispatch({
            type: PUNTORI_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
    console.log("Edhe qetu")
}

export const deletePuntori = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PUNTORI_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/puntoris/delete/${id}/`,
            config
        )

        dispatch({
            type: PUNTORI_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: PUNTORI_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createPuntori = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PUNTORI_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/puntoris/create/`,
            {},
            config
        )
        dispatch({
            type: PUNTORI_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: PUNTORI_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updatePuntori = (puntori) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PUNTORI_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/puntoris/update/${puntori.puntoriId}/`,
            puntori,
            config
        )
        dispatch({
            type: PUNTORI_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: PUNTORI_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PUNTORI_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


