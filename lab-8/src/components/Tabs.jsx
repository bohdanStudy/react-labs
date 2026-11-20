import { createContext, useState, use, useId } from 'react'

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
  const baseId = useId()

  return (
    <TabsContext value={{ activeValue, setActiveValue, baseId }}>
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
    <div
      role="tablist"
      className="tab-list"
      {...props}
      onKeyDown={(e) => {
        const tabs = Array.from(
          e.currentTarget.querySelectorAll('[role="tab"]'),
        )
        const currentIndex = tabs.indexOf(e.target)
        if (currentIndex === -1) return
        let nextIndex = currentIndex

        if (e.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % tabs.length
          e.preventDefault()
        } else if (e.key === 'ArrowLeft') {
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
          e.preventDefault()
        } else if (e.key === 'Home') {
          nextIndex = 0
          e.preventDefault()
        } else if (e.key === 'End') {
          nextIndex = tabs.length - 1
          e.preventDefault()
        }

        if (nextIndex !== currentIndex) {
          tabs[nextIndex].focus()
          tabs[nextIndex].click()
        }
      }}
    >
      {children}
    </div>
  )
}

function Tab({ value, children }) {
  const { activeValue, setActiveValue, baseId } = useTabsContext()

  const isSelected = activeValue === value
  const tabId = baseId + '-' + value
  const panelId = baseId + '-' + value + '-panel'

  return (
    <button
      type="button"
      role="tab"
      id={tabId}
      aria-controls={panelId}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => setActiveValue(value)}
    >
      {children}
    </button>
  )
}

function TabsPanel({ value, children }) {
  const { activeValue, baseId } = useTabsContext()
  const tabId = baseId + '-' + value
  const panelId = baseId + '-' + value + '-panel'

  return (
    <div
      hidden={activeValue !== value}
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={0}
    >
      {children}
    </div>
  )
}

Tabs.List = TabsList
Tabs.Tab = Tab
Tabs.Panel = TabsPanel
