/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export default function MainComponent({task,handleStatus,handleEdit,handleDelete}){
   
    return (<div className='task' key={task.id} id={task.id}  >
              
    <div className='task-decoration'/>
    <span className='task-description'>{task.description}</span>
    
    <div className={`status ${task.status}`}>{task.status}</div> 
      
    <button className="btn btn-startTask" onClick={()=>handleStatus(task.id,"InProgress")}>Start</button>
    <button className="btn btn-endTask" onClick={()=>handleStatus(task.id,"Completed")}>End</button>

    <button className="btn btn-edit" onClick={()=>handleEdit(task.id)}>edit</button>
    <button className="btn btn-delete" onClick={()=>handleDelete(task.id)}>delete</button>

</div>)
}

