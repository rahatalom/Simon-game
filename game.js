var started = false;
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}

$(document).keypress(function () {
  if (!started) {
    level = 0;
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  var r = randomChosenColor;
  var audio = new Audio("sounds/" + r + ".mp3");
  audio.play();
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  userClickedPattern = [];
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  var prss = new Audio("sounds/" + userChosenColor + ".mp3");
  prss.play();
  userClickedPattern.push(userChosenColor);
  $(this).addClass("pressed");
  setTimeout(function () {
    $(".btn").removeClass("pressed");
  }, 100);
  if (gamePattern.length == userClickedPattern.length) {
    if (JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern)) {
      level += 1;
      $("#level-title").text("Level " + level);
      setTimeout(function () {
        nextSequence();
      }, 1000);
    } else {
      $("#level-title").text("Game Over press any key to restart");
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 400);
      startOver();
    }
  }
});
