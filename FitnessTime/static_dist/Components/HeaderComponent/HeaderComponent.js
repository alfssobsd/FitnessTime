import { Link } from "react-router";
import classNames from "classnames";

const propTypes = {
  goBack: React.PropTypes.func.isRequired,
  checkRoute: React.PropTypes.func.isRequired,
  toggleNav: React.PropTypes.func.isRequired,
  isNavShown: React.PropTypes.bool.isRequired,
  routePath: React.PropTypes.string
};

function Header (props) {
  const links = [
    {route: "/app", name: "Главная страница"},
    {route: "/app/form/training", name: "Создать тренировку "}
  ];
  const leftAction = (!props.parentRoute)
    ? <div className="header__action header__action_nav" onClick={props.toggleNav} />
    : <div className="header__action header__action_prev-page" onClick={props.goBack} />;

  function renderLink (link, i) {
    return (
      <li key={i} className="header__list-item">
        <Link to={link.route} className={props.checkRoute(link.route, true) ? "header__nav-link_disabled" : "header__nav-link"}> {link.name} </Link>
      </li>
    );
  }

  return (
    <div className="header">
      { leftAction }
      <div className="header__page-name">{props.routeName}</div>
      <div className="header__action header__action_menu" />
      <div className={classNames("header__nav", { header__nav_open: props.isNavShown })}>
        <ul className="header__list">
          { links.map(renderLink) }
          <li className="header__list-item">
            <a href="/logout/" className="header__nav-link">Logout</a>
          </li>
        </ul>
      </div>
      <span className={classNames("header__mask", { header__mask_open: props.isNavShown })} />
    </div>
  );
}

Header.propTypes = propTypes;

export default Header;
