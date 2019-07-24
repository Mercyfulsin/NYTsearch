var apiKey = "AAavl15L60Lh1UlShhPgXf3KtttHxcXN"; //my (Andres) api key provided by NY Times Developer
var pageNumber = ""; //Declaring and initializing pageNumber. This is the amount of articles divided by 10.
var keyword = ""; //The thing the user wants to search for.

//This is a semi-hard coded API. It works but if we wanted to add "start-year" or other params
 //we'd have to change this. A better option would be to seperate it as the following:
 // var baseUrl = "https://api.nytimes.com/svc/search/v2/";
 // var searchUrl = "articlesearch.json?q=" + keyword;
 // var apiUrl = "&api-key=" + apiKey;
 // var pagesUrl = "&page=" + pageNumber
 // Looking @ the API documentation for the NYT we can grab more filters and make more variables and then just add them together depending on what the user has declared
 // EX: User wants specific pages with their search query => var completeUrl = baseUrl + searchUrl + pagesUrl + apiUrl;
 var apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword
 + "&api-key=" + apiKey + "&page=" + pageNumber;
 //Declaring the array variable where we will store the articles we got using Ajax
 var resultArray;


 //We want to wait until the page is loaded before using jQuery to grab our HTML DOM elements
 $(document).ready(function(){

    //Here we grab the button that has the id "search" and give it an on click function
    $("#search").click(function(){
        //Grab the value of the input text with id "searchParm"
        keyword = $("#searchParm").val();
        //Grab the amount of articles the user wants, convert it to integer and divide by 10 to get amount of pages.
        pageNumber = parseInt($("#pages option:selected" ).text())/10;
        console.log(keyword, pageNumber);
        //Here we call this function that will loop the amount of pages the user requested.
        appendMultiple(pageNumber);
        
    });
    //Here we grab the button that has the id "clear" and give it an on click function
    $("#clear").click(function(){
        //Here we grab the div with the id "word-blanks" and empty it. This clears anything we appended to it.
        $("#word-blanks").empty();
    });
 });

 //this function takes 1 argument (hopefully it's an integer... we can always add a parse to check.)
function appendMultiple(pn){
    //Loop until we reach the amount of pages the user requested.
    for(var i = 0 ; i < pn; i++){
        console.log("I'm here", pageNumber, i);
        //increment the pageNumber variable we declared globally.
        //This will change the apiUrl to search for another page.
        pageNumber = i;
        //use Ajax to grab the new url and request data from the API.
        callAjax();
    }
}

//This function redefines apiUrl to contain the latest content of the variables 'keyword' and 'pageNumber'
//Then it GET's the data from the API.
 function callAjax(){
    apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword
    + "&api-key=" + apiKey + "&page=" + pageNumber;
    $.ajax({
        url: apiUrl,
        method:'GET'
    }).done(function(result){
        //Here we store the array that has 10 articles that are in docs
        resultArray = result.response.docs;
        console.log(result.response.docs);
        //Loop through the 10 articles and grab the headline and web_url and save them to the div.
        //We want to display the headline while storing the web_url in an attribute I made up called 'url'
        //I did this because the function inside the click doesn't have access to the var i in the for loop
        //and I'd be unable to grab the current articles url. So by storing it in the div as an attribute
        //we are able to use jQuery to grab the value of that attribute
        for(var i = 0; i < 10; i++){
           var articleDiv = $("<div>");
           articleDiv.html("<h5>" + resultArray[i].headline.main + "</h5><br>");
           articleDiv.attr("url", resultArray[i].web_url);

           articleDiv.click(function(){
               //When a button is clicked, grab 'this' specific button's url attribute
               //and open it in a new tab (we do this by declaring the target '_blank')
               window.open( $(this).attr("url") ,'_blank');
           });
           //Here we append the single article to the HTML.
           $("#word-blanks").append(articleDiv);
           //Remember, this is ALL getting looped 'pn' amount of times (depends how many articles the user chose).
       }
    });
 }