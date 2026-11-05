// Проп	Що це	За замовчуванням
// person	об’єкт учасника з data.js	—
// size	ширина й висота зображення в пікселях	64
// Компонент рендерить один <img> з className="avatar" і такими атрибутами:

// Атрибут	Значення
// src	person.photo
// alt	person.name
// width, height	size

export default function Avatar({ person, size = 64 }) {
  return (
    <img
      className="avatar"
      src={person.photo}
      alt={person.name}
      width={size}
      height={size}
    />
  )
}
