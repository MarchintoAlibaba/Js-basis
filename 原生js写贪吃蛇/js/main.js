(function(){
	var startBtn = document.getElementsByClassName('startBtn')[0],
 	beginGame = document.getElementsByClassName('beginGame')[0],
 	content = document.getElementsByClassName('content')[0],
 	startPause = document.getElementsByClassName('startPause')[0],
 	dataScore = document.getElementsByClassName('dataScore')[0];
startBtn.addEventListener('click',init,false);
function init(){
	beginGame.style.display = 'none';
	var foodW = 20,
		foodH = 20,
		food,
		snakeHeader = [[0,0,'body'],[1,0,'body'],[2,0,'header']],
		snakeArr = [],
		snakeHeaderLength = snakeHeader.length,
		startTimer,
		status = true,
		score = '0',
		startTimerStatus = true,
		startDirection = 39,
		turnStatus = 'right';
	createFood() //生产贪吃蛇的食物
	createSnake() //贪吃蛇
	snakeMove() //贪吃蛇运动
	function createFood(){
		food = document.createElement('div');
		food.style.position = 'absolute';
		food.style.width = foodW + 'px';
		food.style.height = foodH + 'px';
		food.style.background = 'red';
		food.style.borderRadius = '50%';
		var positionTop = Math.floor(Math.random() * (parseInt(getComputedStyle(content,null).width) / foodH)) * foodH,
			positionLeft = Math.floor(Math.random() * (parseInt(getComputedStyle(content,null).height) / foodW)) * foodW;
		food.style.top = positionTop + 'px';
		food.style.left = positionLeft + 'px';
		content.appendChild(food);
	}
	function createSnake(){
		// var snakeInside = snakeHeader[0].length;
		
		for(var i = 0; i < snakeHeaderLength; i ++){
			snakeArr.push(document.createElement('div'));
			snakeArr[i].style.position = 'absolute';
			snakeArr[i].style.width = foodW + 'px';
			snakeArr[i].style.height = foodH + 'px';
			snakeArr[i].className = snakeHeader[i][2];
			snakeArr[i].style.top = snakeHeader[i][1] * foodH + 'px';
			snakeArr[i].style.left = snakeHeader[i][0] * foodW + 'px';
			content.appendChild(snakeArr[i]);
		}
	}
	function snakeMove(num){
		if(status){
			startTimer = setInterval(function(){
				for(var i = 0; i < snakeHeaderLength; i ++){
					if(i == snakeHeaderLength - 1){
						snakeHeader[i][0] ++;
					}else{
						snakeHeader[i][0] = snakeHeader[i + 1][0];
						snakeHeader[i][1] = snakeHeader[i + 1][1];
					}
				}	
				eatFood(startDirection);
				loseGame();
				createSnake();
			},200)
			status = false;
			startDirection = 39;
		}else{
			if(event.keyCode == 38 && turnStatus !== 'up' && turnStatus !== 'down' || num == 38){ //上
				clearInterval(startTimer);
				startTimer = setInterval(function(){
					for(var i = 0; i < snakeHeaderLength; i ++){
						if(i == snakeHeaderLength - 1){
							snakeHeader[i][1] --;
						}else{
							snakeHeader[i][0] = snakeHeader[i + 1][0];
							snakeHeader[i][1] = snakeHeader[i + 1][1];
						}
					}
					eatFood(startDirection);
					loseGame();	
					createSnake();
				},200)
				turnStatus = 'up';
				startDirection = 38;
			}else if(event.keyCode == 39 && turnStatus !== 'right' && turnStatus !== 'left' || num == 39){ //right
				clearInterval(startTimer);
				startTimer = setInterval(function(){
					for(var i = 0; i < snakeHeaderLength; i ++){
						if(i == snakeHeaderLength - 1){
							snakeHeader[i][0] ++;
						}else{
							snakeHeader[i][0] = snakeHeader[i + 1][0];
							snakeHeader[i][1] = snakeHeader[i + 1][1];
						}
					}	
					eatFood(startDirection);
					loseGame();
					createSnake();
				},200)
				turnStatus = 'right';
				startDirection = 39;
			}else if(event.keyCode == 40 && turnStatus !== 'down' && turnStatus !== 'up' || num == 40){ //down
				clearInterval(startTimer);
				startTimer = setInterval(function(){
					for(var i = 0; i < snakeHeaderLength; i ++){
						if(i == snakeHeaderLength - 1){
							snakeHeader[i][1] ++;
						}else{
							snakeHeader[i][0] = snakeHeader[i + 1][0];
							snakeHeader[i][1] = snakeHeader[i + 1][1];
						}
					}	
					eatFood(startDirection);
					loseGame();
					createSnake();
				},200)
				turnStatus = 'down';
				startDirection = 40;
			}else if(event.keyCode == 37 && turnStatus !== 'left' && turnStatus !== 'right' || num == 37){ //left
				clearInterval(startTimer);
				startTimer = setInterval(function(){
					for(var i = 0; i < snakeHeaderLength; i ++){
						if(i == snakeHeaderLength - 1){
							snakeHeader[i][0] --;
						}else{
							snakeHeader[i][0] = snakeHeader[i + 1][0];
							snakeHeader[i][1] = snakeHeader[i + 1][1];
						}
					}
					eatFood(startDirection);	
					loseGame();
					createSnake();
				},200)
				turnStatus = 'left';
				startDirection = 37;
			}
		}
	}
	onkeydown = function(e){ // trun direction
		var event = e || window.event;
		snakeMove();
	}
	function eatFood(direction){ //eat food
		var header = document.getElementsByClassName('header')[0],

		    headerLeft = getComputedStyle(header,null).left,
		 	headerTop = getComputedStyle(header,null).top,
		 	foodLeft = getComputedStyle(food,null).left,
		 	foodTop = getComputedStyle(food,null).top;
		if(headerLeft == foodLeft && headerTop == foodTop){
			if(direction == 39){
				snakeHeader.unshift([snakeHeader[0][0] - 1,snakeHeader[0][1],snakeHeader[0][2]]);
			}else if(direction == 40){
				snakeHeader.unshift([snakeHeader[0][0],snakeHeader[0][1] - 1,snakeHeader[0][2]]);
			}else if(direction == 37){
				snakeHeader.unshift([snakeHeader[0][0] + 1,snakeHeader[0][1],snakeHeader[0][2]]);
			}else if(direction == 38){
				snakeHeader.unshift([snakeHeader[0][0],snakeHeader[0][1] + 1,snakeHeader[0][2]]);
			}

			snakeHeaderLength = snakeHeader.length;
			createSnake();
			food.parentNode.removeChild(food);
			createFood();
			// console.log(snakeHeader);
			score ++;
			dataScore.innerText = score;
		}
		
	}
	function loseGame(){ //lose game
		if(startTimer){
			var header = document.getElementsByClassName('header')[0],
				headerLeft = parseInt(getComputedStyle(header,null).left),
			 	headerTop = parseInt(getComputedStyle(header,null).top);
			 	snakeHeaderLength = snakeHeader.length;
			 	for(var i = 0; i < snakeHeaderLength -1; i ++){
			 		if(snakeHeader[snakeHeaderLength -1][0] == snakeHeader[i][0] && snakeHeader[snakeHeaderLength -1][1] == snakeHeader[i][1]){
			 			window.location.reload();
				 		clearInterval(startTimer);
				 		alert('game over');
			 		}
			 	}

			 	if(headerLeft < 0 || headerTop <0 || headerLeft > 420 || headerTop > 420){
			 		window.location.reload();
			 		clearInterval(startTimer);
			 		alert('game over');
			 	}
		}
	}
	startPause.onclick = function(){
		if(startTimerStatus){
			clearInterval(startTimer);
			onkeydown = null;
			startTimerStatus = false;
		}else{
			snakeMove(startDirection);
			console.log(startDirection)
			onkeydown = function(e){ // trun direction
				var event = e || window.event;
				snakeMove();
			}
			startTimerStatus = true;
		}
		
	}
}

}())