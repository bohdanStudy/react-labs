import ProfileCard from './components/ProfileCard.jsx'

function App() {
  const technologies = ['C#', 'Js', 'React']

  return (
    <main className="profile-page">
      <ProfileCard name="Bogdan" group="Kn-312" technologies={technologies} />
    </main>
  )
}

export default App
