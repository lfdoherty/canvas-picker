
$(document).ready(function(){

	var jqCanvas = $('#testcanvas');
	var canvas = jqCanvas.get(0);
	var ctx = canvas.getContext('2d');

	//augment the context object with the ability to do pixel-based object picking
	makePickable(canvas, ctx);

	ctx.object('my red object');//specify the object being drawn
	ctx.fillStyle = 'red';
	ctx.fillRect(50, 50, 100, 100);

	ctx.object('my blue object');//specify the object being drawn
	ctx.fillStyle = 'blue';
	ctx.beginPath();
	ctx.arc(200, 200, 120, 0, Math.PI*2);
	ctx.fill();
	
	//here we specify that no pickable object is being drawn
	//this means that anything we draw will not overwrite our picking data
	//this is useful for transparent overlays
	//it's also faster for drawing internal details of objects since picking data isn't recorded
	ctx.object();
	ctx.fillStyle = 'rgba(0, 255, 0, .3)';
	ctx.beginPath();
	ctx.arc(300, 150, 150, 0, Math.PI*2);
	ctx.fill();
		
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


