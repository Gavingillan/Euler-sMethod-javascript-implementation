const { evaluate, expression, minTransformDependencies } = require('mathjs');
const prompt = require('prompt');
prompt.start();

let scope = {

}
var derivative;
var x;
var y;
var deltaX;
var Iterations;
startApp();

function startApp(){
    prompt.get(['derivative','InitialX','InitialY','DeltaX', 'Ending_X_Value'], function (err, result) {
        if (err) { return onErr(err); }
        derivative = result.derivative;
        x=parseInt(result.InitialX);
        y=parseInt(result.InitialY);
        deltaX=parseFloat(result.DeltaX);
        Iterations = (parseFloat(result.Ending_X_Value)-x)/deltaX;
        main();
        startApp();
    });
}

function main(){
    scope.deltaX = deltaX;

    console.log('point 1: (' + x + ',' + y + ')');

    for(var i=0;i<Iterations;i++){
        scope.x= x;
        scope.y=y;

        scope.slope= evaluate(derivative,scope);

        var newX= scope.x+scope.deltaX
        scope.newX=newX;
        var newY= evaluate(scope.slope*(newX-x)+y,scope)

        deltaY = newY-y;

        x=newX;
        y=newY;
        
        console.log("point " + (i+2) + ": (" + x + ',' + y + ')' + "  deltaY: " + deltaY);
    }
}

