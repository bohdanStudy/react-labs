import { useReducer } from 'react'
import { loadOrders } from '../data/orders'
import { createInitialState, queueReducer } from './queueReducer'
import { createHistory, withUndo } from './withUndo'
import { QueueContext, QueueDispatchContext } from './queueContext'
/**
 * §4.5. Провайдер черги: компонент, який зберігає стан черги в useReducer
 * з withUndo(queueReducer), як зараз App, і передає його через
 * QueueContext і QueueDispatchContext компонентам, отриманим як children.
 *
 * Поки що кидає помилку. Вимоги — у тестах tests/QueueProvider.test.jsx.
 */
const undoableQueue = withUndo(queueReducer)

export default function QueueProvider({ children }) {
  const [history, dispatch] = useReducer(undoableQueue, null, () =>
    createHistory(createInitialState(loadOrders())),
  )
  const queue = history.present
  const canUndo = history.past.length > 0
  const canRedo = history.future.length > 0
  const value = { queue, canUndo, canRedo }

  return (
    <>
      <QueueContext value={value}>
        <QueueDispatchContext value={dispatch}>{children}</QueueDispatchContext>
      </QueueContext>
    </>
  )
}
