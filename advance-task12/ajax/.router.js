function setRouter(app){ 
 var router = app; 

app.get('/loadMore',function(req,res){
    var curIdx=req.query.index
    var len=req.query.length
    var data=[]

    for(var i=0;i<len;i++){
        data.push('内容'+(parseInt(curIdx)+i))
    }
    res.send(data)
})}
 module.exports.setRouter = setRouter