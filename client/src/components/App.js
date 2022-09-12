import React, { useState, useEffect } from "react"
import RecipeList from "./RecipeList"
import "../css/app.css"
import uuidv4 from "uuid/v4"
import RecipeEdit from "./RecipeEdit"
import axios from "axios"
import RecipeSearchBar from "./RecipeSearchBar"
import filterRecipeList from "../function-library/filterRecipeList"

export const RecipeContext = React.createContext()
// const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const [activeRecipeListName, setActiveRecipeListName] = useState("recipes")
  const [searchedRecipes, setSearchedRecipes] = useState([])
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  )

  var whichRecipe
  if (activeRecipeListName === "recipes") {
    whichRecipe = recipes
  } else {
    whichRecipe = searchedRecipes
  }

  useEffect(() => {
    // const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    // if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))

    // Loading recipes from database
    axios
      .get("/api/recipes")
      .then((recipes) => {
        setRecipes(recipes.data)
      })
      .catch((err) => console.error(err))
  }, [])

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  // }, [recipes])

  const recipeContextValue = {
    recipes,
    handleRecipeAdd,
    handleRecipeSave,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
    searchedRecipes,
    handleRecipeSearch,
    activeRecipeListName,
    whichRecipe,
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  async function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [{ id: uuidv4(), name: "", amount: "" }],
    }

    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
    let result = await axios.post("/api/recipes", newRecipe)
  }

  async function handleRecipeSave(recipe) {
    let result = await axios.put("/api/recipes", recipe)
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex((r) => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  async function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id))
    await axios.delete(`/api/recipes/${id}`)
  }

  //New Search Bar for Filtering Recipe List
  function handleRecipeSearch(searchValue) {
    const filteredRecipes = filterRecipeList(searchValue, [...recipes])
    setSearchedRecipes(filteredRecipes.map((i) => i.item))
    console.log("App searchedRecipes ", searchedRecipes)
    console.log(
      "filtered recipes: ",
      filteredRecipes.map((i) => i.item)
    )
    handleActiveRecipeList(searchValue)
  }

  function handleActiveRecipeList(searchValue) {
    if (searchValue === "") {
      setActiveRecipeListName("recipes")
    } else {
      setActiveRecipeListName("searchedRecipes")
    }
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeSearchBar />
      <RecipeList recipes={whichRecipe} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken 1",
    servings: 3,
    cookTime: "1:45",
    instructions:
      "1. Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Plain Roast Beef 1",
    servings: 5,
    cookTime: "0:45",
    instructions: "1. Put paprika on roast\n2. Put roast in oven\n3. Eat roast",
    ingredients: [
      {
        id: 1,
        name: "Roast Beef",
        amount: "3 Pounds",
      },
      {
        id: 2,
        name: "Paprika",
        amount: "3 Tbs",
      },
    ],
  },
]

export default App
