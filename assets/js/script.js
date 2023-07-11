let searchInput=document.querySelector('.search-input');
let searchBtnEl=document.querySelector('#search-btn');
let resultsArea=document.querySelector('.results-area');
let recipeDetails=document.querySelector('.recipe-details');

searchBtnEl.addEventListener('click',getRecipes);
resultsArea.addEventListener('click',getRDetails);
recipeDetails.addEventListener('click',closeRDetails);

function getRecipes(){
    let searchTerm=searchInput.value.trim();
    let apiURL=`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchTerm}`;

    fetch(apiURL)
    .then((res)=>{
        if(res.ok){
            return res.json();
        } 
    })
    .then((data)=>{
        displayRecipes(data);
    })
    // .catch(error => alert(error.message));
}

function displayRecipes(recipes){
    resultsArea.innerHTML="";
    if(recipes.meals==null){
        resultsArea.innerHTML="No Data";
    }else{
        recipes.meals.forEach((recipe) => {
            resultsArea.innerHTML+=`
            <div class="card">
                    <div class="card-img">
                        <img src="${recipe.strMealThumb}" alt="">
                    </div>
                    <div class="card-info">
                        <h2>${recipe.strMeal}</h2>
                        <a href="#" class="recipe-btn" data-id=${recipe.idMeal}>Get Recipe</a>
                    </div>
            </div>`;
        })
    }
    
}

function getRDetails(e) {
    if (e.target.classList.contains('recipe-btn')) {
        let id = e.target.getAttribute('data-id');
        let Url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(Url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                displayRDetails(data);
            })
    }

}
function displayRDetails(details){
    let item=details.meals[0];
    recipeDetails.classList.remove('showDetails');
    recipeDetails.innerHTML="";
    recipeDetails.innerHTML=`
            <i class="fas fa-times"></i>
            <h2>${item.strMeal}</h2>
            <p>Instructions: </p>
            <p>${item.strInstructions}</p>
            <a href="${item.strYoutube}">Watch video</a>

    `;
    

}
function closeRDetails(e){
    if(e.target.classList.contains('fa-times')){
        e.target.parentElement.classList.add('showDetails');
    }
}