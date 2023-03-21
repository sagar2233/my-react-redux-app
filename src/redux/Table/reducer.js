const initialState = {
   data:[]
}


const tableReducer = (state = initialState,action) =>{

    switch(action.type){
    
        case 'GET_TABLE_DATA':
            return {
                ...state,
                data:action.payload
            }
            
        
        default :
        return state;

    }

    
}
export default tableReducer;