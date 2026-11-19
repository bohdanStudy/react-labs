import { useState } from 'react'
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
  const [count, setCount] = useState(step)

  const visibleItems = items.slice(0, count)
  const hiddenCount = items.length - visibleItems.length
  const isAllShown = hiddenCount === 0
  const shown = Math.min(step, hiddenCount)

  return (
    <>
      {children(visibleItems)}
      {items.length > step && (
        <button
          type="button"
          className="show-more"
          onClick={() => (isAllShown ? setCount(step) : setCount(count + step))}
        >
          {isAllShown ? 'Згорнути' : `Показати ще ${shown}`}
        </button>
      )}
    </>
  )
}
