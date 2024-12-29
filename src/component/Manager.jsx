/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", password: "", username: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async()=>{
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setpasswordArray(passwords)
        console.log(passwords)
    }

    useEffect(() => {
        getPasswords()
       
    }, [])

    const editPassword = (id) => {

        const newPasswords = {...passwordArray.filter(i => i.id === id)[0], id:id}
        setform(newPasswords);
        const newPassword = passwordArray.filter(item => item.id != id)
        setpasswordArray(newPassword);
    }

    const deletePassword = async(id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this password?");
        if (confirmDelete) {

            const newPasswords = passwordArray.filter(item => item.id !== id);
            setpasswordArray(newPasswords);

            let res = await fetch("http://localhost:3000/", {method: "DELETE" , headers:{"Content-Type":"application/json"}, body: JSON.stringify({id})})

            // localStorage.setItem("passwords", JSON.stringify(newPasswords));
            toast.success('Deleted!', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const copyText = (text) => {
        toast.success('Copied to Clipboard', {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        if (ref.current.src.includes("icons/visibilitycross.png")) {
            ref.current.src = "icons/visibility.png"
            passwordref.current.type = "password"
        }
        else {
            ref.current.src = "icons/visibilitycross.png"
            passwordref.current.type = "text"
        }

    }
    const savePassword = async() => {
        if (!form.site || !form.username || !form.password) {
            toast.error('All fields must be filled!', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return; 
        }
        await fetch("http://localhost:3000/", {method: "DELETE" , headers:{"Content-Type":"application/json"}, body: JSON.stringify({id:form.id})})


        const newPasswords = [...passwordArray, { ...form, id: uuidv4() }];
        setpasswordArray(newPasswords);
        await fetch("http://localhost:3000/", {method: "POST" , headers:{"Content-Type":"application/json"}, body: JSON.stringify({ ...form, id: uuidv4() })})
        // localStorage.setItem("passwords", JSON.stringify(newPasswords));
        setform({ site: "", password: "", username: "" });
        toast.success('Saved!', {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };
    


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }
    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
            <div className="p-2 md:py-3 md:mycontainer">
                <h1 className='font-bold text-3xl text-center'><span className="text-blue-600">&lt;</span>
                    <span className="text-black">Pass</span><span className="text-blue-600">OP/&gt;</span></h1>

                <p className='text-blue-800 text-lg text-center'>Your own password manager</p>

                <div className="text-white flex flex-col gap-5 my-3 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter your website URL' className='w-full rounded-full border border-blue-600 py-1 px-3 text-black' type="text" name='site' id='' />
                    <div className="flex gap-6 justify-between w-full">
                        <input value={form.username} onChange={handleChange} placeholder='Enter username' className='w-full rounded-full border border-blue-600 py-1 px-3 text-black' type="text" name='username' id='' />
                        <div className="relative flex items-center">

                            <input ref={passwordref} value={form.password} onChange={handleChange} placeholder='Enter Password' className='w-full rounded-full border border-blue-600 py-1 px-3 text-black' type="password" name='password' id='' />
                            <span className='absolute invert right-[5px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={20} src="icons/visibility.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='text-black gap-2 flex justify-center items-center rounded-full bg-blue-500 hover:bg-blue-600 px-8 py-1 border-2 border-blue-700'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save</button>

                </div>
                <div className="passowrds">
                    <h2 className='text-blue-700 text-center text-xl font-bold py-1'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto md:w-full md:overflow-hidden overflow-auto rounded-md">
                        <thead className='bg-blue-600'>
                            <tr>
                                <th className='text-center py-1 font-serif'>Website</th>
                                <th className='text-center py-1 font-serif'>Username</th>
                                <th className='text-center py-1 font-serif'>Password</th>
                                <th className='text-center py-1 font-serif'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-blue-200'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white'>
                                        <div className='flex justify-center items-center gap-2'>
                                            <a href={item.site} target='_blank' >
                                                <span>{item.site}</span></a>
                                            <div className='size-6 cursor-pointer' onClick={() => copyText(item.site)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ "width": "23px", "height": "23px", "paddingTop": "3px" }}
                                                >
                                                </lord-icon>
                                            </div>

                                        </div>
                                    </td>
                                    <td className='py-2 border border-white'>
                                        <div className='flex justify-center items-center gap-2'>
                                            <span>{item.username}</span>
                                            <div className='size-6 cursor-pointer' onClick={() => copyText(item.username)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ "width": "23px", "height": "23px", "paddingTop": "3px" }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white'>
                                        <div className='flex justify-center items-center gap-2'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='size-6 cursor-pointer' onClick={() => copyText(item.password)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ "width": "23px", "height": "23px", "paddingTop": "3px" }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white'>
                                        <div className='flex justify-center items-center gap-2'>
                                            <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "23px", "height": "23px", "paddingTop": "3px" }}
                                                >
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "23px", "height": "23px", "paddingTop": "3px" }}
                                                >
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}

export default Manager
