import React from 'react'
import Recipe from './Recipe'
import {getRecipeFromMistral } from "../../Serverless_backend"
import {displayRecipeCurrent } from "../../Serverless_backend"

export default function Main(){
    // const ingredients = ["Pizza Base", "Oregano", "Tomatoes"]
    const [ingredients,setingredients]= React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [recipeRandom, setRecipeRandom] = React.useState("")

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function handleSubmit(formData) {
        const newIngredient = formData.get("ingredient")
        setingredients(prevlist => [...prevlist,newIngredient])   
    }
    async function getRecipe() {
       const recipeMarkdown = await getRecipeFromMistral(ingredients)
       setRecipe(recipeMarkdown)
       console.log(recipeMarkdown)
    }
    async function getRandom() {
        ingredients = ''
       const recipeMarkdown2 = await displayRecipeCurrent()
       setRecipeRandom(recipeMarkdown2)
       console.log(recipeMarkdown2)
    }
    

    return(
    <main>
        <form className="add-form" action={handleSubmit}>
            <input type="text" placeholder="E.g. Bread or Tomatoes" aria-label="Add Ingredient" name="ingredient" />
            <button><i class="ri-add-line"></i> Add Ingredient</button>
            
        </form>
        <button className='random-recipe-button' onClick={getRandom} >Recipe with Random Ingredients</button>
        {ingredients.length === 0 && recipeRandom && <Recipe recipe = {recipeRandom}/>}
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
        {recipe && <Recipe recipe = {recipe}/>}
    </main>       
    )
}