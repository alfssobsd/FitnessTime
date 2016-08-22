"use strict";

import { Link } from "react-router";
import WorkoutItem from "../../Containers/WorkoutItemContainer/WorkoutItemContainer";

const propTypes = {
  workoutData: React.PropTypes.array.isRequired
};

function Workout (props) {
  return (
    <div className="workout">
      {
        props.workoutData.map( data => {
          return <WorkoutItem
            key={data.uuid}
            workoutItemData={data}
          />;
        })
      }
      <Link to={`/form/workout/${props.sessionId}`} className="button button_add">
        Новое упражнение
      </Link>
    </div>
  );
}

Workout.propTypes = propTypes;

export default Workout;
