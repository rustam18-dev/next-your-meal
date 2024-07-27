import catalogs from "../../public/catalogs.json";


export default function Catalog() {
  return (
    <nav className="navigation">
      <div className="container navigation__container">
        <ul className="navigation__list">
          {catalogs.map(catalog => (
            <li className="navigation__item" key={catalog.id}>
              <button className={`navigation__button ${catalog.path} ${catalog.id === 1 ? 'navigation__button_active' :  ''}`}>{catalog.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}