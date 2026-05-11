import heroImage from"./assets/kitchenBackground.jpg"
import Recipes from "./Components/Recipes.jsx"
import Header from "./Components/Header.jsx"
import AddRecipe from "./Components/AddRecipe.jsx"
import { useState,useEffect,useRef } from "react"
import axios from "axios"
function App() {
    const [info,setInfo] = useState([])

    const uRlConnection = useRef("http://127.0.0.1:8000/api/")
   
     async function fetch_data(){
          const response = await axios.get(uRlConnection.current+'recipes')
          await setInfo(response)   
     }

 useEffect(() => { fetch_data() }, [])

  return (
    <div className={`min-h-screen bg-cover bg-fixed bg-center bg-gray-500/90`} style={{ backgroundImage: `url(${heroImage})` }}>
       <Header/>
       <AddRecipe url={uRlConnection.current} reloadData={fetch_data}/>
       <Recipes url={uRlConnection.current} getData={fetch_data} data={info} />
    </div>
  )
}

export default App
