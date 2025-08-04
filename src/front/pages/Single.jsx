// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer";

// Componente adaptado para todo tipo de dispositivos usando clases Bootstrap y contenedores fluidos.
export const Single = props => {
  // Access the global state using the custom hook.
  const { store } = useGlobalReducer();
  // Retrieve the 'theId' URL parameter using useParams hook.
  const { theId } = useParams();
  const singleTodo = store.todos.find(todo => todo.id === parseInt(theId));

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center py-5" style={{ minHeight: "100vh", width: "100vw" }}>
      <div className="w-100" style={{ maxWidth: "600px", background: "#fff", borderRadius: "32px", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", padding: "32px 16px", boxSizing: "border-box" }}>
        {/* Display the title of the todo element dynamically retrieved from the store using theId. */}
        <h1 className="display-5 text-center mb-4" style={{ wordBreak: "break-word" }}>
          Todo: {singleTodo?.title}
        </h1>
        <hr className="my-4" />  {/* A horizontal rule for visual separation. */}

        {/* A Link component acts as an anchor tag but is used for client-side routing to prevent page reloads. */}
        <div className="d-flex justify-content-center">
          <Link to="/" style={{ width: "100%", maxWidth: "320px" }}>
            <button className="btn btn-primary btn-lg w-100" type="button">
              Volver al inicio
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Single.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
