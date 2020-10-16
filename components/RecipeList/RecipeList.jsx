import { useEffect, useState } from 'react'
import getServerHostname from '../../utils/getServerHostname'
import { useRouter } from 'next/router'
import { Card, CardBody, CardFooter, CardTitle } from 'shards-react'
import axios from 'axios'

export const RecipeList = ( { config }) => {

  const [recipes, setRecipes] = useState([])
  const [checkedForRecipes, setCheckedForRecipes] = useState(false)
  const router = useRouter()

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
    if (tags.length === 0) return 'none'
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

  function getWindows(config) {
    const length = config.length
    if (length === 1) {
      return '1 window'
    }
    return `${length} windows`
  }

  function getLinks(config) {
    let total = 0
    for (let index = 0; index < config.length; index++) {
      const window = config[index]
      for (let tabIndex = 0; tabIndex < window.tabs.length; tabIndex++) {
        total += 1
      }
    }
    if (total === 1) {
      return '1 tabs'
    }
    return `${total} tabs`
  }

  function goToDetail(recipe) {
    router.push(`/recipe/${recipe._id}`)
  }

  return (
    <div className='recipe-list'>
      <h3> Your Recipes </h3>
      <div className='recipe-list__body'>
        {
          recipes.map( (recipe, index) => (
            <div key={ index } className='recipe-list__item'>
              <Card style={{ cursor: 'pointer' }} onClick={ () => goToDetail(recipe)}>
                <CardBody>
                  <CardTitle> { recipe.name } </CardTitle>
                  <p>{getWindows(recipe.config)}, {getLinks(recipe.config)}</p>
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