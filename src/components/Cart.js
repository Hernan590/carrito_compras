import React from 'react';

export default function Cart({ items }) {
  if (items.length === 0) {
    return <p>El carrito está vacío</p>;
  }

  return (
    <table className="table table-bordered">
      <thead className="table-secondary">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>${item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
