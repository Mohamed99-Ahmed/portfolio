import React from 'react'
import { FaExclamation } from 'react-icons/fa'

export default function Title({children,className}:{children:string,className?:string}) {
  return (
    <>
           <h2 className={`header  mx-auto font-extrabold text-4xl md:text-7xl ${className}` }  >
                              <p className="relative capitalize w-fit  text-gray-400 mx-auto">
                                {children}
                                <span className="after absolute right-full top-1/2 -translate-y-1/2 text-scolor ">
                                <FaExclamation />
                              </span>
                              <span className="after absolute  top-1/2 -translate-y-1/2 text-scolor">
                                <FaExclamation />
                              </span>
                              </p>
                             
                            </h2>
    </>
  )
}
