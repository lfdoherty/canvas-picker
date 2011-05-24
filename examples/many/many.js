
$(document).ready(function(){

	var jqCanvas = $('#testcanvas');
	var canvas = jqCanvas.get(0);
	var ctx = canvas.getContext('2d');

	//augment the context object with the ability to do pixel-based object picking
	makePickable(canvas, ctx);

	for(var i=0;i<100;++i){
		ctx.object('my rectangle ' + i);
		ctx.fillStyle = 'rgb(' + Math.floor(Math.random()*255) + ', ' + Math.floor(Math.random()*255) + ', 150)';
		var w = 5+(Math.random()*100);
		var h = 5+(Math.random()*100);
		ctx.fillRect(Math.random()*(canvas.width-w), Math.random()*(canvas.height-h), w, h);
	}
		
	jqCanvas.click(function(e){
	
		//here we work out the click position relative to the canvas
		var off = jqCanvas.offset();
		var pos = {x: e.clientX - off.left, y: e.clientY - off.top};
		
		//given the x,y coordinate relative to the canvas, we find the picked object (closest tagged pixel within 'radius')
		var obj = ctx.pickObject(pos.x, pos.y);
		if(obj !== undefined){
			alert('picked ' + obj);
		}
	});
	
});


