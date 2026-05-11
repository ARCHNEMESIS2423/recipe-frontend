import axios from "axios"
import Recipes from "./Recipes"
import { useEffect,useState } from "react"
function AddRecipe({url,reloadData}){
    var [submited,isSubmited] =useState(false)

    async function submitRecipes(e){
        isSubmited(true)
         e.preventDefault()
         const formData = new FormData(e.target)
         
         try{
         const data = await axios.post(url+"saveRecipe",{
            title:formData.get('title'),
            ingredients:formData.get('ingredients'),
            cook_time:Number(formData.get('cooking_time'))
         })
         await reloadData(data)
         e.target.reset()
         e.target.disabled = true
         

         
         setTimeout(()=>isSubmited(false),3000)
          
        }catch(error){

             console.log(error)

         }
    }
    

    return (
        <form onSubmit={(e)=>submitRecipes(e)} className="w-[70%] ml-auto mr-auto bg-white rounded mt-10 flex flex-col">
        {
        submited &&<p className="bg-green-800 p-4 rounded-tl rounded-tr mt-0 transition-all">
         New Recipe is succesfully added ☑️
        </p>
        
        
        }
            <h2 className="self-center font-bold text-blue-800 m-2">ADD NEW FOOD RECIPE</h2>
          <fieldset disabled={submited}>
            <div className="flex flex-col m-2">
            <label className="text-blue-900">Title</label>
            <input name="title" type="text" placeholder="e.g.burger" className="border-2 target:outline-2 border-blue-900 rounded p-1 bg-gray-800/10 outline-yellow-600"/>
            </div>

            <div className="flex flex-col m-2">
            <label className="text-blue-900">Igredients</label>
            <input name="ingredients" type="text" placeholder="e.g.buns,onions,salt,sliced tomatoes, ...etc." className="border-2 target:outline-2 border-blue-900 rounded p-1 bg-gray-800/10 outline-yellow-600"/>
            </div>

            <div className="flex flex-col m-2">
            <label className="text-blue-900">Cooking Time (mins)</label>
            <input name="cooking_time" type="number" placeholder="0 mins " className="border-2 target:outline-2 outline-yellow-600 border-blue-900 rounded p-1 bg-gray-800/10"/>

            <input type="submit" className="bg-gray-600 w-fit block ml-auto mr-auto rounded mt-1 p-2 m-2 cursor-pointer hover:bg-gray-500 font-bold"/>
            </div>
            </fieldset> 
        </form>
    )
}

export default AddRecipe