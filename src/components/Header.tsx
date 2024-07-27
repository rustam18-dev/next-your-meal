export default function Header() {
  return (
    <header className="header">
      <div className="container header__container">

        <svg className="header__logo" viewBox="0 0 199 44" role="img" aria-label="Логотип YourMeal">
          <use href="../../public/img/sprite.svg#logo"/>
        </svg>

        <div className="header__title-container">
          <h1 className="header__title">
            <span className="header__title-text">Только самые</span>
            <span className="header__title-text header__title-text_red">сочные бургеры!</span>
          </h1>
          <p className="header__appeal">Бесплатная доставка от 599₽</p>
        </div>

      </div>
    </header>
  );
}
