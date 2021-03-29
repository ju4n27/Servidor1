const express= require('express');
const app= express();
app.listen(3000, ()=> console.log('escuchando el puerto 3000'));
app.use(express.static('Publico'));
app.use(express.json({limit:'1mb'}));

app.post('/api', (pedido,respuesta)=>{
  console.log("Tengo un pedido! :)");
  console.log(pedido.body);
  //respuesta.end();

  const data= pedido.body;
  respuesta.json({
    status: 'EXITOOOOOOOO',
    latitude: data.lat,
    longitude: data.long,
  });
});