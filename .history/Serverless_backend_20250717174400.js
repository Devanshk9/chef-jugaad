import { InferenceClient } from '@huggingface/inference'


const indiaDateTime = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Kolkata',
});
console.log(indiaDateTime); 

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention try to avoid that too like if they dont mention veggies then try to avoid them too, but try not to include too many extra ingredients and avoid ones that are generally not avaiable and cater all reponses according to india and its food. Also mention prep time and nutritional facts with serve quantity. Also include no emoji at all instead in recipe or last too add useful symbols if you want to. Format your response in markdown to make it easier to render to a web page.
`

const SYSTEM_PROMPT_2 = `
You are an assistant that, based on the current Indian date and time (${indiaDateTime}), recommends a single random tasty Indian recipe appropriate for that time of day (breakfast, mid‑morning snack, lunch, evening snack, or dinner).  

Each recommendation must include:
• Recipe name  
• Prep time  
• Number of servings  
• Basic nutritional facts (total calories, protein, carbs per serving)  
• Ingredients list (use only common, easily available ingredients in India)  
• Step‑by‑step instructions  

Format the response in Markdown (using headings, lists, and useful symbols like ✓ or •) and include no emojis.
`


const hf = new InferenceClient(import.meta.env.VITE_HG_API)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}

export async function displayRecipeCurrent() {
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT_2 },
                { role: "user", content: `` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}

