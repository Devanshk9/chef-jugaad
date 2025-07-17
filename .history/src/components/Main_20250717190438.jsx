import React from 'react'
import Recipe from './Recipe'
import { getRecipeFromMistral } from "../../Serverless_backend"
import { displayRecipeCurrent } from "../../Serverless_backend"
import { SpinnerCircular } from 'spinners-react';

export default function Main() {
    // const ingredients = ["Pizza Base", "Oregano", "Tomatoes"]
    const [ingredients, setingredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [recipeRandom, setRecipeRandom] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))


    function handleSubmit(formData) {
        const raw = formData.get("ingredient");
        const newIngredient = raw ? raw.toString().trim() : "";
        if (newIngredient === "") return
        setingredients(prevlist => [...prevlist, newIngredient]);
    }

//     async function getRecipe() {
//         setLoading(true)
//         setRecipe("")
//          try {
//     const recipeMarkdown = await getRecipeFromMistral(ingredients)
//     setRecipe(recipeMarkdown)
//   } finally {
//     setLoading(false)
//   }
//         console.log(recipeMarkdown)
//     }
async function getRecipe() {
  setLoading(true)
  setRecipe("")
  try {
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    console.log(recipeMarkdown)
    setRecipe(recipeMarkdown)
  } finally {
    setLoading(false)
  }
}

    async function getRandom() {
        setingredientsEmpty()
        setRecipeRandom("")
        const recipeMarkdown2 = await displayRecipeCurrent()
        setRecipeRandom(recipeMarkdown2)
        console.log(recipeMarkdown2)
        setingredientsEmpty()
    }
    function setingredientsEmpty() {
        setingredients([])
        setRecipe("")
    }


    return (

        <main>
            <form className="add-form" action={handleSubmit}>
                <input type="text" placeholder="E.g. Bread or Tomatoes" aria-label="Add Ingredient" name="ingredient" />
                <button ><i class="ri-add-line"></i> Add Ingredient</button>

            </form>
            <button className='random-recipe-button' onClick={getRandom} >Recipe with Random Ingredients</button>
            {ingredients.length === 0 && recipeRandom && <Recipe recipe={recipeRandom} />}
            {ingredients.length > 0 && <section>
                <h2 className='ing-h2'>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
                <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={getRecipe}>Get a Recipe</button>
                </div>
            </section>}
            {ingredients.length > 0 && recipe && <Recipe recipe={recipe} />}
            {loading
    ? <span className="loader" aria-label="Generating"><SpinnerRoundFilled size={50} thickness={100} speed={100} color="rgba(0, 0, 0, 1)" />Loading...</span>
    : null}
        </main>
    )
}