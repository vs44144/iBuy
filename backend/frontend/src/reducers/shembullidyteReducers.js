import { 
    SHEMBULLIDYTE_LIST_REQUEST,
    SHEMBULLIDYTE_LIST_SUCCESS,
    SHEMBULLIDYTE_LIST_FAIL,

    SHEMBULLIDYTE_DETAILS_REQUEST,
    SHEMBULLIDYTE_DETAILS_SUCCESS,
    SHEMBULLIDYTE_DETAILS_FAIL,

    SHEMBULLIDYTE_DELETE_REQUEST,
    SHEMBULLIDYTE_DELETE_SUCCESS,
    SHEMBULLIDYTE_DELETE_FAIL,

    SHEMBULLIDYTE_CREATE_REQUEST,
    SHEMBULLIDYTE_CREATE_SUCCESS,
    SHEMBULLIDYTE_CREATE_FAIL,
    SHEMBULLIDYTE_CREATE_RESET,

    SHEMBULLIDYTE_UPDATE_REQUEST,
    SHEMBULLIDYTE_UPDATE_SUCCESS,
    SHEMBULLIDYTE_UPDATE_FAIL,
    SHEMBULLIDYTE_UPDATE_RESET
    
} from '../constants/shembullidyteConstants'

export const shembullidyteListReducer = (state = { shembujtedyte: [] }, action) => {
    switch (action.type) {
        case SHEMBULLIDYTE_LIST_REQUEST:
            return { loading: true, shembujtedyte: [] }

        case SHEMBULLIDYTE_LIST_SUCCESS:
            return {
                loading: false,
                examples: action.payload.shembujtedyte,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case SHEMBULLIDYTE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const shembullidyteDetailsReducer = (state = { shembullidyte: [] }, action) => {
    switch (action.type) {
        case SHEMBULLIDYTE_DETAILS_REQUEST:
            return { loading: true, ...state }

        case SHEMBULLIDYTE_DETAILS_SUCCESS:
            return { loading: false, shembullidyte: action.payload }

        case SHEMBULLIDYTE_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
export const shembullidyteDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case SHEMBULLIDYTE_DELETE_REQUEST:
            return { loading: true }

        case SHEMBULLIDYTE_DELETE_SUCCESS:
            return { loading: false, success: true }

        case SHEMBULLIDYTE_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const shembullidyteCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SHEMBULLIDYTE_CREATE_REQUEST:
            return { loading: true }

        case SHEMBULLIDYTE_CREATE_SUCCESS:
            return { loading: false, success: true, shembullidyte: action.payload }

        case SHEMBULLIDYTE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case SHEMBULLIDYTE_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const shembullidyteUpdateReducer = (state = { shembullidyte: {} }, action) => {
    switch (action.type) {
        case SHEMBULLIDYTE_UPDATE_REQUEST:
            return { loading: true }

        case SHEMBULLIDYTE_UPDATE_SUCCESS:
            return { loading: false, success: true, shembullidyte: action.payload }

        case SHEMBULLIDYTE_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case SHEMBULLIDYTE_UPDATE_RESET:
            return { shembullidyte: {} }

        default:
            return state
    }
}



