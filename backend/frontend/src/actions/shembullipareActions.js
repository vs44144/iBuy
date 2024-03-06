import axios from 'axios'
import { 
    SHEMBULLIPARE_LIST_REQUEST,
    SHEMBULLIPARE_LIST_SUCCESS,
    SHEMBULLIPARE_LIST_FAIL,

    SHEMBULLIPARE_DETAILS_REQUEST,
    SHEMBULLIPARE_DETAILS_SUCCESS,
    SHEMBULLIPARE_DETAILS_FAIL,


    SHEMBULLIPARE_DELETE_REQUEST,
    SHEMBULLIPARE_DELETE_SUCCESS,
    SHEMBULLIPARE_DELETE_FAIL,

    SHEMBULLIPARE_CREATE_REQUEST,
    SHEMBULLIPARE_CREATE_SUCCESS,
    SHEMBULLIPARE_CREATE_FAIL,

    SHEMBULLIPARE_UPDATE_REQUEST,
    SHEMBULLIPARE_UPDATE_SUCCESS,
    SHEMBULLIPARE_UPDATE_FAIL,

    SHEMBULLIPARE_TOP_REQUEST,
    SHEMBULLIPARE_TOP_SUCCESS,
    SHEMBULLIPARE_TOP_FAIL,

} from '../constants/shembullipareConstants'

export const listShembujtepare = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: SHEMBULLIPARE_LIST_REQUEST })

        const { data } = await axios.get(`/api/shembujtepare${keyword}`)

        dispatch({
            type: SHEMBULLIPARE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SHEMBULLIPARE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listShembujetepareDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: SHEMBULLIPARE_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/shembujtepare/${id}`)

        dispatch({
            type: SHEMBULLIPARE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SHEMBULLIPARE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteShembullipare = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SHEMBULLIPARE_DELETE_REQUEST
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
            `/api/shembujtepare/delete/${id}/`,
            config
        )

        dispatch({
            type: SHEMBULLIPARE_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: SHEMBULLIPARE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createShembullipare = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SHEMBULLIPARE_CREATE_REQUEST
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
            `/api/shembujtepare/create/`,
            {},
            config
        )
        dispatch({
            type: SHEMBULLIPARE_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: SHEMBULLIPARE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateShembullipare = (shembullipare) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SHEMBULLIPARE_UPDATE_REQUEST
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
            `/api/shembujtepare/update/${shembullipare._id}/`,
            shembullipare,
            config
        )
        dispatch({
            type: SHEMBULLIPARE_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: SHEMBULLIPARE_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: SHEMBULLIPARE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


