import BrewGuide from '../../features/brew/components/BrewGuide.jsx'
import NotFound from '../NotFound.jsx'
import ProductCard from '../../features/beans/components/ProductCard.jsx'
import RelatedProducts from '../../features/beans/components/RelatedProducts.jsx'
import ReviewList from '../../features/reviews/components/ReviewList.jsx'
import Tabs from '../../components/Tabs.jsx'
import AddToCartButton from '../../features/cart/components/AddToCartButton.jsx'
import FavoriteButton from '../../features/favorites/components/FavoriteButton.jsx'
import { beans } from '../../features/beans/data/beans.js'
import { brewMethods } from '../../features/brew/data/brewMethods.js'
import { reviews } from '../../features/reviews/data/reviews.js'

export default function BeanPage({ beanId }) {
  const bean = beans.find((item) => item.id === beanId)
  if (!bean) return <NotFound />

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
