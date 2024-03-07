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
    SATELLITE_CREATE_RESET,

    SATELLITE_UPDATE_REQUEST,
    SATELLITE_UPDATE_SUCCESS,
    SATELLITE_UPDATE_FAIL,
    SATELLITE_UPDATE_RESET
    
} from '../constants/satelliteConstants'

export const satelliteListReducer = (state = { satellites: [] }, action) => {
    switch (action.type) {
        case SATELLITE_LIST_REQUEST:
            return { loading: true, satellites: [] }

        case SATELLITE_LIST_SUCCESS:
            return {
                loading: false,
                satellites: action.payload.satellites,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case SATELLITE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const satelliteDetailsReducer = (state = { satellite: { reviews: [] } }, action) => {
    switch (action.type) {
        case SATELLITE_DETAILS_REQUEST:
            return { loading: true, ...state }

        case SATELLITE_DETAILS_SUCCESS:
            return { loading: false, satellite: action.payload }

        case SATELLITE_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
export const satelliteDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case SATELLITE_DELETE_REQUEST:
            return { loading: true }

        case SATELLITE_DELETE_SUCCESS:
            return { loading: false, success: true }

        case SATELLITE_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const satelliteCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SATELLITE_CREATE_REQUEST:
            return { loading: true }

        case SATELLITE_CREATE_SUCCESS:
            return { loading: false, success: true, satellite: action.payload }

        case SATELLITE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case SATELLITE_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const satelliteUpdateReducer = (state = { satellite: {} }, action) => {
    switch (action.type) {
        case SATELLITE_UPDATE_REQUEST:
            return { loading: true }

        case SATELLITE_UPDATE_SUCCESS:
            return { loading: false, success: true, satellite: action.payload }

        case SATELLITE_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case SATELLITE_UPDATE_RESET:
            return { satellite: {} }

        default:
            return state
    }
}




// export const satelliteTopRatedReducer = (state = { satellites: [] }, action) => {
//     switch (action.type) {
//         case SATELLITE_TOP_REQUEST:
//             return { loading: true, satellites: [] }

//         case SATELLITE_TOP_SUCCESS:
//             return { loading: false, satellites: action.payload, }

//         case SATELLITE_TOP_FAIL:
//             return { loading: false, error: action.payload }

//         default:
//             return state
//     }
// }
