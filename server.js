const express = require( 'express' );
const app = express();
const session = require('express-session');

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use( express.static(__dirname + '/static') );
app.use(session({secret: 'verySecret'}));

//render index
app.get("/", function( request, response ){
    if( !request.session['count'] ){
        request.session['count'] = 1;
    }
    else{
        request.session['count'] +=1;
    }
    response.render( 'index' );
});

//button to count 2
app.get("/byTwo", function( request, response ){
    if( !request.session['count'] ){
        request.session['count'] = 1;
    }
    else{
        request.session['count'] +=2;
    }
    response.redirect( 'counter'); 
});

//render counter
app.get("/counter", function( request, response ){
    // set the name property of session.
    request.session.counter = request.session.count;  
    console.log(request.session.counter);
    //code to add user to db goes here!
    // redirect the user back to the root route. 
    response.render('counter', {'counter' : request.session.counter});
});

app.get('/reset', function( request, response ) {
    request.session['count'] = 1;
    response.redirect('/counter');
})

app.listen(7077, function() {
    console.log("running on port 7077");
});