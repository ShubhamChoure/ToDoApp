import { useState, useEffect, useRef ,useId } from 'react'
import { v4 as uuidv4 } from 'uuid';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './components/NavBar'
import Card from './components/Card'
import './App.css'

function App() {
  const [inputData, setInputData] = useState({});
  const [dataArray,setDataArray] = useState([]);
  const isEdit = useRef(false);
  const editId = useRef("");
  const [showCom,setShowCom] = useState(false);
  useEffect(() => {
    let data = localStorage.getItem("iTask");
    if(data!=null || data!=undefined){
      setDataArray(JSON.parse(localStorage.getItem("iTask")))
    }
  }, [])

  useEffect(() => {
    
  })
  
  
  useEffect(() => {
    if(dataArray.length>0){
    localStorage.setItem("iTask",JSON.stringify(dataArray))
    }
  }, [dataArray])

  const onInputChange = (e) => {
    setInputData({...inputData,[e.target.name]:e.target.value})
  }

  const onSaveBtn = (e) => {
    if(!isEdit){
     let id = uuidv4();
     setDataArray([...dataArray,{...inputData,"com":false,"id":id}]);
     setInputData({"task":""});
    }else{
      let id = uuidv4();
      isEdit.current = false;
      let editArr = dataArray.filter((item)=>item.id!=editId.current);
      editArr = [...editArr,{...inputData,"com":false,"id":id}];
      setDataArray(editArr);
    }
  }

  const onShowCheck = (e) => {
        setShowCom(e.target.checked);
  }

  const onEditBtn = (e)=>{
        isEdit.current =true;
        editId.current = e.target.name;
        let editCard = dataArray.find((item)=>item.id==e.target.name);
        setInputData({"task":editCard.task});
  }
  const onDeleteBtn= (e)=>{
        let delArr = dataArray.filter((item)=>item.id!=e.target.name);
        setDataArray(delArr);
  }
  const onComCheck = (e) => {
        if(e.target.checked){
          let toogleCard = dataArray.find((item)=>item.id==e.target.name);
          let tempArray = dataArray.filter((item)=>item.id!=e.target.name)
          toogleCard.com = true;
          tempArray.push(toogleCard);
          setDataArray(tempArray);
          
        }else{
          let toogleCard = dataArray.find((item)=>item.id==e.target.name);
          let tempArray = dataArray.filter((item)=>item.id!=e.target.name)
          toogleCard.com = false;
          tempArray.push(toogleCard);
          setDataArray(tempArray);
        }
  }
      
  

  return (

    <>
      <NavBar />
      <div className=' w-5/6 h-fit ml-auto mr-auto flex flex-col gap-3 bg-purple-300 border-2 border-gray-500 p-3'>
        <h1 className=' text-xl font-bold text-center'>iTask - Manage Your TODO At One Place</h1>
        <span className=' font-bold'>Add Your TODO</span>
        <div className='flex w-full gap-2'>
          <input className=' w-full rounded-full p-3' type="text" placeholder='  Add Your TODO' value={inputData.task} name='task' onChange={onInputChange} />
          <button className=' ml-auto bg-purple-500 text-white pl-4 pr-4 pt-2 pb-2 rounded-full' onClick={onSaveBtn}>Save</button>
        </div>
        <div className="show">
          <input className=' mr-2' type="checkbox" name='show' onChange={onShowCheck} />
          <label htmlFor="show">Show Completed TODO</label>
        </div>
        <div className="hr h-1 w-full bg-gray-500"></div>
        <span className=' font-bold'>Your TODO's</span>

        {dataArray.map((item)=>{
            if(item.com==showCom){
              return <div className='flex justify-center' name={item.id} key={item.id}>
              <input type='checkbox' name={item.id} onChange={onComCheck} checked={item.com} />
              <Card task={item.task} com={item.com} name={item.id} />
              <button className='ml-auto bg-purple-500 rounded-full p-2 text-white' name={item.id} onClick={onEditBtn}>
                Edit
              </button>
              <button className='ml-2 bg-purple-500 rounded-full p-2 text-white' name={item.id} onClick={onDeleteBtn}>
                Delete
              </button>
            </div>
            }
          
          
        })}
      </div>
    </>
  )
}

export default App
