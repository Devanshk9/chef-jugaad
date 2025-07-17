import React from 'react'
import Recipe from './Recipe'

export default function main(){
    // const ingredients = ["Pizza Base", "Oregano", "Tomatoes"]
    const [ingredients,setingredients]= React.useState([])
    const [recipeShown, setRecipeShown] = React.useState(false)

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function handleSubmit(formData) {
        const newIngredient = formData.get("ingredient")
        setingredients(prevlist => [...prevlist,newIngredient])   
    }
    function getRecipe() {
        setRecipeShown(prevShown => !prevShown)
    }

    return(
    <main>
        <form className="add-form" action={handleSubmit}>
            <input type="text" placeholder="E.g. Bread" aria-label="Add Ingredient" name="ingredient" />
            <button><i class="ri-add-line"></i> Add Ingredient</button>
        </form>
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
        {recipeShown && <Recipe />}
    </main>       
    )
}