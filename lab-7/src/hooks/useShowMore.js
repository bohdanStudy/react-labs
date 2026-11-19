import { useState } from 'react'
/**
 * Логіка «Показати ще» без розмітки.
 *
 * Використання:
 *   const { visibleItems, hiddenCount, showMore, collapse } = useShowMore(items, 4)
 *
 * Вимоги — у тестах tests/useShowMore.test.jsx.
 */
export function useShowMore(items, step) {
  const [count, setCount] = useState(step)

  const visibleItems = items.slice(0, count)
  const hiddenCount = items.length - visibleItems.length

  const showMore = () =>
    setCount((prevCount) => Math.min(prevCount + step, items.length))
  const collapse = () => setCount(step)

  return { visibleItems, hiddenCount, showMore, collapse }
}
