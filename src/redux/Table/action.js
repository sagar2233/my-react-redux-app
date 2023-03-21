import { GET_TABLE_DATA } from "./types";
import axios from "axios"



export const getTableData = () => dispatch =>{
    
    axios
    .get("./data.json")
    .then((res)=>{
        console.log(res)
        dispatch({type:'GET_TABLE_DATA', payload:res.data})
    }).catch((err)=>{
        console.log(err)
    })

}