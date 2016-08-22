"use strict";

import FormComponent from "../../Components/FormComponent/FormComponent";
import Token from "../../getCSRFToken";
import { withRouter } from "react-router";

class Form extends React.Component {
  constructor() {
    super();
    this.createSession = this.createSession.bind(this);
    this.createWorkout = this.createWorkout.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.cancelCreate = this.cancelCreate.bind(this);
    this.state = {};
  }

  componentWillMount() {
    console.log(this.props);
    //TODO Делать запрос для редактирования формы
    if (this.props.params.id) {
      console.log("Делаю запрос");
    }
  }

  handleInputChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

  createSession(e) {
    e.preventDefault();
    const sessionUrl = "/api/v1/workout/training/";

    fetch(sessionUrl, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Token
      },
      body: JSON.stringify({ "title" : this.state.title })
    })
    .then(data => {
      if (data.status === 201) {
        this.props.router.push("/");
      }
    });
  }

  createWorkout(e) {
    e.preventDefault();
    const sessionUrl = "/api/v1/workout/exercise/";
    const formData = new FormData(document.querySelector(".form"));
    formData.append("training", this.props.params.id);

    fetch(sessionUrl, {
      credentials: "include",
      method: "POST",
      headers: {
        "Accept": "application/json, application/xml, text/plain, text/html",
        "X-CSRFToken": Token
      },
      body: formData
    })
    .then(data => data.json())
    .then(data => console.log(data));
  }

  cancelCreate(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <FormComponent
        formType={this.props.routeParams.form}
        createSession={this.createSession}
        createWorkout={this.createWorkout}
        handleInputChange={this.handleInputChange}
        inputValue={this.state}
        cancelCreate={this.cancelCreate}
      />
    );
  }
}

export default withRouter(Form);
