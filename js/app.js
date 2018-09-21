// `Enter` key handler
$("#query").keyup(function(e) {
  if (e.which === 13) {
    wikiSearch();
  }
});

$("#submit").on("click", wikiSearch);

function wikiSearch() {
  var searchItem = $("#query").val();

  if (searchItem === '') { return; }
  else {
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php",
      data: {
        action: "opensearch",
        format: "json",
        search: searchItem,
        origin: "*"
      },
      success: function(data) {
        displayData(data);
      }
    });
  }
}

function displayData(data) {
  var searchTerm = data[0];
  var title = data[1];
  var intro = data[2];
  var link = data[3];
  var card = $("div#results").empty();

  // Slide searchbar to top
  $("#searchbar").animate( {top: '15px'} );

  // Stall results for animation to finish
  setTimeout(function() {
    $.each(title, function(i, value) {

      // Append data to card div
      card.append(
        "<a href='" + link[i] + "' target='_blank'>" +
        "<div class='card'>" +
          "<h1>" + title[i] + "</h1>" +
          "<p>"  + intro[i] + "</p>"  +
        "</div>" +
        "</a>");
      });

      console.log(data);
  }, 500)
}


/***** NOTES *****
//Random Wikipedia article: https://en.wikipedia.org/wiki/Special:Random

// Wikimedia API sandbox:
https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=jsonfm

// Need User-Agent headers, use POST, to identify client: https://www.mediawiki.org/wiki/API:Main_page

// Working query string:
https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&utf8=1&srsearch=anything

// Images in results:
https://www.mediawiki.org/wiki/API:Page_info_in_search_results

// TODO: Add ajax error case handling
*/
