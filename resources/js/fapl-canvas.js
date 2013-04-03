

// -------------------------------------------------------------------------------------
// FAPL CANVAS TOOLS
// this is use for drawing event 
// -------------------------------------------------------------------------------------
if ((typeof FaplCanvasTools) === 'undefined') {
	FaplCanvasTools = {};
};

// -------------------------------------------------------------------------------------
// FaplCanvasTools.pencil 
// this is use for usual pen writing procedure 
// -------------------------------------------------------------------------------------
FaplCanvasTools.pencil = function(){
	var tool = this;
    this.started = false;
    // This is called when you start holding down the mouse button.
    // This starts the pencil drawing.
    this.mousedown = function (ev) {
    	FaplCanvas.CACHE.context.beginPath();
        FaplCanvas.CACHE.context.moveTo(ev._x, ev._y);
        tool.started = true;
    };


     // This function is called every time you move the mouse. Obviously, it only 
    // draws if the tool.started state is set to true (when you are holding down 
    // the mouse button).
    this.mousemove = function (ev) {
      if (tool.started) {
        FaplCanvas.CACHE.context.lineTo(ev._x, ev._y);
        FaplCanvas.CACHE.context.stroke();
      }
    };


    // This is called when you release the mouse button.
    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        FaplCanvas.paintImage();
      }
    };


};


// -------------------------------------------------------------------------------------
// FaplCanvasTools.erase 
// this is use for erasing tools
// -------------------------------------------------------------------------------------
FaplCanvasTools.erase = function(){

	var tool = this;
    this.started = false;
    // This is called when you start holding down the mouse button.
    // This starts the pencil drawing.
    this.mousedown = function (ev) {
    	
    	FaplCanvas.CACHE.contexto.globalCompositeOperation = "destination-out";
		FaplCanvas.CACHE.contexto.strokeStyle = "rgba(0,0,0,100.0)";
		FaplCanvas.CACHE.contexto.lineWidth = 10;

    	FaplCanvas.CACHE.contexto.beginPath();
        FaplCanvas.CACHE.contexto.moveTo(ev._x, ev._y);
        tool.started = true;
    };


     // This function is called every time you move the mouse. Obviously, it only 
    // draws if the tool.started state is set to true (when you are holding down 
    // the mouse button).
    this.mousemove = function (ev) {
      if (tool.started) {
      	FaplCanvas.CACHE.contexto.lineTo(ev._x, ev._y);
        FaplCanvas.CACHE.contexto.stroke();
      }
    };


    // This is called when you release the mouse button.
    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
      }
    };
};

// -------------------------------------------------------------------------------------
// FaplCanvasTools.circle
// this is use for drawing circle
// -------------------------------------------------------------------------------------
FaplCanvasTools.circle = function(){
	var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }

      var x = Math.min(ev._x,  tool.x0),
          y = Math.min(ev._y,  tool.y0),
          r = Math.abs(ev._x - tool.x0);

      FaplCanvas.CACHE.context.clearRect(0, 0, FaplCanvas.CACHE.canvas.width, FaplCanvas.CACHE.canvas.height);
     
      if (!r) {
        return;
      }

	   FaplCanvas.CACHE.context.beginPath();
	   FaplCanvas.CACHE.context.arc(x,y,r,0,2*Math.PI);
	   FaplCanvas.CACHE.context.stroke();
	   
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        FaplCanvas.paintImage();
      }
    };

};

// -------------------------------------------------------------------------------------
// FaplCanvasTools.oval
// this is use for drawing oval
// -------------------------------------------------------------------------------------
FaplCanvasTools.oval = function(){
	var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }

      var x = Math.min(ev._x,  tool.x0),
          y = Math.min(ev._y,  tool.y0),
          r = Math.abs(ev._x - tool.x0);

      FaplCanvas.CACHE.context.clearRect(0, 0, FaplCanvas.CACHE.canvas.width, FaplCanvas.CACHE.canvas.height);
     
      if (!r) {
        return;
      }
	  // save state
      FaplCanvas.CACHE.context.save();
	  
	  // translate context
    //  FaplCanvas.CACHE.context.translate(FaplCanvas.CACHE.canvas.width / 2, FaplCanvas.CACHE.canvas.height / 2);

      // scale context horizontally
      FaplCanvas.CACHE.context.scale(2, 1);

      // draw circle which will be stretched into an oval
      FaplCanvas.CACHE.context.beginPath();
      FaplCanvas.CACHE.context.arc(x, y, r, 0, 2 * Math.PI, false);
  
   // restore to original state
      FaplCanvas.CACHE.context.restore();
	  
      FaplCanvas.CACHE.context.stroke();  
	  
	};

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        FaplCanvas.paintImage();
      }
    };

};

