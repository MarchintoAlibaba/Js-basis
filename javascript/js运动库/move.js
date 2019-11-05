	function startMove(dom,Arr,callback){
		var timer;
		timer = setInterval(function(){
			for(prop in Arr){
				var bStop = true;
				if(prop == 'opacity'){
					var speed =(Arr[prop] - parseFloat(getStyle(dom,prop))) * 100 / 8,
						moreIcor = speed > 0? Math.ceil(speed) : Math.floor(speed);
					dom.style[prop] = parseFloat(getStyle(dom,prop)) + moreIcor / 100;
				}else{
					var speed = (Arr[prop] - parseInt(getStyle(dom,prop))) / 8,
						moreIcor = speed > 0? Math.ceil(speed) : Math.floor(speed);
					dom.style[prop] = parseInt(getStyle(dom,prop)) + moreIcor + 'px';
				}
				if(parseFloat(getStyle(dom,prop)) != Arr[prop]){
					bStop = false;
				}
			}
			if(bStop){
				clearInterval(timer);
				callback ? callback() : '';
			}
		},30)
	}
	function getStyle(dom,attr){
		if(getComputedStyle(dom,false)){
			return getComputedStyle(dom,false)[attr];
		}else if(dom.currentStyle){
			return dom.currentStyle[attr]
		}
	}