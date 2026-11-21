import { BeanCard, beans } from '../../../entities/bean/index.js'
import { AddToCartButton } from '../../../features/cart/index.js'
import { FavoriteButton } from '../../../features/favorites/index.js'

export default function CatalogPage() {
  return (
    <>
      <h1>Кава в зернах</h1>
      <section className="catalog" aria-labelledby="catalog-title">
        <h2 id="catalog-title">Усі сорти ({beans.length})</h2>
        <ul className="bean-grid">
          {beans.map((bean) => (
            <li key={bean.id}>
              <BeanCard
                bean={bean}
                favoriteControl={
                  <FavoriteButton productId={bean.id} name={bean.name} />
                }
                addControl={<AddToCartButton bean={bean} />}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
