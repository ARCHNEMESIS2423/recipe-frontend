import { useState,useEffect } from 'react'
import woodBoard from '../assets/WoodenBoard.jpg'
import EditData from './EditData'
import axios from 'axios'

function Recipes({url,getData,data}){

let [edit,isEdit] = useState(false)
let [currentEdit,setCurrentEdit] = useState(null)

  function popupForm(e){
    isEdit(true)
    setCurrentEdit(e)
  }

  async function delete_Recipe(id) {
      const info = await axios.delete(url+"deleterecipe/"+Number(id))
      await getData(info)
  }

  async function edit_Recipe(id,e) {
      const info = await axios.put(url+"deleterecipe/"+Number(id))
      await getData(info)

      e.disabled = true;
  }

useEffect(() => { getData() }, []) 

    return (
      <div className=' p-2 ' >
        {

         data.length==0?

         <div className='w-fit ml-auto mr-auto bg-yellow-500 rounded mt-10 p-4 shadow-lg border-4 border-yellow-300 outline-yellow-500 font-bold font-mono'>
         LOADING ................
         {
         data.status!=200&&<b> {data.status}</b>
         }
         </div>
         
         :

         data.data.map(({id, title, ingredients, cook_time},count)=>(

         <div id="kitchen-wood-board" className='flex flex-row w-[90%] mt-10 p-2 ml-auto mr-auto mt-4 outline-3 outline-yellow-700/50 border-3 border-yellow-900/50 rounded bg-yellow-800' style={{backgroundImage:`url(${woodBoard})`}}> 

              <div id="item-description" className={`backdrop-blur filter w-[90%] min-h-10 mt-2 rounded ml-auto mr-auto`} key={id}>

                    <h3 className='bg-black/90 p-1 rounded-tl rounded-tr text-yellow-500 flex flex-row  justify-center'>

                    <p className=' text-center font-bold flex-1'>{title}</p> 
                    <b>⌚{cook_time} mins</b>

                    </h3>

                    <ol className='list'>
                      {ingredients.split(',').map((e,index)=>
                      <li className='p-1 hover:text-white font-["Open_Sans"] pl-3 flex flex-row justify-between' key={id +'|'+ index}>
                        🛞  {e}
                      </li>)}
                    </ol>

                    <div id="options" className='flex flex-row m-1 gap-1 bg-white w-full rounded-bl rounded-br mt-10 text-[150%] text-center hover:bg-white/80 transition duration-[0.3s] active:bg-white/50 cursor-pointer p-3'>

                        <button className='w-full bg-[hsl(100,90%,50%)] p-[0.2px] rounded font-semi-bold hover:bg-[hsl(100,90%,40%)] active:bg-[hsl(100,90%,40%)] cursor-pointer' onClick={()=>popupForm(id)}>
                          EDIT ✂️
                        </button>
                    
                        <button className='w-full bg-[hsl(0,92%,50%)] p-[0.2px] rounded font-semi-bold hover:bg-[hsl(0,92%,40%)] active:bg-[hsl(0,92%,40%)] cursor-pointer' onClick={(e)=>delete_Recipe(id,e)}>
                        DELETE 🗑️
                        </button>

                    </div> 
              </div>
              {
                currentEdit===id &&
              <EditData 
              isCalled={edit}
              recall={isEdit} 
              formVals={{
                id:id, 
                title:title, ingredients:ingredients, cook_time:cook_time}} 
              formid={id}
              recallData={getData}
              network={url}
              />
              }
         </div>
         ))
        }

      </div>
    )
 }
 


export default Recipes