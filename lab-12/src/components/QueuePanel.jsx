import { useState } from 'react'
import HistoryButtons from './HistoryButtons'
import OrderDetails from './OrderDetails'
import OrderBoard from './OrderBoard'
/**
 * §4.6. Частина сторінки з чергою: кнопки історії, «Деталі замовлення» й
 * дошка, усередині <main className="queue">. Зберігає id замовлення,
 * відкритого в «Деталях», і не отримує пропсів.
 *
 * Поки що кидає помилку. Вимоги — у тестах tests/QueuePanel.test.jsx.
 */
export default function QueuePanel() {
  const [openedId, setOpenedId] = useState(null)

  return (
    <main className="queue">
      <HistoryButtons />
      <OrderDetails orderId={openedId} onClose={() => setOpenedId(null)} />
      <OrderBoard onOpen={(order) => setOpenedId(order.id)} />
    </main>
  )
}
