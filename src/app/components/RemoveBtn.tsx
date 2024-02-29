import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'



interface RemoveBtnProps {
  taskId: string;
  onDelete: (taskId: string) => void;
}
const RemoveBtn: React.FC<RemoveBtnProps> = ({ taskId, onDelete }) => {
  const handleDelete = () => {
    // Call the onDelete function with the taskId when the button is clicked
    onDelete(taskId);
  };

  return (
   <button onClick={handleDelete}  className='text-red-400'>
    <HiOutlineTrash size={24}/>
   </button>
  )
}

export default RemoveBtn
