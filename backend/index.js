let app = require('./src/app');
const { PORT } = require('./src/config');
const { connect } = require('./src/database');

app.set('port', PORT);


async function main(){

   //Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
//Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
//Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
//Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
 //Database connection
    await connect();
   //Express application
   await app.listen(app.get('port'));
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`:D :)`);
   console.log(`Server on port ${app.get('port')}: connected! :D :)`)
};

main();

module.exports = { main, app };
