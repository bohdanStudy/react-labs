import { useShowMore } from '../hooks/useShowMore'
/**
 * Показує перші `step` елементів з `items` і кнопку, що показує наступні.
 *
 * Використання:
 *   <ShowMore items={reviews} step={3}>
 *     {(visibleItems) => <ul>…</ul>}
 *   </ShowMore>
 *
 * Вимоги — у тестах tests/ShowMore.test.jsx.
 */
export default function ShowMore({ items, step, children }) {
  const { visibleItems, hiddenCount, showMore, collapse } = useShowMore(
    items,
    step,
  )
  const isAllShown = hiddenCount === 0
  const shown = Math.min(step, hiddenCount)

  return (
    <>
      {children(visibleItems)}
      {items.length > step && (
        <button
          type="button"
          className="show-more"
          onClick={() => (isAllShown ? collapse() : showMore())}
        >
          {isAllShown ? 'Згорнути' : `Показати ще ${shown}`}
        </button>
      )}
    </>
  )
}
