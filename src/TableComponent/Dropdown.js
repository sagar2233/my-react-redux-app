import React,{useState, useEffect} from "react"

import './style.css'

const Dropdown = ({handleDropdown = () => {}}) =>{
    const [showFilters,setShowFilters] = useState(false)
    const [ filters, setFilters] = useState(['name', 'office', 'position'])

    useEffect(() => {
        handleDropdown(filters)
    }, [filters ])


    const handleCheckBox = (e)=> {
        
        if(e.target.checked){
         setFilters([...filters, e.target.name])   
        }else{
            const arr = [...filters]
            const index = arr.indexOf(e.target.name)
            if(index > -1){
                arr.splice(index,1)
                setFilters(arr)
            }
        }
        
    }
    return(
        <div className="dropdown" >
           <p onClick={() => setShowFilters((item)=> !item)}> Filter ^ </p>
            
                {showFilters &&
                <div className="filterContainer">
                <p><label>Name</label> <input value={filters.includes('name')} name="name" onChange={handleCheckBox} type="checkbox"/></p>
                <p> <label>Office</label> <input value={filters.includes('office')} name="office" onChange={handleCheckBox} type="checkbox"/></p>
                <p> <label>Position</label> <input value={filters.includes('position')} name="position" onChange={handleCheckBox} type="checkbox"/></p>
                </div>}
           
        </div>
    )
}
export default Dropdown;