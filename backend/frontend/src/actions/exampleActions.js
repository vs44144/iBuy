import axios from 'axios'
import { 
    EXAMPLE_LIST_REQUEST,
    EXAMPLE_LIST_SUCCESS,
    EXAMPLE_LIST_FAIL,

    EXAMPLE_DETAILS_REQUEST,
    EXAMPLE_DETAILS_SUCCESS,
    EXAMPLE_DETAILS_FAIL,


    EXAMPLE_DELETE_REQUEST,
    EXAMPLE_DELETE_SUCCESS,
    EXAMPLE_DELETE_FAIL,

    EXAMPLE_CREATE_REQUEST,
    EXAMPLE_CREATE_SUCCESS,
    EXAMPLE_CREATE_FAIL,

    EXAMPLE_UPDATE_REQUEST,
    EXAMPLE_UPDATE_SUCCESS,
    EXAMPLE_UPDATE_FAIL,

    EXAMPLE_CREATE_REVIEW_REQUEST,
    EXAMPLE_CREATE_REVIEW_SUCCESS,
    EXAMPLE_CREATE_REVIEW_FAIL,

    EXAMPLE_TOP_REQUEST,
    EXAMPLE_TOP_SUCCESS,
    EXAMPLE_TOP_FAIL,

} from '../constants/exampleConstants'

export const listExamples = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: EXAMPLE_LIST_REQUEST })

        const { data } = await axios.get(`/api/examples${keyword}`)

        dispatch({
            type: EXAMPLE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: EXAMPLE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listTopExamples = () => async (dispatch) => {
    try {
        dispatch({ type: EXAMPLE_TOP_REQUEST })

        const { data } = await axios.get(`/api/examples/top/`)

        dispatch({
            type: EXAMPLE_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: EXAMPLE_TOP_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listExampleDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: EXAMPLE_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/examples/${id}`)

        dispatch({
            type: EXAMPLE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: EXAMPLE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteExample = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXAMPLE_DELETE_REQUEST
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
            `/api/examples/delete/${id}/`,
            config
        )

        dispatch({
            type: EXAMPLE_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: EXAMPLE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createExample = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXAMPLE_CREATE_REQUEST
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
            `/api/examples/create/`,
            {},
            config
        )
        dispatch({
            type: EXAMPLE_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: EXAMPLE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateExample = (example) => async (dispatch, getState) => {
    try {
        dispatch({
            type: EXAMPLE_UPDATE_REQUEST
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
            `/api/examples/update/${example._id}/`,
            example,
            config
        )
        dispatch({
            type: EXAMPLE_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: EXAMPLE_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: EXAMPLE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


