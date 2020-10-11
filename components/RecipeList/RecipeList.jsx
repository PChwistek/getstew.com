import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import getServerHostname from '../../utils/getServerHostname'
import axios from 'axios'

const ReactTinyLink = dynamic(
  () => import('react-tiny-link').then(mod => mod.ReactTinyLink),
  { ssr: false }
)

export const RecipeList = ( { config }) => {

  const [recipes, setRecipes] = useState([])
  const [checkedForRecipes, setCheckedForRecipes] = useState(false)

  useEffect(() => {
    if(!checkedForRecipes) {
      axios.get(`${getServerHostname()}/recipe/byAuthor/`, config)
        .then(response => {
          const { data } = response
          console.log('the recipes', data)
          setCheckedForRecipes(true)
          setRecipes(data)
        })
    }
  }, [checkedForRecipes])


  return (
    <div className='recipe-list'>
      <h3> Your Recipes </h3>
      <div className='recipe-list__body'>
        {
          recipes.map( (recipe, index) => (
            <div key={ index } className='recipe-list__item'>
              <ReactTinyLink
                cardSize="large"
                showGraphic={ true }
                header={ recipe.name }
                description={ "Your recipe..." }
                maxLine={ 2 }
                onClick={ () => console.log('clicked recipe', recipe)}
                url={ recipe.config[0].tabs[0].url }
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default RecipeList