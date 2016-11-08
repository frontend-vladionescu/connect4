(function(){ // makes all the form functionalitiy

  var circle = document.getElementById("circle"); // the empty model circle that gets colored
  var player1 = {name: "Player 1",
                 color: "red"
                };
  var player2 = {name: "Player 2",
                 color: "black"
                };
  
  var currentPlayerNumber = 1; // helps us see if this is the first or second player we are working with
  var currentPlayerColor = "red";//is used in case the user dosen't select a color; 
  var radioButtons = Array.prototype.slice.call(document.getElementsByName("color"));
  var radioLabels = Array.prototype.slice.call(document.getElementsByName("label-color"));

  (function clickChangeColor(){ //adds click eventlisteners to every color radio button
    for(var i = 0; i < radioButtons.length; i++){
      radioButtons[i].addEventListener("click", function(){
          changeCircleColor.bind(this)();
      });
    }
  }());

  function changeCircleColor(){ // changes the color of the model circle
    circle.className = "circle";
    circle.className += " " + this.id + "Circle";
    currentPlayerColor = this.id;
  }

  document.getElementById("playerForm").addEventListener("submit", function(e){ // stores the player names and colors
    e.preventDefault();
    var currentPlayerName = document.getElementById("playerName").value;
    
    if(currentPlayerNumber == 1){
      if(currentPlayerName == ""){
        currentPlayerName = "Player 1";   
      }
      player1.name = currentPlayerName;
      player1.color = currentPlayerColor;
      deleteColorOption();
      document.getElementById("nameText").innerHTML = "Second player name:";
    }

    if(currentPlayerNumber == 2){
      if(currentPlayerName != "" && currentPlayerName != player1.name ){
        player2.name = currentPlayerName;   
      }
      if(currentPlayerColor != player1.color ){
        player2.color = currentPlayerColor; 
      }
      if(player1.color == "black" && currentPlayerColor == "black"){
        player2.color = "red";
      }    
      
      document.getElementById("playerSelectorForm").className= "invisible";
      document.getElementById("connect4").className ="connect4Board";
      connect4Game.generateBoard(player1, player2);//calls the game function
    }
    currentPlayerNumber++;  
  })
    
     
  function deleteColorOption(){ //removes the color chosen by player1 from DOM
   for(var i = 0; i < radioButtons.length; i++){
     if(radioButtons[i].id == player1.color){
       radioButtons.splice(i, 1);
       radioLabels.splice(i, 1);
      }
    }
    redrawForm();
  }

  function redrawForm(){ //redraws the radio buttons without the option selected by player1
    var radioButtonsFieldset = document.getElementById("radio-buttons");
    radioButtonsFieldset.innerHTML = "";
    for(var y = 0; y < radioButtons.length; y++){
      radioButtonsFieldset.appendChild(radioButtons[y]);
      radioButtonsFieldset.appendChild(radioLabels[y]);
      radioButtonsFieldset.appendChild(document.createElement("br"));
    }
  } 
})()