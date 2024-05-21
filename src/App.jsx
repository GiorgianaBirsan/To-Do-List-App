import { Fragment, useState } from 'react'
import './App.css'
import MainComponent from './mainComponent'


function App() {
 
  const [id, setId] = useState(0)
  const [editingIndex, setEditingIndex]=useState("")
  const [newTask,setNewTask] = useState([])
  const [text,setText] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [filter, setFilter] = useState([])

  //Add new task in list
  function handleSubmit(){
    setId(id+1)
    setFilter([])
    const newObj= {id:id,description:text, status:"Not started"}
    if(text!=""){
      setNewTask([...newTask,newObj])
      setText("")
    } else{
      alert("Task needs a description")
    }
   
  }
    //Remove a task from the list
  function handleDelete(index){
    const removingTasks = newTask.filter(task => index != task.id)
    const removingFilteredTasks = filter.filter(task => index != task.id)
    setFilter(removingFilteredTasks)
    setNewTask(removingTasks)
    
  }

      //Trigger Edit event for the selected item
  function handleEdit(index){
    const currentIndex= newTask.findIndex(element=> element.id===index)
    const newText= newTask[currentIndex].description
    setEditingIndex(currentIndex)
    setIsEditing(true)
    setText(newText)   
  }

  //Saving the changes make for the selected item and updating the list
  function handleSaveEdit(){
    if(isEditing){
      if(text!=""){
        newTask[editingIndex].description=text
      }else{ 
      alert("Task need a description")
      return
    }
      setText("")
    }
    setIsEditing(false)
  }


  //Updating task's status
function handleStatus(index,updatedStatus){
  const enhancedStatus=newTask
  const currentIndex= enhancedStatus.findIndex(element=> element.id===index)
  enhancedStatus[currentIndex].status= updatedStatus
  setNewTask([...enhancedStatus])
}

//Filtering tasks by status
function filtering(status){
  const taskFilter= newTask.filter(task=> task.status==status)
  
  if(taskFilter.length>0){
   setFilter(taskFilter)
  }else{
   alert(`There is no task ${status.toLowerCase()}`)
   return
  }
}

  return <Fragment>
      <p>Add a new task to the list</p>

      <input type='text' name='task' value={text} onChange={(e)=> setText(e.target.value)}/>
      <button className='btn btn-addTask' type='submit' onClick={isEditing?handleSaveEdit :handleSubmit}>{isEditing?"Save":"Add task"}</button>
     
     <div className='task-filter'>
        <button className='btn-filter'  onClick={()=>filtering("Not started")}>Not started</button>
        <button className='btn-filter'  onClick={()=>filtering("InProgress")}>In Progress</button>
        <button className='btn-filter'  onClick={()=>filtering("Completed")}>Completed</button>
        <button className='btn-filter'  onClick={()=>{setFilter([])}}>X</button>
      </div>


      <div className='tasks-list-filter'>
        {filter?.map((task,index)=>{
          return (
            <MainComponent 
              key={index} 
              id={id} 
              task={task} 
              handleStatus={handleStatus}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
        )
        }).reverse()
        }
      </div>

      {filter.length>0 && <p>------ All tasks -------</p>} 

      <div className='tasks-list'>
        {newTask?.map((task,index)=>{
        
         return (
            <MainComponent 
              key={index} 
              id={id} 
              task={task} 
              handleStatus={handleStatus}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
         )
        }).reverse()
        }
      </div>
    </Fragment>

}

export default App;