// -------------------------------------------------------------------------------------
// FaplCanvasTools.line 
// this is use for drawing straight line
// -------------------------------------------------------------------------------------
FaplCanvasTools.line = function(){
	var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }

      FaplCanvas.CACHE.context.clearRect(0, 0, FaplCanvas.CACHE.canvas.width, FaplCanvas.CACHE.canvas.height);

      FaplCanvas.CACHE.context.beginPath();
      FaplCanvas.CACHE.context.moveTo(tool.x0, tool.y0);
      FaplCanvas.CACHE.context.lineTo(ev._x,   ev._y);
      FaplCanvas.CACHE.context.stroke();
      FaplCanvas.CACHE.context.closePath();
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        FaplCanvas.paintImage();
      }
    };
};



// -------------------------------------------------------------------------------------
// FaplCanvasTools.rectangle 
// this is use for drawing straight rectangle
// -------------------------------------------------------------------------------------
FaplCanvasTools.rectangle = function(){
	var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }

      var x = Math.min(ev._x,  tool.x0),
          y = Math.min(ev._y,  tool.y0),
          w = Math.abs(ev._x - tool.x0),
          h = Math.abs(ev._y - tool.y0);

      FaplCanvas.CACHE.context.clearRect(0, 0, FaplCanvas.CACHE.canvas.width, FaplCanvas.CACHE.canvas.height);

      if (!w || !h) {
        return;
      }

      FaplCanvas.CACHE.context.strokeRect(x, y, w, h);
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        FaplCanvas.paintImage();
      }
    };

};

// -------------------------------------------------------------------------------------
// FaplCanvasTools.arrow 
// this is use for drawing  arrow line
// -------------------------------------------------------------------------------------
FaplCanvasTools.arrow = function(){
	var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }

      FaplCanvas.CACHE.context.clearRect(0, 0, FaplCanvas.CACHE.canvas.width, FaplCanvas.CACHE.canvas.height);

      FaplCanvas.CACHE.context.beginPath();
      FaplCanvas.CACHE.context.moveTo(tool.x0, tool.y0);
      FaplCanvas.CACHE.context.lineTo(ev._x,   ev._y);
      
      // need to calculate the arch
      var arrowHeadLength = 12;
      var lineAngle = Math.atan ( (ev._y-tool.y0)/(ev._x-tool.x0) );
      
      var end1 = lineAngle + 45 * Math.PI/180;
	  var end2 = lineAngle - 45 * Math.PI/180;
	  
	  var y3 = 0;
	  var x3 = 0;

      var y4 = 0;
      var x4 = 0;

      if((ev._x-tool.x0) < 0 ){
      	y3 = ev._y + arrowHeadLength * Math.sin(end1);
      	x3 = ev._x + arrowHeadLength * Math.cos(end1);
		y4 = ev._y + arrowHeadLength * Math.sin(end2);
		x4 = ev._x + arrowHeadLength * Math.cos(end2);
	  } else{
		y3 = ev._y - arrowHeadLength * Math.sin(end1);
		x3 = ev._x - arrowHeadLength * Math.cos(end1);
		y4 = ev._y - arrowHeadLength * Math.sin(end2);
		x4 = ev._x - arrowHeadLength * Math.cos(end2);
	  }

      FaplCanvas.CACHE.context.lineTo(x3,   y3);
      FaplCanvas.CACHE.context.lineTo(x4,   y4);
      FaplCanvas.CACHE.context.lineTo(ev._x,   ev._y);
      

	  FaplCanvas.CACHE.context.stroke();
      FaplCanvas.CACHE.context.closePath();
    };

    this.mouseup = function (ev) {
      if (tool.started) {
      
        tool.mousemove(ev);
        tool.started = false;
        FaplCanvas.paintImage();
      }
    };

};

