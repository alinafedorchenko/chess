const initialState = {
    size: 5,
    result: 0,
    clear_result: true
}
export default function page(state = initialState, action) {
    switch (action.type) {
        case 'SET_SIZE':
            return { ...state, size: action.payload, result: 0, clear_result: true }
        case 'SET_RESULT':
            return { ...state, result: action.payload, clear_result: false }
        default:
            return state;
    }
}
