import { useState } from 'react'

function ProfileCard({ name, group, technologies }) {
  const [clickCount, setClickCount] = useState(0)

  return (
    <article className="profile-card">
      <p className="profile-card__eyebrow">Знайомство</p>
      <h1>Про мене</h1>

      <dl className="profile-card__details">
        <div>
          <dt>Ім’я</dt>
          <dd>{name}</dd>
        </div>
        <div>
          <dt>Група</dt>
          <dd>{group}</dd>
        </div>
      </dl>

      <section className="profile-card__technologies">
        <h2>Технології, які хочу опанувати</h2>
        <ul>
          {technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </section>

      <div className="profile-card__actions">
        <button
          type="button"
          onClick={() => setClickCount((count) => count + 1)}
        >
          Подобається
        </button>
        <p aria-live="polite">Натискань: {clickCount}</p>
      </div>
    </article>
  )
}

export default ProfileCard
