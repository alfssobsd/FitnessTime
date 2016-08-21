"use strict";

import FormComponent from "../../Components/FormComponent/FormComponent";

class Form extends React.Component {
  constructor() {
    super();
    this.createSession = this.createSession.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {title: ""};
  }

  componentWillMount() {
    //TODO Делать запрос для редактирования формы
    if (this.props.params.id) {
      console.log("Делаю запрос");
    }
  }

  handleInputChange(event) {
    this.setState({ title: event.target.value });
  }

  getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  createSession(e) {
    e.preventDefault();
    const csrfToken = this.getCookie("csrftoken");
    const sessionTitle = document.querySelector(".form__session-title").value;

    fetch("/api/v1/workout/training/", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
      body: JSON.stringify({ title: sessionTitle })
    })
    .then(data => data.json())
    .then(data => console.log(data));
  }

  render() {
    return (
      <FormComponent
        formType={this.props.routeParams.form}
        saveForm={this.createSession}
        handleInputChange={this.handleInputChange}
        inputValue={this.state.title}
      />
    );
  }
}

export default Form;
