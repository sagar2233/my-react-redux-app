import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getTableData} from "../redux/Table/action"
import Dropdown from './Dropdown';
import './style.css'


 const TableData = () => {
    const dispatch = useDispatch();

    const {data} = useSelector(state => state.tableReducer)
    console.log(data,"sagar")

    const [TableData,setTableData] = useState([]) 
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage,setitemsPerPage] = useState(5);
    const [pageNumberLimit,setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit,setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit,setminPageNumberLimit] = useState(0);
    const [handleinput,setHandleinput] = useState()
    const [filterArray, setFilterArray] = useState([])

    const handlePage = (event) =>{
        setCurrentPage(Number(event.target.id))

    }



    const pages = [];
    for(let i = 1;i<=Math.ceil(TableData.length/itemsPerPage);i++){
        pages.push(i);
    }

    
    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = TableData.slice(indexOfFirstItem,indexOfLastItem)

    const renderPageNumbers = pages.map((number)=>{
       if(number<maxPageNumberLimit+1&&number>minPageNumberLimit){
        return(
          <li
          key={number}
          id={number}
          onClick={handlePage}
          className={currentPage==number?"active":""}
          
          >
              {number}
          </li>
        )
        
       }else{
        return null;
       }
    })

useEffect(()=>{
    dispatch(getTableData())
},[])

useEffect(()=>{
    setTableData(data)
},[data])


const inputhandler = (e) =>{
  const val = e.target.value;
  setHandleinput(val);
  if(val){
    
    const filterData = TableData.filter((item)=>
    filterArray.some(key => (item[key]).toLowerCase().includes(val.toLowerCase())   ))
    setTableData(filterData)
  }else{
    setTableData(data)
  }


}

const handleprev = () => {
  if(currentPage > 1){
    setCurrentPage(currentPage-1)
  }
  
}

const handleNext = () => {
  if(currentPage  < maxPageNumberLimit){
    setCurrentPage(currentPage+1)
  }
  
}
    

  return (
    <div className='main'>
        <input type="text" className='inputsearch' onChange={inputhandler}/>
        <Dropdown handleDropdown={setFilterArray}/>

    <div class="container">
    <div>   
    <div class="row heading">
        <div class="cell">Name</div>
        <div class="cell">Position</div>
        <div class="cell">Office</div>
    </div>
    </div>
    <div className='column'>
      {currentItems.map((item)=>(
        <>     
        <div class="row">
        
         <div class="cell">{item.name}</div>
        
        
        
         <div class="cell"> {item.position}</div>
         
             
     
         <div class="cell"> {item.office}</div>
         </div>

      </>

      ))}
    </div>  

{/*   
    <div class="column">
      <div class="cell">Position</div>
      {TableData.map((item)=>(
      <div class="cell">{item.position}</div>
      ))}
      
    </div>
  
    <div class="column">
      <div class="cell">Office</div>
      {TableData.map((item)=>(
      <div class="cell">{item.office}</div>
      ))}
     
    </div> */}
  </div>
  <ul className='pageNumbers'>
  <li onClick={() => setCurrentPage(1)}>&lt; &lt;</li>
    <li onClick={handleprev}>&lt;</li>
         {renderPageNumbers}
         <li onClick={handleNext}>&gt;</li>
         <li onClick={() => setCurrentPage(maxPageNumberLimit)}>&gt; &gt;</li>
        </ul>
  </div>

  )
}
export default TableData;
