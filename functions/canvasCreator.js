
export function canvasCreator() {
    var canvas = document.createElement("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    var context = canvas.getContext("2d");
    return context;
}