// -------------------------------------------------------------------------------------
// FaplCanvasTools.font 
// this is use for font related matter
// -------------------------------------------------------------------------------------
FaplCanvasTools.font = function(){
  var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
      // get the selected font by coordinate??
      var fontEl = $('<a/>',{
              class : '.font-draggable',
              text : 'Enter Text',
              href : 'javascript:void(0)',
              style : 'position:absolute;',

            });
      $(fontEl).css('top',ev._y);
      $(fontEl).css('left',ev._x);
      $(fontEl).attr('data-original-title','Enter comments');
      

      $('#font-container').append(fontEl);
     
      $(fontEl).draggable({ containment: "#canvas-container" });
      $(fontEl).editable({
            send: 'never',
            type: 'text', // text|textarea|select|date|checklist
            inputclass : 'input-xlarge',
            placement :'right',
            success: function(response, newValue) {
              if(newValue === '')
                $(this).remove();
            }

          });
      
      //ev.stopPropagation();
      //$(fontEl).editable('toggle');
    };

};




// -------------------------------------------------------------------------------------
// FAPL CANVAS - Initial declaration
// -------------------------------------------------------------------------------------

if ((typeof FaplCanvas) === 'undefined') {
  FaplCanvas = {
  	TOOLS_TYPE : {
  		ERASE : 'erase',
  		PENCIL : 'pencil',
  		LINE : 'line',
  		CIRCLE : 'circle',
		OVAL : 'oval',
  		RECTANGLE : 'rectangle',
  		ARROW : 'arrow',
		FONT : 'font',
  	}
  };
};



// -------------------------------------------------------------------------------------
// Used to define what is the current selected tools
// -------------------------------------------------------------------------------------
FaplCanvas.SELECTED_TOOL = {
  toolType : FaplCanvas.TOOLS_TYPE.PENCIL,
	tool : new FaplCanvasTools['pencil'](),
	color : '#000000'
};


// -------------------------------------------------------------------------------------
// Used to define what is the current selected tools
// -------------------------------------------------------------------------------------
FaplCanvas.CACHE = {
	canvas : {}, // for temp canvas
	context : {}, // for temp context
	canvaso : {}, // original canvas
	contexto : {}, // original context
  //drawStep : -1, // for every stroke or action done by use.
  undoImages : [], // keep the steps of user drawn images
  redoImages : [] // keep the steps of user drawn images
};


// -------------------------------------------------------------------------------------
// Initialisation. code start from here
// -------------------------------------------------------------------------------------
FaplCanvas.init = function(canvasId){

	FaplCanvas.CACHE.canvaso = document.getElementById(canvasId);
	FaplCanvas.CACHE.contexto = FaplCanvas.CACHE.canvaso.getContext('2d');

	var container = FaplCanvas.CACHE.canvaso.parentNode;//FaplCanvas.CACHE.canvaso.parent();
    FaplCanvas.CACHE.canvas = document.createElement('canvas');

    FaplCanvas.CACHE.canvas.id     = 'canvasTemp';
    FaplCanvas.CACHE.canvas.width  = FaplCanvas.CACHE.canvaso.width;
    FaplCanvas.CACHE.canvas.height = FaplCanvas.CACHE.canvaso.height;
    container.appendChild(FaplCanvas.CACHE.canvas);

    FaplCanvas.CACHE.context = FaplCanvas.CACHE.canvas.getContext('2d');

    FaplCanvas.CACHE.canvas.addEventListener('mousedown', FaplCanvas.eventMouseAction, false);
    FaplCanvas.CACHE.canvas.addEventListener('mousemove', FaplCanvas.eventMouseAction, false);
    FaplCanvas.CACHE.canvas.addEventListener('mouseup',   FaplCanvas.eventMouseAction, false);

    
};


// -------------------------------------------------------------------------------------
// Shorthand method to set the tool for canvas
// -------------------------------------------------------------------------------------
FaplCanvas.setTool = function(tool){
	FaplCanvas.SELECTED_TOOL.tool = new FaplCanvasTools[tool]();
  FaplCanvas.SELECTED_TOOL.toolType = tool;
};


