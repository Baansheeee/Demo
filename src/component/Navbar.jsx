// eslint-disable-next-line no-unused-vars
import React from "react"

const Navbar = () => {
    return (
        <nav className="bg-[#1b1f23]">
            <div className="mycontainer flex justify-between items-center px-3 py-2">
                <div className="logo font-bold font-serif text-white text-2xl">
                    <span className="text-blue-600">&lt;</span>
                    <span className="text-white">Pass</span><span className="text-blue-600">OP/&gt;</span>                  
                    </div>
                {/* <ul className="flex gap-5">
                    <li className=" hover:font-bold">
                        <a className="font-serif text-white" href="#">Home</a>
                    </li>
                    <li className=" hover:font-bold">
                        <a className="font-serif text-white" href="#">About</a>
                    </li>
                    <li className=" hover:font-bold">
                        <a className="font-serif text-white" href="#">Contact</a>
                    </li>
                </ul> */}
                <button className="flex justify-center items-center text-white border border-white rounded-full px-6 py-1">
                    <img className="w-8 " src="/icons/github.png" alt="github" />
                    <span className="font-bold">Github</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
