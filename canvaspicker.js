
var makePickable;

(function(){

function foreach(obj, cb){
	for(var key in obj){
		cb(key);
	}
}

makePickable = function(canvas, ctx){

	var hc;
	var hcById = {};

	//proxy all canvas functions so that they get called on both the original and hidden canvases
	var str = '';
	foreach(ctx, function(key){
		if(typeof(ctx[key]) === 'function'){
			str += key + ' ';
			
			if(key === 'putImageData') return;
			
			var oldFunction = ctx[key];
			ctx[key] = function(){

				if(hc !== undefined){
					var args = arguments;
					foreach(hcById, function(id){
						var ahc = hcById[id];
						oldFunction.apply(ahc, args);
					});
				}
				oldFunction.apply(ctx, arguments);
			}
		}
	});
	
	ctx.object = function(id){
		if(id === undefined){
			hc = undefined;
			return;
		}
		
		if(hcById[id] === undefined){
			
			var hiddenCanvas = document.createElement('canvas');
			hiddenCanvas.width = canvas.width;
			hiddenCanvas.height = canvas.height;
			hc = hiddenCanvas.getContext('2d');
			hcById[id] = hc;
		}

		hc = hcById[id];

		hc.fillStyle = hc.strokeStyle = 'rgb(255,255,255)';
		
		foreach(hcById, function(otherId){
			var wrongHc = hcById[otherId];
			if(wrongHc !== hc){
				wrongHc.fillStyle = wrongHc.strokeStyle = 'rgb(0,0,0)';
			}
		});
	}
	
	ctx.pickObject = function(kx,ky){
		
		var foundList = [];
		foreach(hcById, function(id){
		
			var hc = hcById[id];
		
			var imageData = hc.getImageData(kx, ky, 1, 1);
			data = imageData.data;
			
			var r = data[0];
			if(r !== 0){
				foundList.push(id);
				return;
			}
		});
		
		if(foundList.length > 0) return foundList[0];
	}
}

})();

