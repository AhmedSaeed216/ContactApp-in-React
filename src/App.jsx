import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FiSearch } from "react-icons/fi"
import { AiFillPlusCircle } from "react-icons/ai"
import {collection, deleteDoc, getDocs,doc, onSnapshot} from "firebase/firestore"
import { db } from './config/firebase'

import AddAndUpdateContact from './components/AddAndUpdateContact'
import ContactCard from './components/ContactCard'

// following imports are for react-tosify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from './components/NotFoundContact'

const App = () => {


  const [Contact,setContact]=useState([]);
  const [isOpen,setOpen] = useState(false);

  const onOpen = () =>
  {
    setOpen(true);
  }
  
  const onClose=()=>
  {
    setOpen(false);
  }



  const searchfilter =(e)=>{
    const value= e.target.value;

    const contactRef= collection(db,"Contact");
    
    
    onSnapshot(contactRef,(snapshot)=>{

      // snapshoot is used to immediately update the screen(firebase)
      const contactList = snapshot.docs.map((doc)=>
      {
        return{
          id:doc.id,
        ...doc.data()
        };
      });  //this line will give the array that contain the email and the name
    
    const filterContact=contactList.filter((Contact)=>Contact.name.toLowerCase().includes(value.toLowerCase()));
    
    // console.log(filterContact);
      setContact(filterContact);
      return filterContact;
      // search functionality
  });
  };
  useEffect(() => {



  // );
  const getContact = async ()=>{
    try {
    
      // const contactRef = collection(db,Contact);
      const contactRef= collection(db,"Contact");
      // const contactRef = collection(db,"contacts");
      const getSnapShot = await getDocs(contactRef);
      


      // onSnapshot(contactRef,(snapshot)=>{

        onSnapshot(contactRef,(getSnapShot)=>{
        // snapshoot is used to immediately update the screen(firebase)
        // const contactList = snapshot.docs.map((doc)=>
          const contactList = getSnapShot.docs.map((doc)=>

        {
          return{
            id:doc.id,
          ...doc.data()
          }
        }
      );  //this line will give the array that contain the email and the name
        console.log(contactList);
        setContact(contactList);
        return contactList;
      });
    } 
    catch (error) {
      console.log("error");
    }
  };
  getContact();
  },[]);




  return (
    <>
    <div className='max-w-[370px] mx-auto'>
            <Navbar />
      <div className='flex gap-2'>

        <div className='flex items-center relative flex-grow'>
          <FiSearch className='text-white text-3xl absolute ml-1 ' />
          <input 
          onChange={searchfilter}
         

            type="text" className=' rounded-lg flex-grow border border-white bg-transparent h-10 text-white pl-9' />
        </div>

        <AiFillPlusCircle  onClick={onOpen} 
        className='text-white text-5xl cursor-pointer'/>

      </div>

{/* displaying the contacts */}
      <div>
        {
        Contact.length<=0 ?
         (<NotFoundContact /> )
         :(
          Contact.map((contact)=>(
          <ContactCard key={contact.id} contact={contact}/>
          ))
        )}
      </div>
    </div>
 

    {/* add functionality */}
    <AddAndUpdateContact 
    isOpen={isOpen}
    onClose={onClose} 
    // isUpdate
    contact={Contact}
    />
    
<ToastContainer
position=' bottom-center'
className=" flex justify-center  m-5"

/>
    </>
  )
}

export default App