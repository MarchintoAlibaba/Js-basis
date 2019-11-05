var date = new Date();
	var dateTime = date.getTime();
	for(var i = 0; i < 1000000000; i ++);
	var date1 = new Date();
	console.log(date1.getTime() - dateTime);