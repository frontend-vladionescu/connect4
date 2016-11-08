var connect4Game = (function(){
  var counterForColor = 0; //counter used to check witch player is active using the even and odd method and being incremented when the player changes
  var circleNumber = 0;
  var positionsArray = [];
  for(var i = 0; i<49; i++){positionsArray[i]=0;}//generates the array that will hold the values for the circles if the circle is empty the value is 0 if its colored by player1 its value will be 1 and 2 for player2  
  var player1, player2;
  
  function generateBoard(p1, p2){ 
    player1 = p1;
    player2 = p2;
    var connect4Board = document.getElementById("connect4"); 
    for(var x = 1; x <= 7; x++){ // the classic connect4 board is 7X7 
      for(var y = 1; y <= 7; y++){
        var emptyCircle = document.createElement("div");
        emptyCircle.className  = "emptyCircle";
        emptyCircle.id = circleNumber;
        circleNumber++;
        
        emptyCircle.onclick = function(){
          myHandler.bind(this)(this.id);
        }
        connect4Board.appendChild(emptyCircle);
      }
      connect4Board.appendChild(document.createElement("br"));
    }   
  }


  function myHandler(number){
    if(positionsArray[number] != 0)
    {
	  return;
    }
    else{
	  var positionToColor = filledPosition(number);
	  var positionToStart = number%7; // this will be the first position on the column so the tile can dropdown from it
	 
	  moveCircle(positionToStart, positionToColor);
	  checkIfOver(positionsArray);
	}
  }
   
  function filledPosition(number){ //finds the position that will be filled, the last empty circle on the column
	number = parseInt(number);
    if(positionsArray[number] == undefined || positionsArray[number] == 1 || positionsArray[number] == 2){
      return number-7;
	}else if(positionsArray[number] == 0){
	  number = number + 7;
      return filledPosition(number);
    }    
  }

  function moveCircle(startPosition, endPosition){ //moves the tile from the starting position to the position that will be filled
	document.getElementById('connect4').style.pointerEvents = 'none';
    if(startPosition >= endPosition){
	  colorCircle(endPosition);
      counterForColor++;       
    }else{
      var temp = document.getElementById(startPosition);
      if(counterForColor%2==0){
        temp.className += " " + player1.color + "Circle";
      
        setTimeout(function() {
         
              temp.className = "emptyCircle";
              return moveCircle(startPosition+7, endPosition)
              }, 350);

      }else{
        temp.className += " " + player2.color + "Circle";
        setTimeout(function() {
              temp.className = "emptyCircle";
              return moveCircle(startPosition+7, endPosition)
              }, 350);
      }
    }
  }


  function colorCircle(position){
    document.getElementById('connect4').style.pointerEvents = 'auto';
    if(counterForColor%2==0 && positionsArray[position]==0){
      document.getElementById(position).className += " " + player1.color + "Circle";
      positionsArray[position] = 1;
    }else if(counterForColor%2!=0 && positionsArray[position]==0){
      document.getElementById(position).className += " " + player2.color + "Circle";
      positionsArray[position] = 2;
    }
    checkIfOver(positionsArray, counterForColor)
  }

  function checkIfOver(array, counter){ // checks to see if the game is over
    var middlePossition = 3; // hard to explain but if the 4 tiles are not on the same column they will surely have at least one tile on the middle row
    var check;
    
    if(counter%2==0){
      check = 1;
    }else{
      check = 2;
    }
    
    var  winner = 0;
    var i = 0;
    for (var x = 0; x <= 6; x++){
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
    for (var x=0; x<=48; x++){ // this part  checks to see if they are on the same column
      if(array[x]==check && array[x-7]==check && array[x-14]==check && array[x-21]==check){
        winner = 1;
      }
      if(array[x]==check && array[x+7]==check && array[x+14]==check && array[x+21]==check){
        winner = 1;
      }
    }
    
    var winningDiv = document.getElementById("winner");
    var winningDivP = document.createElement("p");
    if(counterForColor == 48 && winner == 0){
      var node = document.createTextNode("REMATCH");
      winningDivP.appendChild(node);
      winningDiv.appendChild(winningDivP);
      winningDiv.className = "winner";
      resetButton.className="resetButton";
    }
    if(winner == 1){
      winner = check;
      document.getElementById('connect4').style.pointerEvents = 'none';
    }
    var resetButton = document.getElementById("resetbutton");
    
    resetButton.onclick = function(){
      location.reload();
    }
    
    
    if(winner == 1){
      var node = document.createTextNode(player1.name + " won !!!");
      winningDivP.appendChild(node);
      winningDiv.appendChild(winningDivP);
      winningDiv.className = "winner";
      resetButton.className="resetButton";
    }
    if(winner == 2){
      var node = document.createTextNode(player2.name + " won !!!");
      winningDivP.appendChild(node);
      winningDiv.appendChild(winningDivP);
      winningDiv.className = "winner";
      resetButton.className="resetButton";
    } 
  }
  
  return {// returns the object that contains the generateBoard method so that it can be accessed in the other js file
    generateBoard: generateBoard
  }
}())


