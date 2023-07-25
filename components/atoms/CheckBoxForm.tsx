import {FC} from "react";

export type CheckBoxFormProps={
    values:string[],
    selectedValue:string|undefined,
    handleSubmit:(arg:any)=>void,
    setSelectedOption:(arg:string)=>void
}

export const CheckBoxForm:FC<CheckBoxFormProps>=({values, selectedValue, handleSubmit, setSelectedOption})=>{
    const handleClick=()=>{}
    return (
        <form className="p-6" onSubmit={handleSubmit}>
            <div className="space-y-4 space-x-6">
                {
                    values.map((value)=>(
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="cursor-pointer  h-5 w-5 text-blue-600 rounded-lg "  checked={selectedValue === value}
                                   onChange={()=>{setSelectedOption(value)} }/>
                            <span className="ml-2 tracking-widest text-sm">{value}</span>
                        </label>))
                }
            </div>
            {selectedValue && <button type="submit" className="tracking-widest mt-6 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>}
        </form>
    );

}