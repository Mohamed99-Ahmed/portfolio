import React from 'react'

export default function Button({children,className}:{children:any,className?:string}):React.ReactElement {
  return (
   /* From Uiverse.io by Itskrish01 */ 
<button
  className={`relative text-2xl cursor-pointer inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none ${className}`}
>
  <span
    className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#31c38e_0%,#9CA3AF_50%,#7B52A1_100%)]"
  >
  </span>
  <span
    className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-4  font-medium text-white backdrop-blur-3xl gap-2 undefined $`}
  >
    {children}
   
  </span>
 
</button>

  )
}
