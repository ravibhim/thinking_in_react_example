import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <h1>Notes</h1>
    <ol>
      <li>
        Start with a Mock - Imagine you have a JSON API and a mock from the
        designer.
      </li>
      <li>
        Break the UI into a component hierarchy. Components that appear within
        another component in the mock should appear as a child in the hierarchy.
      </li>
      <li>
        Build a static version in React. i.e no Interactivity
        <ol>
          <li>
            Pass data using props only. Dont introduce state at all. State is
            only for Interactivity.
          </li>
          <li>
            The components will only have a render() since this is a static
            version of the app
          </li>
          <li>
            Top most component will take data model as a prop. At this point we
            only have a "one-way data flow"
          </li>
        </ol>
      </li>
      <li>
        Identify the minimal (but complete) representation of UI state
        <ol>
          <li> Think of all pieces of data in the application.</li>
          <li>
            Ask 3 questions for each piece of data
            <ol>
              <li>
                Is it passed from the parent via props? If so, it probably is
                not state.
              </li>
              <li>
                Does it remain unchanged over time? If so, it probably isn't
                state
              </li>
              <li>
                Can you compute it based on any state or props in your
                component? If so, it isn't state
              </li>
            </ol>
          </li>
        </ol>
      </li>
      <li>
        Identify where your State should live. For each piece of state in the
        app
        <ol>
          <li>Identify every component that renders something on that state</li>
          <li>
            Find a common owner (a single component above all the components
            that need the state in the hierarchy)
          </li>
          <li>
            Either the common owner or another component higher up in hierachy
            should own the state
          </li>
          <li>
            If you can’t find a component where is makes sense to own the state,
            create a new component solely for holding the state and add it
            somewhere in the hierarchy above the common owner component.
          </li>
        </ol>
      </li>
      <li>
        Add Inverse Data Flow - Pass callbacks to child components via props.
        The callbacks will call setState in the component that owns that state.
        So, achieve "one way data flow" first purely with props and then achive
        "two way data flow" with state and callbacks to update the state.
      </li>
    </ol>
    <App />
  </StrictMode>
);
