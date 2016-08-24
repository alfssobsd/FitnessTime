"use strict";

import Button from "../ButtonComponent/ButtonComponent";

const propTypes = {
  formType: React.PropTypes.string.isRequired
};

const formTypes = {
  workout: [
    { label: "Название", name: "title", type: "text", classes: ""},
    { label: "Повторы", name: "repeat", type: "text", classes: "" },
    { label: "Вес", name: "weight", type: "text", classes: "" },
    { label: "Отдых", name: "rest_time", type: "text", classes: "" },
    { label: "Фото", name: "example_photo", type: "file", classes: "form__input_file" }
  ],
  session: [
    { label: "Название трениров", name:"title", type: "text", classes: "form__session-title" }
  ]
};

function Form (props) {
  const formType = props.formType;
  let action;
  if (props.editForm) {
    action = props.editWorkout;
  } else {
    switch (formType) {
      case ("session"): action = props.createSession; break;
      case ("workout"): action = props.createWorkout; break;
    }
  }
  return (
    <form className="form">
      {
        formTypes[formType].map( (data, i) => {
          return <label key={i} className="form__label">
            {data.label}:
            <input
              type={data.type}
              name={data.name}
              onChange={props.handleInputChange}
              className={`form__input ${data.classes}`}
              value={props.inputValue[data.name] || ""}
            />
          </label>;
        })
      }
      <div className="form__controls">
        <Button name="Save" action={action}/>
        <Button name="Cancel" action={props.cancelCreate} classes="button_cancel"/>
      </div>
    </form>
  );
}

Form.propTypes = propTypes;

export default Form;
