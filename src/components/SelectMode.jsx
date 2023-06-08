import React, { useState } from "react";
import { useAppSelector } from "../store/store/store";
import { useBoardActions } from "../store/store/useBoardAction";

export const SelectMode = () => { 
  const state = useAppSelector((state) => state.tateti)
  const {modeChange} = useBoardActions()
  const [mode, setMode] = useState("")


  const handleMode =(e)=>{
    console.log(mode)
    e.preventDefault()
    modeChange({newMode:mode})
  }
  return (
    <form onSubmit={handleMode} onChange={(e)=> setMode(e.target.value)} className="form-mode text-slate-500">
      <label htmlFor="mode">Selecciona un modo:</label>
      <div>
        <select name="mode" id="mode" >
          <option value="offline">Off-line</option>
          <option value="online">On-line</option>
        </select>
        <button className="btn">Cambiar</button>
      </div>
    </form>
  );
};
