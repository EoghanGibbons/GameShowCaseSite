// ------------------------------------
// Assorted JavaScript utility functions

function isDef(v) 			{ return v !== undefined; }
function isNull(v) 			{ return v === null; }
function isDefAndNotNull(v) { return vl != null; }

// Helper to provides requestAnimationFrame in a cross browser way.
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
if ( !window.requestAnimationFrame ) {
	window.requestAnimationFrame = ( function() {
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
			window.setTimeout( callback, 1000 / 60 );
		};
	} )();
}

// Async Image loader
// from http://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/
function LoadImages(images, sources, callback) {
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources)
		++numImages;
    for (var src in sources) {
        images[src] = new Image();
		// Set up a callback to track how many images have been loaded
        images[src].onload = function(){
            if (++loadedImages >= numImages) {
                callback();
            }
        };
		images[src].onerror = images[src].onload; // Not a terribly sophisticated error handler. :)
		images[src].onabort = images[src].onload; 

        images[src].src = sources[src]; // Trigger the image load
    }
}

// Async loader
function MultiStepLoader(loadSteps, finale)
{
	if (loadSteps.length == 0)
	{
		finale();
		return;
	}
	var startTime = Date.now()
	var stepsCompleted = 0;
	for (var i = 0; i < loadSteps.length; ++i)
	{
		var stepFunc = loadSteps[i][1];
		stepFunc(LoaderInternalCallback, i);
	}
	
	function LoaderInternalCallback(i)
	{
		window.console && window.console.log("Load step completed: " + loadSteps[i][0] + " in " + (Date.now() - startTime).toString() + " ms" );
		++stepsCompleted;
		if (stepsCompleted >= loadSteps.length)
		{
			finale();
		}
	}	
}

// http://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas/6551032#6551032
function GetRelativePosition(target, x,y) {
	//this section is from http://www.quirksmode.org/js/events_properties.html
	// jQuery normalizes the pageX and pageY
	// pageX,Y are the mouse positions relative to the document
	// offset() returns the position of the element relative to the document
	var offset = $(target).offset();
	var x = x - offset.left;
	var y = y - offset.top;

	return {"x": x, "y": y};
}

