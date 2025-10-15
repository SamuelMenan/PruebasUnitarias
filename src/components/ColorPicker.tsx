import React, { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "colorPickerColor";

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState<string>("#ffffff");

  useEffect(() => {
    const savedColor = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedColor) setColor(savedColor);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, color);
  }, [color]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-2 text-white">Selector de Colores</h2>
      <input
        type="color"
        value={color}
        onChange={handleChange}
        data-testid="color-input"
        className="w-12 h-12 border-2 border-slate-300 rounded-full mb-4"
      />
      <div
        data-testid="color-div"
        className="w-32 h-32 mx-auto rounded-lg border mt-4"
        style={{ backgroundColor: color }}
      />
      <div className="mt-2 text-white">Color actual: {color}</div>
    </div>
  );
};

export default ColorPicker;
