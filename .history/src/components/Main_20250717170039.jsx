// import React from 'react'
// import Recipe from './Recipe'
// import {getRecipeFromMistral } from "../../Serverless_backend"

// export default function Main(){
//     // const ingredients = ["Pizza Base", "Oregano", "Tomatoes"]
//     const [ingredients,setingredients]= React.useState([])
//     const [recipeShown, setRecipeShown] = React.useState(false)

//     const ingredientsListItems = ingredients.map(ingredient => (
//         <li key={ingredient}>{ingredient}</li>
//     ))

//     function handleSubmit(formData) {
//         const newIngredient = formData.get("ingredient")
//         setingredients(prevlist => [...prevlist,newIngredient])   
//     }
//     async function getRecipe() {
//        const recipeMarkdown = await getRecipeFromMistral(ingredients)
//        console.log(recipeMarkdown)
//     }

//     return(
//     <main>
//         <form className="add-form" action={handleSubmit}>
//             <input type="text" placeholder="E.g. Bread" aria-label="Add Ingredient" name="ingredient" />
//             <button><i class="ri-add-line"></i> Add Ingredient</button>
//         </form>
//         {ingredients.length > 0 && <section>
//                 <h2 className='ing-h2'>Ingredients on hand:</h2>
//                 <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
//                 <div className="get-recipe-container">
//                     <div>
//                         <h3>Ready for a recipe?</h3>
//                         <p>Generate a recipe from your list of ingredients.</p>
//                     </div>
//                     <button onClick={getRecipe}>Get a Recipe</button>
//                 </div>
//         </section>}
//         {recipeShown && <Recipe />}
//     </main>       
//     )
// }

import React from 'react'
import Recipe from './Recipe'
import { getRecipeFromMistral } from "../../Serverless_backend"

export default function Main() {
  const [ingredients, setIngredients] = React.useState([])
  const [recipe, setRecipe]         = React.useState('')
  const [recipeShown, setRecipeShown] = React.useState(false)

  // render ingredient list
  const ingredientsListItems = ingredients.map((ing, i) => (
    <li key={`${ing}-${i}`}>{ing}</li>
  ))

  // handle the add‑ingredient form
  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newIngredient = formData.get("ingredient")
    if (newIngredient) {
      setIngredients(prev => [...prev, newIngredient])
      e.target.reset()
    }
  }

  // fetch & display the recipe
  async function getRecipe() {
    try {
      const recipeMarkdown = await getRecipeFromMistral(ingredients)
      setRecipe(recipeMarkdown)
      setRecipeShown(true)
    } catch (err) {
      console.error("Error fetching recipe:", err)
    }
  }

  return (
    <main>
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="ingredient"
          placeholder="E.g. Bread"
          aria-label="Add Ingredient"
        />
        <button type="submit">
          <i className="ri-add-line" /> Add Ingredient
        </button>
      </form>

      {ingredients.length > 0 && (
        <section>
          <h2 className='ing-h2'>Ingredients on hand:</h2>
          <ul className="ingredients-list" aria-live="polite">
            {ingredientsListItems}
          </ul>
          <div className="get-recipe-container">
            <div>
              <h3>Ready for a recipe?</h3>
              <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button onClick={getRecipe}>Get a Recipe</button>
          </div>
        </section>
      )}

      {recipeShown && <Recipe markdown={recipe} />}
    </main>
  )
}
