const express= require('express');
const Datastore= require('nedb');

const app= express();
app.listen(3000, ()=> console.log('****Escuchando el puerto 3000 ****'));
app.use(express.static('Publico'));
app.use(express.json({limit:'1mb'}));

const DB= new Datastore('DB1.db');
DB.loadDatabase();

app.post('/api', (pedido,respuesta) => {
  console.log("****Pedido! ****");
  const data= pedido.body;
  const tiempo= Date.now();
  data.tiempo= tiempo;

  console.log(data);
  DB.insert(data);
  
  respuesta.json({
    status: '**EXITO!**',
    latitude: data.lat,
    longitude: data.long,
  });
});

app.get('/api', (pedido,respuesta)=> {
  DB.find({}, (err,data)=>{
    if(err){
      respuesta.end();
      return;
    }
    respuesta.json(data);
  });
});