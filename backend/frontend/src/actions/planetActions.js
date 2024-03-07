import axios from 'axios'
import { 
    PLANET_LIST_REQUEST,
    PLANET_LIST_SUCCESS,
    PLANET_LIST_FAIL,

    PLANET_DETAILS_REQUEST,
    PLANET_DETAILS_SUCCESS,
    PLANET_DETAILS_FAIL,


    PLANET_DELETE_REQUEST,
    PLANET_DELETE_SUCCESS,
    PLANET_DELETE_FAIL,

    PLANET_CREATE_REQUEST,
    PLANET_CREATE_SUCCESS,
    PLANET_CREATE_FAIL,

    PLANET_UPDATE_REQUEST,
    PLANET_UPDATE_SUCCESS,
    PLANET_UPDATE_FAIL

} from '../constants/planetConstants'

export const listPlanets = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: PLANET_LIST_REQUEST })

        const { data } = await axios.get(`/api/planets${keyword}`)

        dispatch({
            type: PLANET_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PLANET_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// export const listTopPlanets = () => async (dispatch) => {
//     try {
//         dispatch({ type: PLANET_TOP_REQUEST })

//         const { data } = await axios.get(`/api/planets/top/`)

//         dispatch({
//             type: PLANET_TOP_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: PLANET_TOP_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }

export const listPlanetDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PLANET_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/planets/${id}`)

        dispatch({
            type: PLANET_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PLANET_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deletePlanet = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PLANET_DELETE_REQUEST
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
            `/api/planets/delete/${id}/`,
            config
        )

        dispatch({
            type: PLANET_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: PLANET_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createPlanet = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PLANET_CREATE_REQUEST
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
            `/api/planets/create/`,
            {},
            config
        )
        dispatch({
            type: PLANET_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: PLANET_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updatePlanet = (planet) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PLANET_UPDATE_REQUEST
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
            `/api/planets/update/${planet._id}/`,
            planet,
            config
        )
        dispatch({
            type: PLANET_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: PLANET_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PLANET_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


