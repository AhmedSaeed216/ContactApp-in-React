import { HiOutlineUserCircle } from "react-icons/hi"
import { IoMdTrash } from "react-icons/io"
import { RiEditCircleLine } from "react-icons/ri"
import { collection, deleteDoc, doc } from "firebase/firestore"
import { db } from "../config/firebase"
import AddAndUpdateContact from "./AddAndUpdateContact"
import { useState } from "react"
import {toast} from "react-toastify"
const ContactCard = ({ contact }) => {

    const [isOpen,setOpen] = useState(false);

    const onOpen = () =>
    {
      setOpen(true);
    }
    
    const onClose=()=>
    {
      setOpen(false);
    }
 
    
  
  const delContact=async (id)=>{
    try {
        
        //  await deleteDoc(doc(db,"Contact",id)); 
        // this line and the following 2 line do the same work
        
        const contactRef= collection(db,"Contact");
        await deleteDoc(doc(contactRef,id));
        toast.success("Deleted successfully");
      console.log("deleted");
      

    } catch (error) {
        console.log("error");
    }
}



    return <>
    <div key={contact.id} className=' p-2 rounded-2xl  mt-2 bg-yellow  justify-between flex '>

    <div className='flex  gap-2'>
    
                  <HiOutlineUserCircle  className=' text-4xl text-orange'/>
                    <div className=''>
                      <h2 className=' font-medium'>{contact.name}</h2>
                      <p className=' text-sm'>{contact.Email}</p>
                      
    </div>
                    </div>
                    <div className='items-center  flex text-3xl cursor-pointer'>
                      <RiEditCircleLine 
                      onClick={onOpen} 
                      />
                      <IoMdTrash 
                      onClick={() => delContact(contact.id)} 
                      className='text-orange' />
    
                    </div>
                </div>


{/* edit functionality */}
                <AddAndUpdateContact
                
                contact={contact}
                isUpdate
                isOpen={isOpen}
                 onClose={onClose}
                 />

</>

}

export default ContactCard