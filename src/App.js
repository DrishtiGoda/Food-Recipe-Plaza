import "./App.css";
import React, { useState } from "react";
import Axios from "axios";
import "./index.css";
import RecipeTile from "./RecipeTile";

function App() {
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);
  const [healthLabel, sethealthLabel] = useState("vegan");

  const YOUR_APP_ID = "1dcb28c6";
  const YOUR_APP_KEY = "e17e814b17958198ce6ebab8be1f7e51";
  var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}`;

  async function getRecipes() {
    // we are using await beacause - the process of getting the data through this API is going to take some time
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };

  return (
    <div className="app">
      <h1>Food Recipe Plaza 🍔</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
          className="app__input"
          type="text"
          placeholder="Enter ingredient"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <input type="submit" className="app__submit" value="Search" />
        <select className="app__healthLables">
          <option onClick={() => sethealthLabel("vegan")}>Vegan</option>
          <option onClick={() => sethealthLabel("vegetarian")}>Vegetarian</option>
          <option onClick={() => sethealthLabel("paleo")}>Paleo</option>
        </select>
      </form>

      <div className="app__recipes">
        {recipes.map((recipe) => {
          return <RecipeTile recipe={recipe} key={recipe.id} />;
        })}
      </div>
    </div>
  );
}

export default App;
