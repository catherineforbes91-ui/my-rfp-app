export default function CartItem({ item, onRemove }) {
  return (
    <div className="cart-item">
      <span>{item.title}</span>
      <span>Qty: {item.qty}</span>
      {item.price != null && <span> (${item.price})</span>}
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}
