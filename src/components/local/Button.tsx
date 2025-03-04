const Button=({children,onClick}:{children:React.ReactNode,onClick:()=>void})=>{
    return <button className="cursor-pointer text-sm px-4 py-2 rounded-full text-[#00FF00] bg-[#00ff0018] border border-[#00ff0018] hover:border-[#00ff00]" onClick={onClick}>{children}</button>
    
}

export default Button;