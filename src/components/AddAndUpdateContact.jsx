import React from 'react'
import Model from '../components/Model'
import { Formik, Form, Field } from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import {toast} from "react-toastify"

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
    

    const addContact = async (contact) => {
        try {
            const contactRef = collection(db,"Contact")
            // await const addDoc(contactRef,contact);
            console.log(2-2);
            await addDoc(contactRef, contact);
            toast.success("Added Successfully");
            onClose();

        }
        catch (error) {
            console.log("Error");
        }
    };


    // edit function
    
    const editContact = async (contact,id) => {
        try {
            const contactRef = doc(db, "Contact",id)
            // await const addDoc(contactRef,contact);
            await updateDoc(contactRef, contact);
            toast.success("Updated succesfully");
            onClose();
        }
        catch (error) {
            console.log("Errorinedit");
        }
    };

    return (
        <div>


            <Model
                isOpen={isOpen}
                onClose={onClose}>

                <Formik
                // initialValues={isUpdate ? { name: contact.name || '', Email: contact.Email || '' } : { name: '', Email: '' }}

                    initialValues=
                    {
                        isUpdate ? {
                            name: contact.name,
                            Email: contact.Email,

                        }
                            : {
                                name: "",
                                Email: "",

                            }
                    }
                    onSubmit={(values) => {
                        console.log(values);
                        isUpdate?
                        editContact(values,contact.id):
                        addContact({ name: values.name, Email: values.Email });
                        onClose();
                        // addContact(values);  this also work 
                    }}
                >
                    <Form className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-1'>

                            <label htmlFor='name'>Name:</label>
                            <Field name="name" className="border p-2 h-10 border-black "></Field>
                        </div>

                        <div className='flex flex-col gap-1'>

                            <label htmlFor='Email'>Email:</label>
                            <Field
                                // type="email"
                                name="Email" className="border border-black p-2 h-10 "></Field>
                        </div>
                        <button className=' bg-orange px-2 py-4 cursor-pointer  border-black border-2  hover:bg-black hover:text-white'>
                            {isUpdate ? "Update " : "Add "} Contact
                        </button>
                    </Form>
                </Formik>

            </Model>
        </div>
    )
}

export default AddAndUpdateContact