import React, { useState } from "react";

export default function BadgeForm({ onCreate }) {
  const [form, setForm] = useState({
    nombre: "",
    titulo: "",
    repeticionesNecesarias: "",
    imagen: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onCreate(form);
    setForm({ nombre: "", titulo: "", repeticionesNecesarias: "", imagen: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
      <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required className="border p-2 rounded" />
      <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" required className="border p-2 rounded" />
      <input name="repeticionesNecesarias" value={form.repeticionesNecesarias} onChange={handleChange} placeholder="Veces requeridas para obtener el badge (1-100000)" type="number" min="1" max="100000" required className="border p-2 rounded" />
      <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="URL de imagen" required className="border p-2 rounded" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Crear Badge</button>
    </form>
  );
}
