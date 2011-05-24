
canvas-picker is a very simple library that adds pixel-perfect object picking to the 2D context of the HTML5 canvas.

## Usage

**Setup:**

	var canvas = document.getElementById('testcanvas');
	var ctx = canvas.getContext('2d');
	makePickable(canvas, ctx);//<-- this is the only line using canvas-picker adds to the usual canvas setup procedure


**Specify the object being drawn:**

	ctx.object('my red object');//specify the object being drawn (this should be a string)
	ctx.fillStyle = 'red';
	ctx.fillRect(50, 50, 100, 100);

**Do picking:  (e.g. after some mouse event)**

	var obj = ctx.pickObject(x, y);//x and y must be relative to the canvas element's position

That's it!  The examples folder has full examples of using the library (with jQuery.)

## Notes

If you set your fill or stroke style to a transparent color, the result will still be pickable (even though it's invisible.)  In other words this library cannot handle transparency.

Every different object you create requires a hidden canvas object to be created and drawn to.  This means that large numbers of objects (more than ~1000) will use a *lot* of RAM and make your draw calls *much* slower.  If you need high performance (especially animation) you need to create your own custom solution.



Tested on Firefox 4 and Chrome 11.
