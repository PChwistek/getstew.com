import { useEffect, useState } from 'react'
import getServerHostname from '../../utils/getServerHostname'
import { Card, CardBody, CardFooter, CardHeader, CardImg, CardTitle, Button } from 'shards-react'
import axios from 'axios'

export const RecipeList = ( { config }) => {

  const [recipes, setRecipes] = useState([])
  const [checkedForRecipes, setCheckedForRecipes] = useState(false)

  useEffect(() => {
    if(!checkedForRecipes) {
      axios.get(`${getServerHostname()}/recipe/byAuthor/`, config)
        .then(response => {
          const { data } = response
          setCheckedForRecipes(true)
          setRecipes(data)
        })
    }
  }, [checkedForRecipes])

  function convertListToString(tags) {
    let result = ''
    for (let index = 0; index < tags.length; index++) {
      const theTag = tags[index]
      if (index === tags.length - 1) {
        result += `${theTag}`
      } else {
        result += `${theTag}, `
      }
    }
    return result
  }

  return (
    <div className='recipe-list'>
      <h3> Your Recipes </h3>
      <div className='recipe-list__body'>
        {
          recipes.map( (recipe, index) => (
            <div key={ index } className='recipe-list__item'>
              <Card style={{ maxWidth: "300px", cursor: 'pointer' }}>
                <CardBody>
                  <CardTitle> { recipe.name } </CardTitle>
                </CardBody>
                <CardFooter> Tags: { convertListToString(recipe.tags)}</CardFooter>
              </Card>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default RecipeList