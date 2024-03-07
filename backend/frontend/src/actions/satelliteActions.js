import axios from 'axios'
import { 
    SATELLITE_LIST_REQUEST,
    SATELLITE_LIST_SUCCESS,
    SATELLITE_LIST_FAIL,

    SATELLITE_DETAILS_REQUEST,
    SATELLITE_DETAILS_SUCCESS,
    SATELLITE_DETAILS_FAIL,


    SATELLITE_DELETE_REQUEST,
    SATELLITE_DELETE_SUCCESS,
    SATELLITE_DELETE_FAIL,

    SATELLITE_CREATE_REQUEST,
    SATELLITE_CREATE_SUCCESS,
    SATELLITE_CREATE_FAIL,

    SATELLITE_UPDATE_REQUEST,
    SATELLITE_UPDATE_SUCCESS,
    SATELLITE_UPDATE_FAIL

} from '../constants/satelliteConstants'

export const listSatellites = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: SATELLITE_LIST_REQUEST })

        const { data } = await axios.get(`/api/satellites${keyword}`)

        dispatch({
            type: SATELLITE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SATELLITE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const listSatelliteDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: SATELLITE_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/satellites/${id}`)

        dispatch({
            type: SATELLITE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SATELLITE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteSatellite = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SATELLITE_DELETE_REQUEST
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
            `/api/satellites/delete/${id}/`,
            config
        )

        dispatch({
            type: SATELLITE_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: SATELLITE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createSatellite = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SATELLITE_CREATE_REQUEST
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
            `/api/satellites/create/`,
            {},
            config
        )
        dispatch({
            type: SATELLITE_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: SATELLITE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateSatellite = (satellite) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SATELLITE_UPDATE_REQUEST
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
            `/api/satellites/update/${satellite.satelliteId}/`,
            satellite,
            config
        )
        dispatch({
            type: SATELLITE_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: SATELLITE_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: SATELLITE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


