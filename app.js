var chessGram=(function(){
   
    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext('2d');
    var list=[];
    var chessWidth=30
    var size=15
      function draw(){
        for(var i=1;i<size+1;i++){
            ctx.beginPath();
            ctx.moveTo(chessWidth,i*chessWidth)
            ctx.lineTo(chessWidth*size, i*chessWidth);
            ctx.stroke()
            
           }
           for(var i=1;i<size+1;i++){
            ctx.beginPath();
            ctx.moveTo(i*chessWidth,chessWidth)
            ctx.lineTo(i*chessWidth,chessWidth*size);
            ctx.stroke()
            
           }
      }
      function drawCircle(item){
        ctx.beginPath();
        ctx.arc(item.x,item.y,chessWidth/2,0,2*Math.PI,false);
        ctx.fillStyle=item.color;
        ctx.fill();
      }
    
    function clearCanvas(){
        ctx.clearRect(chessWidth/2, chessWidth/2, 480, 480);
    }
  function setlist(data){
list=data
  }
  function getlist(){
      return list
  }
  function isChess(chessInfo){
      return list.filter(item=>{
          return item.x===chessInfo.x && item.y===chessInfo.y
      }).length>0;
  }

  function chesswin(chessInfo){
      var wincase=[]
      for(var k=0;k<4;k++){
        wincase[k]=wincase[k] || []  
        for(var j=0;j<5;j++){
            wincase[k][j]=wincase[k][j] || []
           for(var i=-j;i<5-j;i++){
          if(k===0){
                  wincase[k][j].push({
                      x:chessInfo.x-i * chessWidth,
                      y:chessInfo.y,
                      color:chessInfo.color
                  })
               }
         if(k===1){
      wincase[k][j].push({
          x:chessInfo.x,
          y:chessInfo.y-i * chessWidth,
          color:chessInfo.color
      })
    }
    if(k===2){
        wincase[k][j].push({
            x:chessInfo.x-i * chessWidth,
            y:chessInfo.y-i * chessWidth,
            color:chessInfo.color
        })
      }
      if(k===3){
        wincase[k][j].push({
            x:chessInfo.x+i * chessWidth,
            y:chessInfo.y-i * chessWidth,
            color:chessInfo.color
        })
      }
  }   
  }
}
  
  var a=wincase.some(winPosition=>{
        return winPosition.some(winlist=>{
            return winlist.every(item=>{
                return list.filter(chess=>{
                    return item.x===chess.x && item.y===chess.y && item.color===chess.color
                }).length>0
            })   
        })
    })
    console.log(chessInfo)
      console.log(a)
      if(a){
          alert(`恭喜${chessInfo.color==='white'?'白棋':'红棋'}赢了`)

      }
  }
  
    draw();
    canvas.addEventListener('click',function(e){
        if(e.clientY<=chessWidth/2 || e.clientY>=chessWidth*size+chessWidth/2 || e.clientX>=chessWidth*size+chessWidth/2 ||  e.clientX<=chessWidth/2){
            return
        }
    //  console.log(e)
    var chessInfo={  x:Math.round(e.clientX/chessWidth)*chessWidth,
        y:Math.round(e.clientY/chessWidth)*chessWidth,
        color:list.length%2!==0?"darkred":"white"}
        if(isChess(chessInfo)){
         return    
        }
     list.push(chessInfo)
     // console.log(Math.round(e.clientX/(500/15)*500/15))
     // console.log(Math.round(e.clientY/(500/15)*500/15))
    socket.send(JSON.stringify(list))
    drawCircle({
        x:Math.round(e.clientX/chessWidth)*chessWidth,
        y:Math.round(e.clientY/chessWidth)*chessWidth,
        color:list.length%2!==0?"white":"darkred"
    })
    chesswin(chessInfo)
    })
     
    document.getElementById('back').addEventListener('click',function(){
     list.pop();
     socket.send(JSON.stringify(list))
    clearCanvas()
    draw()
    list.forEach(
       drawCircle)  
    })
    return{
      draw:draw,
      drawCircle:drawCircle,
      clearCanvas:clearCanvas,
      setlist,
      getlist
    }
    
    // ctx.beginPath();
    // ctx.arc(500/15*5,500/15*5,(500/15)/2,0,2*Math.PI,false);
    // ctx.fillStyle='darkgreen';
    // ctx.fill();            
    
})()
