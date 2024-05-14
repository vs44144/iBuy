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
    PUNTORI_CREATE_RESET,

    PUNTORI_UPDATE_REQUEST,
    PUNTORI_UPDATE_SUCCESS,
    PUNTORI_UPDATE_FAIL,
    PUNTORI_UPDATE_RESET
    
} from '../constants/puntoriConstants'

export const puntoriListReducer = (state = { puntoris: [] }, action) => {
    switch (action.type) {
        case PUNTORI_LIST_REQUEST:
            return { loading: true, puntoris: [] }

        case PUNTORI_LIST_SUCCESS:
            return {
                loading: false,
                puntoris: action.payload.puntoris,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case PUNTORI_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const puntoriDetailsReducer = (state = { puntori: { reviews: [] } }, action) => {
    switch (action.type) {
        case PUNTORI_DETAILS_REQUEST:
            return { loading: true, ...state }

        case PUNTORI_DETAILS_SUCCESS:
            return { loading: false, puntori: action.payload }

        case PUNTORI_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
export const puntoriDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PUNTORI_DELETE_REQUEST:
            return { loading: true }

        case PUNTORI_DELETE_SUCCESS:
            return { loading: false, success: true }

        case PUNTORI_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const puntoriCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PUNTORI_CREATE_REQUEST:
            return { loading: true }

        case PUNTORI_CREATE_SUCCESS:
            return { loading: false, success: true, puntori: action.payload }

        case PUNTORI_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case PUNTORI_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const puntoriUpdateReducer = (state = { puntori: {} }, action) => {
    switch (action.type) {
        case PUNTORI_UPDATE_REQUEST:
            return { loading: true }

        case PUNTORI_UPDATE_SUCCESS:
            return { loading: false, success: true, puntori: action.payload }

        case PUNTORI_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case PUNTORI_UPDATE_RESET:
            return { puntori: {} }

        default:
            return state
    }
}




// export const puntoriTopRatedReducer = (state = { puntoris: [] }, action) => {
//     switch (action.type) {
//         case PUNTORI_TOP_REQUEST:
//             return { loading: true, puntoris: [] }

//         case PUNTORI_TOP_SUCCESS:
//             return { loading: false, puntoris: action.payload, }

//         case PUNTORI_TOP_FAIL:
//             return { loading: false, error: action.payload }

//         default:
//             return state
//     }
// }
