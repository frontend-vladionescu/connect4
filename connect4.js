var counterForColor = 0;
var circleNumber = 1;
var positionsArray = [];
for(var i = 0; i<49; i++){positionsArray[i]=0;}
var red = document.getElementById("red");
var black = document.getElementById("black");
var green = document.getElementById("green");
var purple = document.getElementById("purple");
var pink = document.getElementById("pink");
var circle = document.getElementById("circle");
var possibleColors = ["red", "black", "green", "purple", "pink", "yellow"];
var newPossibleColorsP = [];
var newPossibleColors = [];
var player1Name;
var player2Name;
var player1Color = "red";
var player2Color ="black";
var currentPlayerColor = "red";
var currentPlayer = 1;


for(var i = 0; i < possibleColors.length; i++){
  circleColor(i);
}

function circleColor(index){
  var currentColor = document.getElementById(possibleColors[i]);
  currentColor.value = index;
  
  currentColor.onclick = function(){
    circle.className = "circle";
    circle.className += " " + possibleColors[this.value] + "Circle";
    currentPlayerColor = possibleColors[this.value];
  }
}


document.getElementById("playerForm").addEventListener("submit", function(e){
  e.preventDefault();
  var currentPlayerName = document.getElementById("playerName").value;
  
  if(currentPlayer == 1){
   
    if(currentPlayerName == ""){
      currentPlayerName = "Player 1";   
    }
    
   
    
    player1Name = currentPlayerName;
    player1Color = currentPlayerColor;
    deleteColorOption(player1Color);
    document.getElementById("nameText").innerHTML = "Second player name:";
  }
  if(currentPlayer == 2){
   
    if(currentPlayerName == "" || currentPlayerName == player1Name ){
      currentPlayerName = "Player 2";   
    }
    if(currentPlayerColor == player1Color){
      currentPlayerColor = "black"; 
    }
    if(player1Color == "black" && currentPlayerColor == "black"){
      currentPlayerColor = "red";
    }
 
    player2Name = currentPlayerName;
    player2Color = currentPlayerColor;
    
    
    document.getElementById("playerSelectorForm").className= "invisible";
    document.getElementById("connect4").className ="connect4Board";
    generateBoard();
  }
  currentPlayer++;
  
})
  
   
function deleteColorOption(color){
  var radioButtons = document.getElementById("radioButtons");
  var br = document.createElement("br");
  var i = 0;
   
  for(var x = 0; x < possibleColors.length; x++){
    if(possibleColors[x] != color){
      newPossibleColors[i] = document.getElementById(possibleColors[x])
      newPossibleColorsP[i] = document.getElementById(possibleColors[x]+ "p") ;
      i++;
    }
  }
  
  radioButtons.innerHTML ="";
 
  for(var y = 0; y < newPossibleColors.length; y++){
    radioButtons.appendChild(newPossibleColors[y]);
    radioButtons.appendChild(newPossibleColorsP[y]);
    radioButtons.appendChild(document.createElement("br"));
  }
}
 
function generateBoard(){ 

  var connect4Board = document.getElementById("connect4"); 
  for(var x = 1; x <= 7; x++){
    for(var y = 1; y <= 7; y++){
      var emptyCircle = document.createElement("div");
      emptyCircle.className  = "emptyCircle";
      emptyCircle.number = circleNumber;
      emptyCircle.id = circleNumber;
      circleNumber++;
      
      emptyCircle.onclick = function() {
        myHandler.bind(this)(this.number);
      }
      connect4Board.appendChild(emptyCircle);
    }
    connect4Board.appendChild(document.createElement("br"));
  }   
}


function myHandler(number){

  var positionToColor = firstEmptyPosition(number-1);
  var positionToStart = startingPosition(positionToColor+1);
   
  moveCircle(positionToStart, positionToColor);

checkIfOver(positionsArray);
};

 
function firstEmptyPosition(number){
      if(positionsArray[number] == undefined || positionsArray[number] == 1 || positionsArray[number] == 2)
        return number-7;
      else if(positionsArray[number]!=undefined && positionsArray[number] == 0)
             return firstEmptyPosition(number+7);
      
}

function startingPosition(position){
  while(position>7){
    position +=-7;
  }

  return position;
  
}



function moveCircle(start, end){

  if(start >= end){
  colorCircle(end);
  counterForColor++; 
          
          
  }
  else{
   document.getElementById('connect4').style.pointerEvents = 'none';
    var temp = document.getElementById(start);
    if(counterForColor%2==0){
      temp.className = player1Color + "Circle";
    
      setTimeout(function() {
       
            temp.className = "emptyCircle";
            return moveCircle(start+7, end)
            }, 350);

    }else{
      temp.className = player2Color + "Circle";
      setTimeout(function() {
            temp.className = "emptyCircle";
            return moveCircle(start+7, end)
            }, 350);
    }
  }
}



