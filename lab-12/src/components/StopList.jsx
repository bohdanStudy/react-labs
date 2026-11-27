import StopListPanel from './StopListPanel.jsx'
import { useStopList } from '../model/stopListContext.js'

export default function StopList() {
  const { stopped, toggle } = useStopList()

  return <StopListPanel onToggle={toggle} stopped={stopped} />
}
