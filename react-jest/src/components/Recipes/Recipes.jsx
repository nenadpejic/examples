import React, { useEffect, useState } from 'react'

const Recipes = () => {
  const [recipes, setRecipes] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    const res = await fetch('/api/recipes')
    const data = await res.json()
    if (res.ok) {
      setRecipes(data.recipes)
    } else {
      setErrorMessage('Failed to fetch recipes')
    }
  }

  return (
    <div>
      <h1>Recipe Finder</h1>
      <form>
        <input type="text" placeholder='Enter an ingredient to find recipes...' />
        <button type='submit'>Find</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Recipes
