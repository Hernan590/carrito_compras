import { useEffect, useState } from 'react';
import ProductList from './components/Productlist';
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'https://api-carrito.onrender.com';

// Función para obtener todas las combinaciones posibles
function getAllCombinations(arr) {
  const result = [];
  const n = arr.length;

  function helper(start, combo) {
    result.push(combo);
    for (let i = start; i < n; i++) {
      helper(i + 1, combo.concat(arr[i]));
    }
  }

  helper(0, []);
  return result;
}

// Función findBestCombination
function findBestCombination(products, budget) {
  const allCombos = getAllCombinations(products);

  let bestCombo = [];
  let bestTotal = 0;

  for (const combo of allCombos) {
    const total = combo.reduce((sum, p) => sum + p.price, 0);
    if (total <= budget && total > bestTotal) {
      bestTotal = total;
      bestCombo = combo;
    }
  }

  return bestCombo;
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [budget, setBudget] = useState(200);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Cargar lista productos desde la API
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);

  // Cargar contenido del carrito desde la API
  const loadCart = () => {
    fetch(`${API_URL}/cart`)
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(console.error);
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Agregar producto al carro
  const addToCart = (productId) => {
    fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: productId })
    })
      .then(res => {
        if (!res.ok) throw new Error('Error agregando al carrito');
        return res.json();
      })
      .then(() => loadCart())
      .catch(console.error);
  };

  const handleFindCombination = () => {
    const result = findBestCombination(products, budget);
    setSelectedProducts(result);
  };

  return (
    <div style={{ maxWidth: 1200, margin: 'auto', padding: 15 }}>
      <h1>Lista de Productos</h1>
      <div className="mb-3">
        <label className="form-label">Combinacion de productos con el mayor valor:</label>
        <input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="form-control" style={{ maxWidth: 350 }}/>
      </div>
      <button className="btn btn-success mb-3" onClick={handleFindCombination}>Buscar</button>
      {selectedProducts.length > 0 && (
        <div>
          <h4>Mejor combinacion:</h4>
          <ul>
            {selectedProducts.map((p) => (
              <li key={p.id}>{p.name} - ${p.price}</li>
            ))}
          </ul>
          <strong>
            Total: ${selectedProducts.reduce((sum, p) => sum + p.price, 0)}
          </strong>
        </div>
      )}
      <ProductList products={products} onAdd={addToCart} />
      <h2>Carrito</h2>
      <Cart items={cartItems} />
    </div>
  );
}
