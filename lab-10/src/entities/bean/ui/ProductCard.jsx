export default function ProductCard({
  product,
  favoriteControl,
  addControl,
  grindControl,
}) {
  return (
    <article className="product-card">
      <div className="product-title">
        <h1>{product.name}</h1>
        {favoriteControl}
      </div>
      <p className="lead">
        {product.origin}, {product.roast}. Ноти: {product.notes.join(', ')}.
      </p>
      {grindControl}
      <p className="price">
        {product.price} грн <span>за {product.weight}</span>
      </p>
      {addControl}
    </article>
  )
}
