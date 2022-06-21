const initialState = {
    keyword:''
}

export function search_reducer(state = initialState, action){
    console.log(action.payload);
    switch(action.type){
        case "FIND":
            return{
                ...state,
                keyword:action.payload
            }
        default:
            return {...state}
    }
}