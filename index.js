var level = 0;
var sequanceTosolve=[];
var solution =[];
var playing = false;

$(document).keypress(function() {
   if (!playing) {
     $("#level-title").text("Level " + level);
     nextSequence();
     playing = true;
   }
 });

$(".btn").click(function (e) { 
   e.preventDefault();
   FlashKey(this);
   playSound($(this).attr("id"));
   if (playing){
      solution.push($(this).attr("id"));
      checkAnswer(solution.length-1);

   }
   else if (!playing) {
    $("#level-title").text("Level " + level);
    setTimeout(function(){nextSequence();},1000);
    playing = true;
  }
   }
   
  );


function FlashKey(button) {
  $(button).addClass("pressed");
   setTimeout(function(){
      $(button).removeClass("pressed"); }
      , 150 
   );
}

function playSound(button) {
  
   var audio = new Audio("sounds/"+button+".mp3");
   audio.play();
  }

  
   function nextSequence() {
      solution = [];
      level++;
      $("#level-title").text("Level " + level);
     
      var randomChosenColour = createSequance();
      sequanceTosolve.push(randomChosenColour);
     
    for (var i = 0; i < sequanceTosolve.length ; i++) {
      let color = sequanceTosolve[i];
      console.log(color);
      setTimeout ( function() {
      $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(color); 
    }
    ,500*i);
      
    }
    }
  // function nextSequence() {
  //   solution = [];
  //   level++;
  //   $("#level-title").text("Level " + level);
   
  //   var randomChosenColour = createSequance();
  //   sequanceTosolve.push(randomChosenColour);
  // console.log(sequanceTosolve);
  //   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //   playSound(randomChosenColour);
  // }


function createSequance() {
   
   var rand = Math.floor(Math.random() *4);
      switch(rand){
         case 0:
        return "green";
         
         case 1 :
         return "red"
        
         case 2 :
        return "yellow"
        
         case 3:
        return "blue";
        
      
         default:
            break;
      }
   }
   
   


function startOver() { 
    level = 0;
    sequanceTosolve=[];
    solution =[];
   playing = false;
   
 }



 function checkAnswer(currentLevel) {
   if (sequanceTosolve[currentLevel] === solution[currentLevel]) {
     if (sequanceTosolve.length === solution.length){
       setTimeout(function () {
         nextSequence();
       }, 1000);
     }
   } else {
     playSound("wrong");
     $("body").addClass("game-over");
     $("#level-title").text("Game Over, Press Any Key to Restart");

     setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);

     startOver();
   }
}
