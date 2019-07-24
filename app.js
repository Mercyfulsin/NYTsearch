var apiKey = "AAavl15L60Lh1UlShhPgXf3KtttHxcXN";
var counter = 0;
var pageNumber = 0;
var keyword = "";
var apiUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword
 + "&api-key=" + apiKey + "&page=" + pageNumber;
 var resultArray;
 $(document).ready(function(){

    $("#search").click(function(){
        keyword = $("#searchParm").val();
        console.log(keyword);
        callAjax();
    });
    $("#clear").click(function(){
        $("#word-blanks").empty();
    });
 });

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