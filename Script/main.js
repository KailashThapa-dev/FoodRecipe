// Fetch elements from the DOM
const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.search-btn');
const recipeSection = document.querySelector('.recipe-section');
const recipeDetails = document.querySelector('.recipe-details');
const closePopup = document.querySelector('.close');

// Fetch recipes based on search query
const searchRecipes = async (query) => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const fetchData = await data.json();
    if (fetchData.meals) {
      displayRecipes(fetchData.meals);
    } else {
      recipeSection.innerHTML = `<h2>No recipes found for "${query}". Please try a different search.</h2>`;
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipeSection.innerHTML = `<p>There was an error fetching the recipes. Please try again later.</p>`;
  }
};

// Fetch featured recipes
const featuredRecipes = async () => {
  try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    const fetchData = await data.json();
    if (fetchData.meals) {
      const randomRecipe = getFeaturedRecipes(fetchData.meals, 8);
      displayRecipes(randomRecipe);
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};

// Helper function to get random featured recipes
const getFeaturedRecipes = (meals, count) => {
  const shuffled = [...meals].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Display the recipes on the page

const displayRecipes = (featured) => {
  recipeSection.innerHTML = '';
  featured.forEach((meal) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe-card');
    recipeDiv.innerHTML = `
      <i class="fa fa-heart favorite" onclick="addToFavorites(${JSON.stringify(meal)})"></i>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <p>${meal.strArea}</p>
      <h3>${meal.strMeal}</h3>
    `;
    const viewRecipebtn = document.createElement('button');
    viewRecipebtn.textContent = 'View Recipe';
    viewRecipebtn.addEventListener('click', () => {
      recipePopup(meal);
    });
    recipeDiv.appendChild(viewRecipebtn);
    recipeSection.appendChild(recipeDiv);
  });
};

// Display a popup for viewing the full recipe
const recipePopup = (meal) => {
  const detailsDiv = document.createElement('div');
  detailsDiv.classList.add('details');
  detailsDiv.innerHTML = `
    <div class="popup-content">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="popup-image" />
      <div class="popup-text">
        <h2 class="recipeMeal">${meal.strMeal}</h2>
        <h3>Ingredients:</h3> 
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
      </div>
    </div>
    <div class="recipeInstruction">
      <h3>Recipe:</h3>
      <p>${meal.strInstructions}</p>
    </div>
  `;
  recipeDetails.appendChild(detailsDiv);
  recipeDetails.style.display = "block";
};

// Function to fetch ingredients for the recipe
const fetchIngredients = (meal) => {
  let ingredientList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measurement = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredientList += `<li>${ingredient} - ${measurement}</li>`;
    } else {
      break;
    }
  }
  return ingredientList;
};

// Close the recipe popup
closePopup.addEventListener('click', () => {
  recipeDetails.style.display = "none";
  recipeDetails.querySelector('.details').remove();
});

// Search button click event
searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const searchInput = searchBox.value.trim();
  if (searchInput) {
    searchRecipes(searchInput);
  } else {
    searchBox.setAttribute("placeholder", "Please type a recipe or ingredient!");
  }
});

// Display favorites from localStorage
const displayFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  recipeSection.innerHTML = '';
  if (favorites.length === 0) {
    recipeSection.innerHTML = `<p>No favorites yet! Add some recipes to your favorites list.</p>`;
    return;
  }
  favorites.forEach((meal) => {
    const favoritesDiv = document.createElement('div');
    favoritesDiv.classList.add('recipe-card');
    favoritesDiv.innerHTML = `
      <i class="fa-solid fa-trash-can" onclick="removeFromFavorites('${meal.idMeal}')"></i>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <p>${meal.strArea}</p>
      <h3>${meal.strMeal}</h3>
      <a href="${meal.strSource || meal.strYoutube}" target="_blank">View Recipe</a>
    `;
    recipeSection.appendChild(favoritesDiv);
  });
};

// Function to add a recipe to favorites
const addToFavorites = (meal) => {
  console.log("Adding to favorites:", meal);  // Debugging line

  // Get current favorites from localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  // Check if the recipe is already in favorites
  if (!favorites.some(fav => fav.idMeal === meal.idMeal)) {
    favorites.push(meal);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert("Recipe added to favorites!");
    displayFavorites();  // Refresh favorites display
  } else {
    alert("This recipe is already in your favorites!");
  }
};


// Function to remove a recipe from favorites
const removeFromFavorites = (idMeal) => {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(meal => meal.idMeal !== idMeal);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  displayFavorites();
};

// Load featured recipes and favorites on page load
window.addEventListener('load', () => {
  featuredRecipes();
  displayFavorites();
});
