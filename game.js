

var buttoncolors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern=[];

var started =false;

var level  = 0;

///////////////////////////////////////////       KEYPRESS HANDLING       //////////////////////////////////////////////////////////////

                                        // ek baar event listener start ho gaya to it is always active so be sure to act accordingly
                                        // isliye yaha bahaar if statement nhi laga skte kyunki eventListener() will always be active
$(document).keypress(function() {       // and uska handler() function hamesha on rhega  thus we don't get our desired output........
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    checkAnswer(userClickedPattern.length-1);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////  PLAYING SOUND ON BUTTON CLICK EVENT ///////////////////////////////////////////////////////

$(".btn").on("click",function(){

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);   // to animate
  playSound(userChosenColor);    // user clicking button
  checkAnswer(userClickedPattern.length-1);
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////           TO Check The User input          ///////////////////////////////////////////////////////////

function checkAnswer(currentLevel) {

    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    }

    else {
        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");


        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        
        startOver();
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////                 SELECTING THE NEW SEQUENCE         ////////////////////////////////

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor  = buttoncolors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);// next sequence ke liye
    
    
}


///////////////////////////////////////              Play sound                ///////////////////////////////////////////////////////

function playSound(name){

    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////// animation  /////////////////
function animatePress(currentColor){
    $("."+currentColor +".btn").addClass("pressed");
    setTimeout(function(){
        $("."+currentColor +".btn").removeClass("pressed");
    },100)
}
/////////////////////////////////////////


/// TO start over once the game has ended;
function startOver(){
    level = 0 ; 
    gamePattern = [];
    started = false;
  }