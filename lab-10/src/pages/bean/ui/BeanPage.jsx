import { ProductCard, beans } from '../../../entities/bean/index.js'
import { AddToCartButton } from '../../../features/cart/index.js'
import { FavoriteButton } from '../../../features/favorites/index.js'
import { Tabs } from '../../../shared/ui/index.js'
import { Link } from '../../../shared/ui/index.js'
import { paths } from '../../../shared/lib/index.js'
import BrewGuide from './BrewGuide.jsx'
import RelatedProducts from './RelatedProducts.jsx'
import ReviewList from './ReviewList.jsx'
import GrindPicker from './GrindPicker.jsx'
import { brewMethods } from '../model/brewMethods.js'
import { reviews } from '../model/reviews.js'

export default function BeanPage({ beanId }) {
  const bean = beans.find((item) => item.id === beanId)
  if (!bean) {
    return (
      <section className="not-found">
        <h1>Сторінку не знайдено</h1>
        <p>
          <Link to={paths.catalog()}>До каталогу</Link>
        </p>
      </section>
    )
  }

  const beanReviews = reviews.filter((review) => review.beanId === bean.id)
  const related = beans.filter((item) => item.id !== bean.id)

  return (
    <>
      <ProductCard
        product={bean}
        favoriteControl={
          <FavoriteButton productId={bean.id} name={bean.name} />
        }
        addControl={<AddToCartButton bean={bean} />}
        grindControl={<GrindPicker />}
      />
      <Tabs defaultValue="brew">
        <Tabs.List aria-label="Про каву">
          <Tabs.Tab value="brew">Заварювання</Tabs.Tab>
          <Tabs.Tab value="reviews">Відгуки ({beanReviews.length})</Tabs.Tab>
          <Tabs.Tab value="related">Схожі товари</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="brew">
          <BrewGuide methods={brewMethods} />
        </Tabs.Panel>
        <Tabs.Panel value="reviews">
          <ReviewList reviews={beanReviews} />
        </Tabs.Panel>
        <Tabs.Panel value="related">
          <RelatedProducts
            products={related}
            renderFavorite={(product) => (
              <FavoriteButton productId={product.id} name={product.name} />
            )}
          />
        </Tabs.Panel>
      </Tabs>
    </>
  )
}