function colorCircle(position){
  document.getElementById('connect4').style.pointerEvents = 'auto';
  
  if(counterForColor%2==0 && positionsArray[position]==0){
    document.getElementById(position+1).className = player1Color+"Circle";
    positionsArray[position] = 1;
  }else if(counterForColor%2!=0 && positionsArray[position]==0){
    document.getElementById(position+1).className = player2Color+"Circle";
    positionsArray[position] = 2;
  }
  checkIfOver(positionsArray, counterForColor)
}

    
function checkIfOver(array, counter){
  var middlePossition = 3;
  var check;
  
  if(counter%2==0){
    check = 1;
  }else{
    check = 2;
  }
  
  var  winner = 0;
  var i = 0;
  for (var x=1; x<=7; x++){
    if(array[middlePossition]==check && array[middlePossition-1]==check && array[middlePossition-2]==check && array[middlePossition-3]==check){
      winner = 1;
    }
    if(array[middlePossition]==check && array[middlePossition+1]==check && array[middlePossition+2]==check && array[middlePossition+3]==check){
      winner = 1;
    }
    if(array[middlePossition]==check && array[middlePossition-8]==check && array[middlePossition-16]==check && array[middlePossition-24]==check){
      winner = 1;
    }
    if(array[middlePossition]==check && array[middlePossition+8]==check && array[middlePossition+16]==check && array[middlePossition+24]==check){
      winner = 1;
    }
    if(array[middlePossition]==check && array[middlePossition-7]==check && array[middlePossition-14]==check && array[middlePossition-21]==check){
      winner = 1;
    }
    if(array[middlePossition]==check && array[middlePossition+7]==check && array[middlePossition+14]==check && array[middlePossition+21]==check){
      winner = 1;
    }
    if(array[middlePossition]==check && array[middlePossition-6]==check && array[middlePossition-12]==check && array[middlePossition-18]==check){
      winner = 1;
    }
    if(array[middlePossition]==check && array[middlePossition+6]==check && array[middlePossition+12]==check && array[middlePossition+18]==check){
      winner = 1;
    }
    if(array[middlePossition]==check && array[middlePossition-1]==check && array[middlePossition-2]==check && array[middlePossition+1]==check){
      winner = 1;
    }
    if(array[middlePossition]==check && array[middlePossition-1]==check && array[middlePossition+1]==check && array[middlePossition+2]==check){
      winner = 1;
    }
    if(array[middlePossition]==check && array[middlePossition-7]==check && array[middlePossition-14]==check && array[middlePossition+7]==check){
      winner = 1;
    }
    if(array[middlePossition]==check && array[middlePossition-7]==check && array[middlePossition+7]==check && array[middlePossition+14]==check){
      winner = 1;
    }
    if(array[middlePossition]==check && array[middlePossition-8]==check && array[middlePossition-16]==check && array[middlePossition+8]==check){
      winner = 1;
    }
    if(array[middlePossition]==check && array[middlePossition-8]==check && array[middlePossition+8]==check && array[middlePossition+16]==check){
      winner = 1;
    }
    if(array[middlePossition]==check && array[middlePossition-6]==check && array[middlePossition-12]==check && array[middlePossition+6]==check){
      winner = 1;
    }
    if(array[middlePossition]==check && array[middlePossition-6]==check && array[middlePossition+6]==check && array[middlePossition+12]==check){
      winner = 1;
    }
    middlePossition+=7;
  }
  for (var x=0; x<=48; x++){
    if(array[x]==check && array[x-7]==check && array[x-14]==check && array[x-21]==check){
      winner = 1;
    }
    if(array[x]==check && array[x+7]==check && array[x+14]==check && array[x+21]==check){
      winner = 1;
    }
  }
  
  if(winner == 1){
    winner = check;
    document.getElementById('connect4').style.pointerEvents = 'none';
  }
  var resetButton = document.getElementById("resetbutton");
  
  resetButton.onclick = function(){
    location.reload();
  }
  
  var winningDiv = document.getElementById("winner");
  var winningDivP = document.createElement("p");
  
  if(winner == 1){
    var node = document.createTextNode(player1Name + " won !!!");
    winningDivP.appendChild(node);
    winningDiv.appendChild(winningDivP);
    winningDiv.className = "winner";
    resetButton.className="resetButton";
  }
  if(winner == 2){
    var node = document.createTextNode(player2Name + " won !!!");
    winningDivP.appendChild(node);
    winningDiv.appendChild(winningDivP);
    winningDiv.className = "winner";
    resetButton.className="resetButton";
  } 
}



