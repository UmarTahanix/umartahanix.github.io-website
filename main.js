const homeBtn = document.getElementById("home");
const localBtn = document.getElementById("local");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const techBtn = document.getElementById("tech");
const searchBtn = document.getElementById("search");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsDetails = document.getElementById("newsDetails");

const API_KEY = "0b051dc0e3f443209c71850cbeb68f0e";
const LOCAL_NEWS = "https://newsapi.org/v2/top-headlines?country=eg&apiKey=0b051dc0e3f443209c71850cbeb68f0e";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0b051dc0e3f443209c71850cbeb68f0e";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=fr&category=sports&apiKey=0b051dc0e3f443209c71850cbeb68f0e";
const TECH_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=0b051dc0e3f443209c71850cbeb68f0e";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

var newsDataArr = [];

homeBtn.addEventListener("click", function(){
    document.getElementById("top").setAttribute("style", "background-color: rgb(36, 36, 36);");
    document.getElementById("bottom").setAttribute("style", "background-color: rgb(36, 36, 36);");
    newsDataArr = [];
    newsType.innerHTML = "<h2>Welcome to NEWS Website!</h2>";
    newsDetails.innerHTML = '';
});

localBtn.addEventListener("click", function(){
    document.getElementById("top").setAttribute("style", "background-color: rgb(255, 46, 46);");
    document.getElementById("bottom").setAttribute("style", "background-color: rgb(255, 46, 46);");
    newsType.innerHTML = "<h2>Local</h2>";
    fetchLocalNews();
});

businessBtn.addEventListener("click", function(){
    document.getElementById("top").setAttribute("style", "background-color: rgb(26, 60, 164);");
    document.getElementById("bottom").setAttribute("style", "background-color: rgb(26, 60, 164);");
    newsType.innerHTML = "<h2>Business</h2>";
    fetchBusinessNews();
});

sportsBtn.addEventListener("click", function(){
    document.getElementById("top").setAttribute("style", "background-color:rgb(24, 157, 44);");
    document.getElementById("bottom").setAttribute("style", "background-color: rgb(24, 157, 44);");
    newsType.innerHTML = "<h2>Sports</h2>";
    fetchSportsNews();
});

techBtn.addEventListener("click", function(){
    document.getElementById("top").setAttribute("style", "background-color: rgb(202, 120, 19);");
    document.getElementById("bottom").setAttribute("style", "background-color: rgb(202, 120, 19);");
    newsType.innerHTML = "<h2>Technology</h2>";
    fetchTechNews();
});

searchBtn.addEventListener("click", function(){
    document.getElementById("top").setAttribute("style", "background-color: rgb(202, 190, 19);");
    document.getElementById("bottom").setAttribute("style", "background-color: rgb(202, 190, 19);");
    newsType.innerHTML = "<h2>Search: "+newsQuery.value+"</h2>";
    fetchQueryNews();
});

const fetchLocalNews = async() => {
    const response = await fetch(LOCAL_NEWS);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else {
        console.log(response.status, response.statusText);
        newsDetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
}

const fetchBusinessNews = async() => {
    const response = await fetch(BUSINESS_NEWS);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else {
        console.log(response.status, response.statusText);
        newsDetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
}

const fetchSportsNews = async() => {
    const response = await fetch(SPORTS_NEWS);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else {
        console.log(response.status, response.statusText);
        newsDetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
}

const fetchTechNews = async() => {
    const response = await fetch(TECH_NEWS);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else {
        console.log(response.status, response.statusText);
        newsDetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
}

const fetchQueryNews = async() => {
    if(newsQuery.value == null)
        return;
    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else {
        console.log(response.status, response.statusText);
        newsDetails.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayNews();
}

function displayNews() {
    newsDetails.innerHTML = "";

    if(newsDataArr.length == 0){
        newsDetails.innerHTML = "No data found.";
        return;
    }

    newsDataArr.forEach(news => {
        var date = news.publishedAt.split("T");

        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className="p-2";

        var image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "50%");
        image.src = news.urlToImage;

        var cardBody = document.createElement('div');

        var newsHeading = document.createElement('h3');
        newsHeading.className="card-title";
        newsHeading.innerHTML = news.title;

        var newsDate = document.createElement('h5');
        newsDate.className="text-primary";
        newsDate.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;
        discription.setAttribute("max-width","100%");
        discription.setAttribute("height", "auto");

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.setAttribute("style","color: white; background-color: black; border: 5px solid black;");
        link.href = news.url;
        link.innerHTML = "Read More";

        var end = document.createElement('hr');

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(newsDate);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);
        cardBody.appendChild(end);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsDetails.appendChild(col);
        });
}