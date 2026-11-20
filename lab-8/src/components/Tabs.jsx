import { createContext, useState, use } from 'react'

/**
 * Вкладки — складений компонент (compound component): `Tabs` і його частини
 * `Tabs.List`, `Tabs.Tab` і `Tabs.Panel`. Вміст кожної частини приходить між
 * її тегами як `children`, а яка вкладка обрана, частини дізнаються з
 * контексту, який створює `Tabs`.
 *
 * Використання:
 *   <Tabs defaultValue="brew">
 *     <Tabs.List aria-label="Про каву">
 *       <Tabs.Tab value="brew">Заварювання</Tabs.Tab>
 *       <Tabs.Tab value="reviews">Відгуки</Tabs.Tab>
 *     </Tabs.List>
 *     <Tabs.Panel value="brew">…</Tabs.Panel>
 *     <Tabs.Panel value="reviews">…</Tabs.Panel>
 *   </Tabs>
 *
 * Вимоги — у тестах tests/Tabs.children.test.jsx і tests/Tabs.a11y.test.jsx.
 */

const TabsContext = createContext(null)

export default function Tabs({ children, defaultValue }) {
  const [activeValue, setActiveValue] = useState(defaultValue)

  return (
    <TabsContext value={{ activeValue, setActiveValue }}>
      <div className="tabs">{children}</div>
    </TabsContext>
  )
}

function useTabsContext() {
  const context = use(TabsContext)
  if (!context) {
    throw new Error('Використання частини Tabs поза <Tabs>)')
  }
  return context
}

function TabsList({ children, ...props }) {
  return (
    <div role="tablist" className="tab-list" {...props}>
      {children}
    </div>
  )
}

function Tab({ value, children }) {
  const { activeValue, setActiveValue } = useTabsContext()

  const isSelected = activeValue === value

  return (
    <button
      type="button"
      role="tab"
      className={isSelected ? 'active' : undefined}
      onClick={() => setActiveValue(value)}
    >
      {children}
    </button>
  )
}

function TabsPanel({ value, children }) {
  const { activeValue } = useTabsContext()

  return <div hidden={activeValue !== value}>{children}</div>
}

Tabs.List = TabsList
Tabs.Tab = Tab
Tabs.Panel = TabsPanel
