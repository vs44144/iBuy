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
    EXAMPLE_CREATE_RESET,

    EXAMPLE_UPDATE_REQUEST,
    EXAMPLE_UPDATE_SUCCESS,
    EXAMPLE_UPDATE_FAIL,
    EXAMPLE_UPDATE_RESET,

    EXAMPLE_TOP_REQUEST,
    EXAMPLE_TOP_SUCCESS,
    EXAMPLE_TOP_FAIL,
    
} from '../constants/exampleConstants'

export const exampleListReducer = (state = { examples: [] }, action) => {
    switch (action.type) {
        case EXAMPLE_LIST_REQUEST:
            return { loading: true, examples: [] }

        case EXAMPLE_LIST_SUCCESS:
            return {
                loading: false,
                examples: action.payload.examples,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case EXAMPLE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const exampleDetailsReducer = (state = { example: { reviews: [] } }, action) => {
    switch (action.type) {
        case EXAMPLE_DETAILS_REQUEST:
            return { loading: true, ...state }

        case EXAMPLE_DETAILS_SUCCESS:
            return { loading: false, example: action.payload }

        case EXAMPLE_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
export const exampleDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case EXAMPLE_DELETE_REQUEST:
            return { loading: true }

        case EXAMPLE_DELETE_SUCCESS:
            return { loading: false, success: true }

        case EXAMPLE_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const exampleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case EXAMPLE_CREATE_REQUEST:
            return { loading: true }

        case EXAMPLE_CREATE_SUCCESS:
            return { loading: false, success: true, example: action.payload }

        case EXAMPLE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case EXAMPLE_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const exampleUpdateReducer = (state = { example: {} }, action) => {
    switch (action.type) {
        case EXAMPLE_UPDATE_REQUEST:
            return { loading: true }

        case EXAMPLE_UPDATE_SUCCESS:
            return { loading: false, success: true, example: action.payload }

        case EXAMPLE_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case EXAMPLE_UPDATE_RESET:
            return { example: {} }

        default:
            return state
    }
}




export const exampleTopRatedReducer = (state = { examples: [] }, action) => {
    switch (action.type) {
        case EXAMPLE_TOP_REQUEST:
            return { loading: true, examples: [] }

        case EXAMPLE_TOP_SUCCESS:
            return { loading: false, examples: action.payload, }

        case EXAMPLE_TOP_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
