$( document ).ready(function() {
    
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        loadCondensed();
    }
    else {
        
        var state;
        if ($(window).width() <= 1000) {
            loadCondensed();
            state = "condensed"
        }
        else {
            state = "wide"
        }
        console.log("Page loaded in " + state + " format");
        
        $( window ).resize(function() {
            if ($(window).width() <= 1000 && state == "wide") {
                loadCondensed();
                state = "condensed"
            }
            else if ($(window).width() >= 1000 && state == "condensed"){
                loadWide();
                state = "wide"
            }
        });
    }
    
    function loadCondensed() {
        console.log("switch to mobile layout!");
        document.getElementById('wrapper').id = "wrapperCondensed"
        document.getElementById('wrapper3').id = "wrapper3Condensed"
        document.getElementById('subWrapper1').id = "subWrapper1Condensed"
        document.getElementById('subWrapper2').id = "subWrapper2Condensed"
        document.getElementById('socialMedia').id = "socialMediaCondensed"
    }
    
    function loadWide() {
        console.log("switch to wide layout!")
        document.getElementById('wrapperCondensed').id = "wrapper"
        document.getElementById('wrapper3Condensed').id = "wrapper3"
        document.getElementById('subWrapper1Condensed').id = "subWrapper1"
        document.getElementById('subWrapper2Condensed').id = "subWrapper2"
        document.getElementById('socialMediaCondensed').id = "socialMedia"
    }
  
    
});


$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});


$( document ).ready(function() {
        
        $('#sponsorCarousel').carousel({interval: 3900});

        $('.carousel .item').each(function(){
            
          var next = $(this).next();
            
          if (!next.length) {
            next = $(this).siblings(':first');
          }
            
          next.children(':first-child').clone().appendTo($(this));
            
          if (next.next().length>0) {
            next.next().children(':first-child').clone().appendTo($(this));
          }
            
          else {
            $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
          }
            
        });

        $(window).scroll(function() {
            
           var tophT = $('#top').offset().top,
               tophH = $('#top').outerHeight(),
               
               activitieshT = $('#projects').offset().top,
               activitieshH = $('#projects').outerHeight(),
               
               experiencehT = $('#experience').offset().top,
               experiencehH = $('#experience').outerHeight(),
               
               wH = $(window).height(),
               wS = $(this).scrollTop();
            
            
           if (wS == 0){
               
            $('a[href="#experience"]').css("background-color", "#00ADB5");
            $('a[href="#top"]').css("background-color", "grey");
            $('a[href="#projects"]').css("background-color", "#00ADB5");
           }
            
           else if (wS > (activitieshT+activitieshH-(wH/2))){
               
            $('a[href="#experience"]').css("background-color", "#00ADB5");
            $('a[href="#top"]').css("background-color", "#00ADB5");
            $('a[href="#projects"]').css("background-color", "grey");
           }
            
           else if (wS > (experiencehT+experiencehH-(wH/2))){
               
            $('a[href="#experience"]').css("background-color", "grey");
            $('a[href="#top"]').css("background-color", "#00ADB5");
            $('a[href="#projects"]').css("background-color", "#00ADB5");
           }

        });    

    });
