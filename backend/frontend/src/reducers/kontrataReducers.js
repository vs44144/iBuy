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
    KONTRATA_CREATE_RESET,

    KONTRATA_UPDATE_REQUEST,
    KONTRATA_UPDATE_SUCCESS,
    KONTRATA_UPDATE_FAIL,
    KONTRATA_UPDATE_RESET
    
} from '../constants/kontrataConstants'

export const kontrataListReducer = (state = { kontratas: [] }, action) => {
    switch (action.type) {
        case KONTRATA_LIST_REQUEST:
            return { loading: true, kontratas: [] }

        case KONTRATA_LIST_SUCCESS:
            return {
                loading: false,
                kontratas: action.payload.kontratas,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case KONTRATA_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const kontrataDetailsReducer = (state ={},  action) => {
    switch (action.type) {
        case KONTRATA_DETAILS_REQUEST:
            return { loading: true, ...state }

        case KONTRATA_DETAILS_SUCCESS:
            return { loading: false, kontrata: action.payload }

        case KONTRATA_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const kontrataDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case KONTRATA_DELETE_REQUEST:
            return { loading: true }

        case KONTRATA_DELETE_SUCCESS:
            return { loading: false, success: true }

        case KONTRATA_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const kontrataCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case KONTRATA_CREATE_REQUEST:
            return { loading: true }

        case KONTRATA_CREATE_SUCCESS:
            return { loading: false, success: true, kontrata: action.payload }

        case KONTRATA_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case KONTRATA_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const kontrataUpdateReducer = (state = { kontrata: {} }, action) => {
    switch (action.type) {
        case KONTRATA_UPDATE_REQUEST:
            return { loading: true }

        case KONTRATA_UPDATE_SUCCESS:
            return { loading: false, success: true, kontrata: action.payload }

        case KONTRATA_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case KONTRATA_UPDATE_RESET:
            return { kontrata: {} }

        default:
            return state
    }
}




// export const kontrataTopRatedReducer = (state = { kontratas: [] }, action) => {
//     switch (action.type) {
//         case KONTRATA_TOP_REQUEST:
//             return { loading: true, kontratas: [] }

//         case KONTRATA_TOP_SUCCESS:
//             return { loading: false, kontratas: action.payload, }

//         case KONTRATA_TOP_FAIL:
//             return { loading: false, error: action.payload }

//         default:
//             return state
//     }
// }
