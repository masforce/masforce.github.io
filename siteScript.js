$( document ).ready(function() {
    
    document.onkeydown = checkKey;

    function checkKey(e) {
        var sprites = Array.from(document.getElementsByClassName("sprite"))
        e = e || window.event;
        if (e.keyCode == '32') {
           shoot(sprites);
        }
        else {
            if (e.keyCode == '38') {
                moveUp(sprites);
            }
            else if (e.keyCode == '40') {
                moveDown(sprites);
            }
            else if (e.keyCode == '37') {
               moveLeft(sprites);
            }
            else if (e.keyCode == '39') {
               moveRight(sprites);
            }
            removeOldSprites(sprites)
            createNewSprites(newSprites)
        }
        
    }
    
    
    function shoot(sprites) {
        console.log("shoot!")
        
        var origin
        
        for (var i = 0; i < sprites.length; i++) {
            
            sprite = sprites[i]
            var shootYCoord
            
            if (sprite.style.backgroundColor == "green") {
                
                var yCoord = getPosition(sprite).substring(2)
                var xCoord = getPosition(sprite).substring(0, 2)
                var newCoord = xCoord + yCoord
                
                shootYCoord = parseInt(yCoord)+1
                origin = xCoord + shootYCoord
                
            }
            
        }

        var shootSpan = 40 - shootYCoord
        var position = origin
        
        for (var i = 0; i < shootSpan; i++){
            
            triggerShoot(position)
                    
        }
        
    }
    
    function triggerShoot(position) {
        
        console.log("setting color" + position)
            document.getElementById("cell" + position).style.backgroundColor = "yellow"
            
            setTimeout(function() {
                //if (document.getElementById(shootCoord).classList.contains("sprite")){
                    //console.log("position is: " + position)
                document.getElementById("cell" + position).style.backgroundColor = "#4F4F4F"
                //}
                
                var yCoord = position.substring(2)
                var xCoord = position.substring(0, 2)
                position = xCoord + (parseInt(yCoord)+1)
                
            }, 300);
        
    }
    
    //array to store id for all new sprites
    var newSprites = [];
    
    //helper functions to redraw sprite pixels:
    function removeOldSprites(sprites) {
        for (var i = 0; i < sprites.length; i++) {
            sprite = sprites[i]
            sprite.style.backgroundColor = "#4F4F4F"
            sprite.classList.remove("sprite")
        }
    }
    function createNewSprites(newSprites) {
        for (var i = 0; i < newSprites.length; i++) {
            coords = newSprites[i][0]
            var newSprite = document.getElementById(coords)
            //console.log(coords)
            newSprite.style.backgroundColor = newSprites[i][1]
            newSprite.className = "sprite"
        }
    }
    
    function moveUp(sprites) {
        //loop to populate array of new sprites:
        for (var i = 0; i < sprites.length; i++) {
            sprite = sprites[i]
            var yCoord = getPosition(sprite).substring(2)
            var xCoord = getPosition(sprite).substring(0, 2)

            if (xCoord != 0) {
                var newXcoord = parseInt(xCoord)-1

                if (newXcoord.toString().length == 1) {
                    newXcoord = "0" + newXcoord
                }

                var newCoord = "cell" + newXcoord + yCoord

                //console.log("New coord is: " + newCoord)
                
                newSprites[i] = [newCoord, sprite.style.backgroundColor]
            }   
        }
    }
      
    function moveDown(sprites) { 
        //loop to populate array of new sprites:
        for (var i = 0; i < sprites.length; i++) {
            sprite = sprites[i]
            var yCoord = getPosition(sprite).substring(2)
            var xCoord = getPosition(sprite).substring(0, 2)

            if (xCoord != 39) {
                var newXcoord = parseInt(xCoord)+1

                if (newXcoord.toString().length == 1) {
                    newXcoord = "0" + newXcoord
                }

                var newCoord = "cell" + newXcoord + yCoord

                //console.log("New coord is: " + newCoord)
                
                newSprites[i] = [newCoord, sprite.style.backgroundColor]

            }
        }
    }
    function moveLeft(sprites) {
        //loop to populate array of new sprites:
        for (var i = 0; i < sprites.length; i++) {
            sprite = sprites[i]
        
            var yCoord = getPosition(sprite).substring(2)
            var xCoord = getPosition(sprite).substring(0, 2)

            if (yCoord != 0) {
                var newYcoord = parseInt(yCoord)-1

                if (newYcoord.toString().length == 1) {
                    newYcoord = "0" + newYcoord
                }

                var newCoord = "cell" + xCoord + newYcoord

                //console.log("New coord is: " + newCoord)
                
                newSprites[i] = [newCoord, sprite.style.backgroundColor]

            }
            else {
                var newCoord = "cell" + xCoord + "39"

                //console.log("New coord is: " + newCoord)
                
                newSprites[i] = [newCoord, sprite.style.backgroundColor]

            }
            var newSprite = document.getElementById(newCoord)
        }
    }
    function moveRight(sprites) {
        //loop to populate array of new sprites:
        for (var i = 0; i < sprites.length; i++) {   
            sprite = sprites[i]
        
            var yCoord = getPosition(sprite).substring(2)
            var xCoord = getPosition(sprite).substring(0, 2)

            if (yCoord != 39) {

                var newYcoord = parseInt(yCoord)+1

                if (newYcoord.toString().length == 1) {
                    newYcoord = "0" + newYcoord
                }

                var newCoord = "cell" + xCoord + newYcoord

                //console.log("New coord is: " + newCoord)

                newSprites[i] = [newCoord, sprite.style.backgroundColor]

            }
            else {

                var newCoord = "cell" + xCoord + "00"

                //console.log("New coord is: " + newCoord)

                newSprites[i] = [newCoord, sprite.style.backgroundColor]

            }
            var newSprite = document.getElementById(newCoord)
        }
    }
    
    function getPosition(sprite) {
        return(sprite.id.substring(4))
    }
    
    
    
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
        
        document.getElementById('columns').id = "columnsCondensed"
        document.getElementById('about').id = "aboutCondensed"
        document.getElementById('facts').id = "factsCondensed"
        
        document.getElementById('introBox').id = "introBoxCondensed"
        
        //project section
        introBoxes = document.getElementsByClassName('projectIntroBox')
        while (introBoxes.length > 0) {
            introBoxes[0].className = 'projectIntroBoxCondensed'
        }
        
        imgCols = document.getElementsByClassName('projectImgCol')
        while (imgCols.length > 0) {
            imgCols[0].className = 'projectImgColCondensed'
        }
        
        tableCols = document.getElementsByClassName('projectTableCol')
        while (tableCols.length > 0) {
            tableCols[0].className = 'projectTableColCondensed'
        }      
        
        document.getElementsByClassName('col-md-12')[0].style.display = "none"
        
        //$('*').each(function(){
        //   var k =  parseInt($(this).css('font-size')); 
        //   var redSize = ((k*120)/100) ; //here, you can give the percentage( now it is reduced to 90%)
        //       $(this).css('font-size',redSize);  

        //});
        
    }
    
    function loadWide() {
        console.log("switch to wide layout!")
        document.getElementById('wrapperCondensed').id = "wrapper"
        document.getElementById('wrapper3Condensed').id = "wrapper3"
        document.getElementById('subWrapper1Condensed').id = "subWrapper1"
        document.getElementById('subWrapper2Condensed').id = "subWrapper2"
        document.getElementById('socialMediaCondensed').id = "socialMedia"
        
        document.getElementById('columnsCondensed').id = "columns"
        document.getElementById('aboutCondensed').id = "about"
        document.getElementById('factsCondensed').id = "facts"
        
        document.getElementById('introBoxCondensed').id = "introBox"
        
        //project section
        introBoxesCondensed = document.getElementsByClassName('projectIntroBoxCondensed')
        while (introBoxesCondensed.length > 0) {
            introBoxesCondensed[0].className = 'projectIntroBox'
        }
        
        imgColsCondensed = document.getElementsByClassName('projectImgColCondensed')
        while (imgColsCondensed.length > 0) {
            imgColsCondensed[0].className = 'projectImgCol'
        }

        tableColsCondensed = document.getElementsByClassName('projectTableColCondensed')
        while (tableColsCondensed.length > 0) {
            tableColsCondensed[0].className = 'projectTableCol'
        }
        
        document.getElementsByClassName('col-md-12')[0].style.display = "inline"
        
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
    
        $(".actColumn").on('click', function(event) {      

            var content = $("#" + this.id + "Content");
            
            if ($("#" + this.id).hasClass("actColumnSelected")) {
                
                $("#" + this.id + "Arrow").removeClass("rotated");
                
                $("#" + this.id).addClass('actColumn').removeClass('actColumnSelected');
                $(".selectedContent").removeClass('selectedContent');
                content.slideToggle();
                
            }
            else {
                
                $(".rotated").removeClass('rotated')
                $("#" + this.id + "Arrow").addClass("rotated");
                
                $(".actColumnSelected").addClass('actColumn').removeClass('actColumnSelected');
                $(".selectedContent").removeClass('selectedContent').slideToggle();

                $("#" + this.id).toggleClass("actColumnSelected");

                content.slideToggle();
                content.addClass("selectedContent")
            }

        });
    
    
        $(".moreInfo").on('click', function(event) {      
            
            var content = $("#" + this.id + "Description");
            
            if ($("#" + this.id).hasClass("selectedDescription")) {
                $("#" + this.id + "Arrow").removeClass("rotatedInfo");
                $(this).removeClass('selectedDescription');
                content.slideToggle();
            }
            else {
                $("#" + this.id  + "Arrow").addClass("rotatedInfo");
                $("#" + this.id).toggleClass("selectedDescription");
                content.slideToggle();
                content.addClass("selectedDescription")
            }

        });
    
        
        $('#sponsorCarousel').carousel({interval: 4000});

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
               
                experiencehT = $('#experience').offset().top,
                experiencehH = $('#experience').outerHeight(),
               
                activitieshT = $('#activities').offset().top,
                activitieshH = $('#activities').outerHeight(),
               
                projectshT = $('#projects').offset().top,
                projectshH = $('#projects').outerHeight(),
               
               
                wH = $(window).height(),
                wS = $(this).scrollTop();
            
            
            if (wS == 0){
               
                $('a[href="#experience"]').css("background-color", "#00ADB5");
                $('a[href="#top"]').css("background-color", "grey");
                $('a[href="#activities"]').css("background-color", "#00ADB5");
                $('a[href="#projects"]').css("background-color", "#00ADB5");
            }
            
            if (wS > (experiencehT+experiencehH-(wH/2))){
               
                $('a[href="#experience"]').css("background-color", "grey");
                $('a[href="#top"]').css("background-color", "#00ADB5");
                $('a[href="#activities"]').css("background-color", "#00ADB5");
                $('a[href="#projects"]').css("background-color", "#00ADB5");
            }
            
            if (wS > (activitieshT+activitieshH-(wH/2))){
               
                $('a[href="#experience"]').css("background-color", "#00ADB5");
                $('a[href="#top"]').css("background-color", "#00ADB5");
                $('a[href="#activities"]').css("background-color", "grey");
                $('a[href="#projects"]').css("background-color", "#00ADB5");
            }
            
            if (wS > (projectshT+projectshH-(wH/2))){
               
                $('a[href="#experience"]').css("background-color", "#00ADB5");
                $('a[href="#top"]').css("background-color", "#00ADB5");
                $('a[href="#activities"]').css("background-color", "#00ADB5");
                $('a[href="#projects"]').css("background-color", "grey");
            }

        });    

    });
