const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.search-btn');
const recipeSection = document.querySelector('.recipe-section');
const favouritesIcon = document.querySelector('.fa fa-heart favorite');

//Helps in getting a recipe
const searchRecipes = async (query) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const fetchData = await data.json();
    recipeSection.innerHTML = '';
    // Check if `meals` exists
    if (fetchData.meals) {
      fetchData.meals.forEach((meal) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe-card');
        recipeDiv.innerHTML = `
          <i class="fa fa-heart favorite"></i>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <p>${meal.strArea}</p>
            <h3>${meal.strMeal}</h3>
            <a href="${meal.strYoutube}" target="_blank">View Recipe</a>
          `;
        recipeSection.appendChild(recipeDiv);
      });
    } else {
      recipeSection.innerHTML = `<p>No recipes found for "${query}". Please try a different search.</p>`;
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipeSection.innerHTML = `<p>There was an error fetching the recipes. Please try again later.</p>`;
  }
};

//Helps in feachting the recipe for featured
const featuredRecipes = async () => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    const fetchData = await data.json();

    if (fetchData.meals) {
      const randomRecipe = getFeaturedRecipes(fetchData.meals, 8);
      displayFeatured(randomRecipe);
    } else {
      console.log("Recipe not found at the moments")
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);

  }
};


// Helper function to get random recipes
const getFeaturedRecipes = (meals, count) => {
  const shuffled = [...meals].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};


// Helps in rendering HTML DOM Elements


// Helps in display Featured Recipes
const displayFeatured = (featured) => {
  recipeSection.innerHTML = '';
  featured.forEach((meal) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe-card');
    recipeDiv.innerHTML = `
    <i class="fa fa-heart favorite"></i>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <p>${meal.strArea}</p>
      <h3>${meal.strMeal}</h3>
      <a href="${meal.strSource || meal.strYoutube}" target="_blank">View Recipe</a>
    `;
    recipeSection.appendChild(recipeDiv);
  });
}
// Helps in display Favourites Recipe
const displayFavouritesRecipe = (favourites) => {
  recipeSection.innerHTML = '';

  if (favourites.length === 0) {
    favoritesSection.innerHTML = `<p>No favorites yet! Add some recipes to your favorites list.</p>`;
    return;
  }

  favourites.forEach((meal) => {
    const favouritesDiv = document.createElement('div');
    favouritesDiv.classList.add('recipe-card');
    favouritesDiv.innerHTML = `
     
      <i class="fa-solid fa-trash-can"></i>             
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <p>${meal.strArea}</p>
      <h3>${meal.strMeal}</h3>
      <a href="${meal.strSource || meal.strYoutube}" target="_blank">View Recipe</a>         
    `;
    recipeSection.appendChild(favouritesDiv);
  });
}

// Helps to add on Favourites
const addFavourites = () =>{

}

//Action in Search button clicked
searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const searchInput = searchBox.value.trim();
  searchRecipes(searchInput);
});

// Action in Favourites icon clicked
favouritesIcon.addEventListener('click', (event) => {
  
});

// Load featured Recipes automatically in windows
window.addEventListener('load', featuredRecipes);

