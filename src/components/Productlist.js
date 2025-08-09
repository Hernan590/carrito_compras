import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function ProductList({ products, onAdd }) {
  return (
    <table className="table table-striped table-hover">
      <thead className="table-dark">
        <tr className="text-center">
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center">Cargando productos...</td>
          </tr>
        ) : (
          products.map(p => (
            <tr className="text-center" key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => onAdd(p.id)}>
                  <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '5px' }} />
                  Agregar al carrito
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
