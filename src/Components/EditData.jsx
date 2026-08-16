
import axios from 'axios'
import WoodenBoard from '../assets/WoodenBoard.webp'
import { useEffect, useState } from 'react'
function EditData({isCalled,formVals,recall,recallData,network}){

    const [updates,setUpdates] = useState([])
    
    async function patchData(e){
        e.preventDefault()
        recall(!isCalled)
        console.log(e.target)

        const formdata = new FormData(e.target)

        const info = await axios.post(network+'editRecipe/'+formVals.id,{
           title:formdata.get('title'),
           ingredients:formdata.get('ingredients'),
           cook_time:formdata.get('cook_time')
        })

        await recallData(info)
    }



    return(
        isCalled &&
        <div className='bg-yellow-900/50 absolute p-2 z-10 w-[3/4] h-fit outline-9 border-5 border-yellow-900' style={{backgroundImage:`url(${WoodenBoard})`}}>
           <div className='backdrop-blur filter p-3'>

            <p className='bg-black/50 text-yellow-500 font-semi-bold p-3 rounded flex flex-row justify-between gap-5'>REPLANNING THE DISH 
            <b onClick={()=>recall(!isCalled)} className='cursor-pointer'>❌</b>
            </p>

            <form onSubmit={(e)=>patchData(e)}>
                <div className='flex flex-col'>
                    <label className='text-yellow-300 text-semi-bold'>Dish Title</label>
                    <input name='title' defaultValue={formVals.title} className='bg-yellow-800 p-2 rounded'/>
                </div>

                <div className='flex flex-col'>
                    <label className='text-yellow-300 text-semi-bold'>igredients <small>(,)</small></label>
                    <textarea name='ingredients' defaultValue={formVals.ingredients} className='bg-yellow-800 p-2 rounded h-30'/>
                </div>

                <div className='flex flex-col'>
                    <label className='text-yellow-300 text-semi-bold'>Cooking Time</label>
                    <input name='cook_time' type='number' defaultValue={formVals.cook_time} className='bg-yellow-800 p-2 rounded'/>
                </div>

                 <input type="submit" className='bg-[hsl(123,98%,50%)] p-2 w-fit ml-auto mr-auto mt-5 block rounded-lg'/>

            </form>
            </div>
        </div>
        
    )
}

export default EditData
