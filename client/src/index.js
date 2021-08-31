import React from "react";
import reactDOM from "react-dom";
import 'semantic-ui-css/semantic.min.css'
import './style.css';
import App from "./components/App";
import { AuthModule } from "./hooks/useAuth";
import { RecipeModule } from "./hooks/useRecipes";

reactDOM.render(
  <AuthModule>
    <RecipeModule>
      <App />
    </RecipeModule>
  </AuthModule>, document.querySelector('#root'));