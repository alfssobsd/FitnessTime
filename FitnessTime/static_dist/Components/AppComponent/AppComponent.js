import Header from "../../Containers/HeaderContainer/HeaderContainer";
import Modal from "react-modal";
import NotFoundPage from "../../Containers/NotFound404Container/NotFound404Container";

function App ({isPageExist, ChildNode, checkIsPageExist, routeName, parentRoute, isDataFetching, routeParams} = this.props) {
  Modal.setAppElement("body");

  const page = (isPageExist) ?  ChildNode : <NotFoundPage checkIsPageExist={checkIsPageExist} routeParams={routeParams}/>;

  return (
    <div className="app">
      <Header routeName={routeName} parentRoute={parentRoute}/>
      { page }
      <Modal isOpen={isDataFetching} overlayClassName="modal__overlay modal__overlay_app" className="modal__app" />
    </div>
  );
}

export default App;