// -------------------------------------------------------------------------------------
// private function to handle the mouse event. do not call from out side of this class
// -------------------------------------------------------------------------------------
FaplCanvas.eventMouseAction = function(ev){
	//console.log('event mouse action');
	//console.log(ev.type);
  FaplCanvas.pushUndo(ev);
	if (ev.layerX || ev.layerX == 0) { // Firefox
      ev._x = ev.layerX;
      ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      ev._x = ev.offsetX;
      ev._y = ev.offsetY;
    }
    // Call the event handler of the tool.
    var func = FaplCanvas.SELECTED_TOOL.tool[ev.type];
    if (func) {
      func(ev);
    }

};

// -------------------------------------------------------------------------------------
// used to draw the image to actual canvas.
// -------------------------------------------------------------------------------------
FaplCanvas.paintImage = function(){
  
  FaplCanvas.CACHE.contexto.globalCompositeOperation = 'source-over';
  FaplCanvas.CACHE.contexto.strokeStyle = '#000000';
  FaplCanvas.CACHE.contexto.lineWidth = 1;

	FaplCanvas.CACHE.contexto.drawImage(FaplCanvas.CACHE.canvas, 0, 0);
	FaplCanvas.CACHE.context.clearRect(0, 0, FaplCanvas.CACHE.canvas.width, FaplCanvas.CACHE.canvas.height);
};



// -------------------------------------------------------------------------------------
// Preparation to store the previous drawn step by user
// -------------------------------------------------------------------------------------
FaplCanvas.pushUndo = function(ev){
  if(FaplCanvas.isValidMovement(ev)){
    FaplCanvas.CACHE.redoImages = [];
    FaplCanvas.CACHE.undoImages.push(FaplCanvas.CACHE.canvaso.toDataURL());
	FaplCanvas.undoRedoListener()
  }
};
		

// -------------------------------------------------------------------------------------
// Undo functionality
// -------------------------------------------------------------------------------------
FaplCanvas.undoStep = function(){
  var imageData = FaplCanvas.CACHE.undoImages.pop();
  if(!(typeof imageData === 'undefined')){
    // need to work on redo
    FaplCanvas.CACHE.redoImages.push(FaplCanvas.CACHE.canvaso.toDataURL());
    FaplCanvas.loadImage(imageData);
	FaplCanvas.undoRedoListener();
  }
};

// -------------------------------------------------------------------------------------
// Redo Functionality
// -------------------------------------------------------------------------------------
FaplCanvas.redoStep = function(){
  var imageData = FaplCanvas.CACHE.redoImages.pop();
  if(!(typeof imageData === 'undefined')){
    FaplCanvas.CACHE.undoImages.push(FaplCanvas.CACHE.canvaso.toDataURL());
	FaplCanvas.loadImage(imageData);
    FaplCanvas.undoRedoListener();
  }
  
};


// -------------------------------------------------------------------------------------
// Load the image to canvas
// -------------------------------------------------------------------------------------
FaplCanvas.loadImage = function(imageData){
//  console.log(imageData);
  $("<img/>").load(function(e) {
    FaplCanvas.CACHE.contexto.clearRect(0, 0, FaplCanvas.CACHE.canvaso.width, FaplCanvas.CACHE.canvaso.height);
    FaplCanvas.CACHE.contexto.drawImage(this, 0, 0);
  }).attr("src",imageData);
  
};


// -------------------------------------------------------------------------------------
// To check for valid movement to undo ro redo store
// -------------------------------------------------------------------------------------
FaplCanvas.isValidMovement = function(ev){
  
  if('mousedown' == ev.type){
    return (FaplCanvas.SELECTED_TOOL.toolType == FaplCanvas.TOOLS_TYPE.ERASE);
  }else if ('mouseup' == ev.type){
    return (! ((FaplCanvas.SELECTED_TOOL.toolType == FaplCanvas.TOOLS_TYPE.ERASE) || (FaplCanvas.SELECTED_TOOL.toolType == FaplCanvas.TOOLS_TYPE.FONT)));
  }

  return false;
};


FaplCanvas.undoRedoListener = function(){
	FaplCanvas.undoListener();
    FaplCanvas.redoListener();
}

FaplCanvas.clearCanvas = function(){
	FaplCanvas.CACHE.contexto.clearRect(0,0,FaplCanvas.CACHE.canvaso.width, FaplCanvas.CACHE.canvaso.height);
	FaplCanvas.CACHE.context.clearRect(0,0,FaplCanvas.CACHE.canvas.width, FaplCanvas.CACHE.canvas.height);
}

