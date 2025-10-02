export default function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} style={{ width: "100%" }} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      {product.hasPrice
        ? <p>${product.price.toFixed(2)}</p>
        : <p>N/A</p>}
      <button onClick={onAdd}>Add to RFP</button>
    </div>
  );
}
