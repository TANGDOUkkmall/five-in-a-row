var socket=new WebSocket('ws://localhost:8081');

socket.onmessage=function(event){
     
    chessGram.clearCanvas()
    chessGram.draw();
   chessGram.setlist(JSON.parse(event.data))
    chessGram.getlist().forEach(chessGram.drawCircle)
    }