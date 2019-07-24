var apiKey = "AAavl15L60Lh1UlShhPgXf3KtttHxcXN";
var counter = 0;
var pageNumber = "";
var keyword = "";
var apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword
 + "&api-key=" + apiKey + "&page=" + pageNumber;
 var resultArray;
 $(document).ready(function(){

    $("#search").click(function(){
        keyword = $("#searchParm").val();
        pageNumber = parseInt($("#pages option:selected" ).text())/10;
        console.log(keyword, pageNumber);
        appendMultiple(pageNumber);
        
    });
    $("#clear").click(function(){
        $("#word-blanks").empty();
    });
 });

function appendMultiple(pn){
    for(var i = 0 ; i < pn; i++){
        console.log("I'm here", pageNumber, i);
        pageNumber = i;
        callAjax();
    }
}

 function callAjax(){
    apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword
    + "&api-key=" + apiKey + "&page=" + pageNumber;
    $.ajax({
        url: apiUrl,
        method:'GET'
    }).done(function(result){
        resultArray = result.response.docs;
        console.log(result.response.docs);
        for(var i = 0; i < 10; i++){
           var articleDiv = $("<div>");
           articleDiv.html("<h5>" + resultArray[i].headline.main + "</h5><br>");
           articleDiv.attr("url", resultArray[i].web_url);

           articleDiv.click(function(){
               window.open( $(this).attr("url") ,'_blank');
           });

           $("#word-blanks").append(articleDiv);
       }
    });
 }