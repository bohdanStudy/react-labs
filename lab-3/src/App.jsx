import { menu } from './data.js'
import Search from './components/SearchBar.jsx'
import MenuTable from './components/MenuTable.jsx'

export default function App() {
  return (
    <main className="app">
      <h1>Меню кав'ярні</h1>

      <Search />

      <MenuTable menu={menu} />
    </main>
  )
}
