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
    SHEMBULLIPARE_CREATE_RESET,

    SHEMBULLIPARE_UPDATE_REQUEST,
    SHEMBULLIPARE_UPDATE_SUCCESS,
    SHEMBULLIPARE_UPDATE_FAIL,
    SHEMBULLIPARE_UPDATE_RESET
    
} from '../constants/shembullipareConstants'

export const shembullipareListReducer = (state = { shembujtepare: [] }, action) => {
    switch (action.type) {
        case SHEMBULLIPARE_LIST_REQUEST:
            return { loading: true, shembujtepare: [] }

        case SHEMBULLIPARE_LIST_SUCCESS:
            return {
                loading: false,
                examples: action.payload.shembujtepare,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case SHEMBULLIPARE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const shembullipareDetailsReducer = (state = { shembullipare: [] }, action) => {
    switch (action.type) {
        case SHEMBULLIPARE_DETAILS_REQUEST:
            return { loading: true, ...state }

        case SHEMBULLIPARE_DETAILS_SUCCESS:
            return { loading: false, shembullipare: action.payload }

        case SHEMBULLIPARE_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
export const shembullipareDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case SHEMBULLIPARE_DELETE_REQUEST:
            return { loading: true }

        case SHEMBULLIPARE_DELETE_SUCCESS:
            return { loading: false, success: true }

        case SHEMBULLIPARE_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const shembullipareCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SHEMBULLIPARE_CREATE_REQUEST:
            return { loading: true }

        case SHEMBULLIPARE_CREATE_SUCCESS:
            return { loading: false, success: true, shembullipare: action.payload }

        case SHEMBULLIPARE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case SHEMBULLIPARE_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const shembullipareUpdateReducer = (state = { shembullipare: {} }, action) => {
    switch (action.type) {
        case SHEMBULLIPARE_UPDATE_REQUEST:
            return { loading: true }

        case SHEMBULLIPARE_UPDATE_SUCCESS:
            return { loading: false, success: true, shembullipare: action.payload }

        case SHEMBULLIPARE_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case SHEMBULLIPARE_UPDATE_RESET:
            return { shembullipare: {} }

        default:
            return state
    }
}



