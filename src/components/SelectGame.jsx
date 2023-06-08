import React from "react";
import { useBoardActions } from "../store/store/useBoardAction";
import { SelectBox, SelectBoxItem } from "@tremor/react";


export const SelectGame = () => {
  const { setSetting ,setBoard:updateDashboard } = useBoardActions();

  const handleMode = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const mode = formData.get("mode");
    // setBoard(Array(9).fill(null));
    updateDashboard(Array(9).fill(null))
    if (mode === "tateti") {
      // setboardSize({
      //   size: 9,
      //   grid: 3 * 3,
      //   classNameGrid: "board3x3",
      // });
      setSetting({
        size: 9,
        grid: 3 * 3,
        classNameGrid: "board3x3",
      });
    } else if (mode === "4inline") {
      // setBoard(Array(42).fill(null));
      updateDashboard(Array(42).fill(null))
      // setboardSize({
      //   size: 42,
      //   grid: 6 * 7,
      //   classNameGrid: "board6x7",
      // });

      setSetting({
        size: 42,
        grid: 6 * 7,
        classNameGrid: "board6x7",
      });
    }
  };

  return (
    
    <form action="" onSubmit={handleMode} className="form-mode text-slate-500">
      <label htmlFor="mode">Selecciona un juego:</label>
      <div >
        <select name="mode" id="mode">
          <option value="tateti">Ta-te-ti</option>
          <option value="4inline">4 en linea</option>
        </select>
        <button className="btn">Cambiar</button>
      </div>
    </form>


  
  );
};
