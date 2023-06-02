import React from "react";

export const SelectMode = () => {
  return (
    <form action="" onSubmit={handleMode} className="form-mode">
      <label htmlFor="mode">Selecciona un modo:</label>
      <div>
        <select name="mode" id="mode">
          <option value="offline">Offline</option>
          <option value="online">Online</option>
        </select>
        <button className="btn">Cambiar</button>
      </div>
    </form>
  );
};
