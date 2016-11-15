/* --------------------------------------------------

AUTHOR: Jim Simpson 

ABOUT: Restructuring DOM and interactions for responsive & mobile support, and, to modernize the entire interface.

VERSION: 1.0

TEST ACCOUNTS:

	https://marketplace.mimeo.com/jsimpson#name=0&c=00000000-0000-0000-0000-000000000000
	https://marketplace.mimeo.com/mimeo-products-a#name=0&c=00000000-0000-0000-0000-000000000000
  https://marketplace.mimeo.com/Index.aspx?&catalogId=d600159dd62a4ec2b9a590b077af319b#name=13

-------------------------------------------------- */

(function () {

  // ---------- TO DO ---------- //
  // Set beta cookie
  
  // ---------- HEADER ---------- //
  $("#logo, #navigation").wrapAll("<div class='container-header'></div>");
  $("#navigation").prepend("<div class='menu-toggle'><i class='material-icons'>menu</i></div>");
  $("#menu-main li:nth-child(1)").addClass("force-active");
  $("#menu-main li").click(function () {
    $("#menu-main *").removeClass("force-active");
  });

  // ---------- SCRIM ---------- //
  $("#container").append("<div class='menu-scrim'></div>");

  $(".menu-toggle, #column *, .menu-scrim").click(function () {
    $("body").toggleClass("open");
  });

  // ---------- LOADER ---------- //
  $("<svg class='loading__spinner' viewBox='0 0 66 66' xmlns='http:\/\/www.w3.org\/2000\/svg'><circle class='loading__path-light' fill='none' stroke-width='6' stroke-linecap='square' cx='33' cy='33' r='30'\/><\/svg>").insertBefore("div.spinner > span");

  // ---------- NAVIGATION ---------- //

  // Add placeholder attribute to search input
  $( "#searchKeyword" ).attr( "placeholder", "Search" );

  // Add icon to search input
  $( "<i class='material-icons'>search</i>" ).insertBefore( "#searchButton" );

  $("#category-products div div").addClass("mmo-nav-item");
  $("#category-products div div h4").addClass("mmo-nav-item-label");

  $("<div class='mmo-nav-highlight primaryBackgroundColor'></div><div class='mmo-nav-accent primaryBackgroundColor'></div>").insertBefore("#category-products h4 a");
  $("<div class='mmo-nav-highlight primaryBackgroundColor'></div><div class='mmo-nav-accent primaryBackgroundColor'></div>").insertBefore(".mmo-nav-item-label h4 a");

  // Run events on mouse clicks
  $("#column").click(function (e) {

    // The jQuery selector $( event.target ) won't work in Firefox.
    // The event has to be degined as a formal parameter to the handler.
    // IE defines it globally, and Chrome defines it both in both places, so it works either way, 
    // but Firefox only defines it as a function parameter.
    e = e || window.event;
    var navTarget = e.target;
    console.log(navTarget.id);

    $("#column div.mmo-nav-highlight, #column div.mmo-nav-accent").removeClass("active");
    

    if ( $(navTarget).hasClass("itemActive") ) {

      // Add the highlight and accent to the active selected nav item
      $($(navTarget).siblings("div.mmo-nav-highlight, div.mmo-nav-accent")).addClass("active");

      // Remove the funky chevrons
      var strNavArrows = $(navTarget).html();
      var resNavArrows = strNavArrows.replace("»", "");
      $($(navTarget)).html(resNavArrows);

      // Insert MD Arrow Icon
      //$("<i class='material-icons'>keyboard_arrow_right</i>").insertAfter(".mmo-nav-item-label a.itemActive");

    }

  });

  // Tabbed Navigation
  $( "#menu-main:nth-child(1)" ).click(function() {
    $( "#catalogStyleContainer" ).show();
  });
  $( "#menu-main:not(:nth-child(1))" ).click(function() {
    $( "#catalogStyleContainer" ).hide();
  });
  

  // ---------- CONTENT ---------- //
  $("#container").removeClass("primaryBackgroundColor");
  $("#column").prependTo("#content");
  $("#headLine").prependTo("#mainContentContainer");
  $("#menu-tabs ul").prepend("<li class='mmo-container-beta'><input class='mmo-toggle' id='mmo-toggle-control' type='checkbox' checked><label for='mmo-toggle-control' class='mmo-toggle-container'><div class='mmo-toggle-label'><\/div><\/label><\/li><li class='mmo-label-beta'><span>Beta<\/span><\/li>");

  // ---------- SUBHEAD - BREADCRUMB NAVIGATION ---------- //
  //$("#headLine").addClass( "mmo-test" );

  // ---------- SUBHEAD - VIEW TOGGLE ---------- //
  
  // Wrap subhead container in container for correct positioning
  $("#headLine, #catalogStyleContainer").wrap("<div class='container-subhead'></div>");
  
  $("#catalogStyleContainer").insertAfter($("h5#headLine"));
  $(".text-light > em").replaceWith("<em>View:</em>");
  
  //$("#catalogStyleContainer > span:nth-child(2)").append("<i class='material-icons'>view_module</i>"); 
  //$("#catalogStyleContainer > span:nth-child(3) > a").append("<i class='material-icons'>view_list</i>"); 

  // ---------- BEGIN: MUTATION OBSERVER ---------- //
  /*
  This needs some work. There are redundant methods below, but my "cleaner" implementation
  kept breaking when rednering. Coming back to clean up and remove these redundant methods ASAP. 
  */

  // Configuration of the observer:
  var config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  };

  // ---------- LEFT HAND NAVIGATION ---------- //
  var observerNavigation = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      var newNodes = mutation.addedNodes; // DOM NodeList 
      if (newNodes !== null) {            // If there are new nodes added
        var $nodes = $(newNodes);         // jQuery set
        $nodes.each(function () {
          var $node = $(this);
          if ($node.is("div.mmo-nav-item")) {

            // ---------- TESTING ---------- //
            //console.log(mutation.addedNodes[i].count);
            //$( this ).addClass("mmo-test");

          }
        });
      }
    });
  });

  // ---------- BREADCRUMB NAVIGATION ---------- //
  var observerBreadcrumbNavigation = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      var newNodes = mutation.addedNodes; // DOM NodeList 
      if (newNodes !== null) {            // If there are new nodes added
        var $nodes = $(newNodes);         // jQuery set
        $nodes.each(function () {
          var $node = $(this);
          if ($node.is("a")) {

            // ---------- TESTING ---------- //
            //console.log(mutation.addedNodes[i].count);
            //console.log(mutation.addedNodes);
            //console.log("looped");
            //$( this ).addClass("mmo-test");

            // Remove the funky chevrons
            var strSubHead = $("#mainContentContainer h5#headLine span").html();
            var resSubHead = strSubHead.replace("»", ">");
            $("#mainContentContainer h5#headLine span").html(resSubHead);

            // Swap the text for Material Design grid icon 
            var iconReplaceGrid = $("#itemlist-detailMode").html();
            var iconNewGrid = iconReplaceGrid.replace("Detail", "<i class='material-icons'>view_module<\/i>");
            $("#itemlist-detailMode").html(iconNewGrid);

            // Swap the text for Material Design list icon
            var iconReplaceList = $("#itemlist-listMode").html();
            var iconNewList = iconReplaceList.replace("List", "<i class='material-icons'>view_list<\/i>");
            $("#itemlist-listMode").html(iconNewList);

          }

        });
      }
    });
  });

  // ---------- PRODUCT VIEW - GRID ---------- //
  var observerProductsGrid = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      var newNodes = mutation.addedNodes; // DOM NodeList 
      if (newNodes !== null) {            // If there are new nodes added
        var $nodes = $(newNodes);         // jQuery set
        $nodes.each(function () {
          var $node = $(this);
          if ($node.is("div.containerProduct")) {

            // ---------- CHANGES TO CARD LAYOUT ---------- //

            // ---------- TESTING ---------- //
            //console.log(mutation.addedNodes[i].count);            
            //$("div.containerProduct").addClass("mmo-test");
            //$("div.containerProduct a.button.addToCart").addClass("mmo-test");
            //$("div.containerProduct span:last-child").addClass("mmo-test");

            // ---------- Add To Cart Button - Text Modifications ---------- //
            var strAddToCart = $(".containerPurchase div:nth-child(6) a:nth-child(1)").first().text();
            var resAddToCart = strAddToCart.replace(/\+Add To Cart/g, "Add To Cart");
            $(".containerPurchase div:nth-child(6) a:nth-child(1)").text(resAddToCart);
            
            // ---------- Read More Button - Text Modifications ---------- //
            var strProductInfo = $(".containerInformation p span a").first().text();
            var resProductInfo = strProductInfo.replace(/Read More »/g, "View Details");
            $(".containerInformation p span a").text(resProductInfo);
            
            // ---------- PRODUCT CARD FORMATTING ---------- //

            var btnAddToCart = $(this).find("a.button.addToCart");
            var btnViewDetails = $(this).find("a.button:contains('View Details')");
            var productDescription = $(this).find("div.containerInformation");
            var productNote = $(this).find("span.noteProductAdded");
            var lastElement = $(this).find("a.button.addToCart:last-child");
            
            btnAddToCart.insertAfter( productDescription );
            btnViewDetails.insertAfter( productDescription );
            productNote.insertAfter( lastElement );

          }
        });
      }
    });
  });

  // ---------- PRODUCT VIEW - LIST ---------- //
  var observerProductsList = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      var newNodes = mutation.addedNodes; // DOM NodeList 
      if (newNodes !== null) {            // If there are new nodes added
        var $nodes = $(newNodes);         // jQuery set
        $nodes.each(function () {
          var $node = $(this);
          if ($node.is("div.tr")) {

            // ---------- TESTING ---------- //
            //console.log(mutation.addedNodes[i].count);
            //$( "div.td-40" ).addClass("mmo-test");

          }
        });
      }
    });
  });

  // ---------- THE NODE(S) TO BE MONITORED ---------- //
  // Pass in the target node, as well as the observer options

  // Nav Panel
  observerNavigation.observe($("#column")[0], config);

  // Breadcrumb Navigation
  observerBreadcrumbNavigation.observe($("#headLine")[0], config);

  // Product View - Grid
  observerProductsGrid.observe($("#catalogItemDeatilDataView")[0], config);

  // Product View - List
  observerProductsList.observe($("#catalogItemListView")[0], config);

  // ---------- END: MUTATION OBSERVER ---------- //


  /*
  setTimeout(function(){ 
    //console.log("Receiving...");
  }, 5000);
  */

})();