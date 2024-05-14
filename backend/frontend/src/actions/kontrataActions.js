import axios from 'axios'
import { 
    KONTRATA_LIST_REQUEST,
    KONTRATA_LIST_SUCCESS,
    KONTRATA_LIST_FAIL,

    KONTRATA_DETAILS_REQUEST,
    KONTRATA_DETAILS_SUCCESS,
    KONTRATA_DETAILS_FAIL,


    KONTRATA_DELETE_REQUEST,
    KONTRATA_DELETE_SUCCESS,
    KONTRATA_DELETE_FAIL,

    KONTRATA_CREATE_REQUEST,
    KONTRATA_CREATE_SUCCESS,
    KONTRATA_CREATE_FAIL,

    KONTRATA_UPDATE_REQUEST,
    KONTRATA_UPDATE_SUCCESS,
    KONTRATA_UPDATE_FAIL

} from '../constants/kontrataConstants'

export const listKontratas = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: KONTRATA_LIST_REQUEST })

        const { data } = await axios.get(`/api/kontratas${keyword}`)

        dispatch({
            type: KONTRATA_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: KONTRATA_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const listKontrataDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: KONTRATA_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/kontratas/${id}`)

        dispatch({
            type: KONTRATA_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: KONTRATA_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteKontrata = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: KONTRATA_DELETE_REQUEST
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
            `/api/kontratas/delete/${id}/`,
            config
        )

        dispatch({
            type: KONTRATA_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: KONTRATA_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createKontrata = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: KONTRATA_CREATE_REQUEST
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
            `/api/kontratas/create/`,
            {},
            config
        )
        dispatch({
            type: KONTRATA_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: KONTRATA_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateKontrata = (kontrata) => async (dispatch, getState) => {
    try {
        dispatch({
            type: KONTRATA_UPDATE_REQUEST
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
            `/api/kontratas/update/${kontrata.kontrataId}/`,
            kontrata,
            config
        )
        dispatch({
            type: KONTRATA_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: KONTRATA_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: KONTRATA_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


