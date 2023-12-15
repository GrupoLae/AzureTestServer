const express = require('express');
const app = express();
const port = 3005;
const puppeteer = require('puppeteer');
// Configurar EJS como el motor de plantillas
app.set('view engine', 'ejs');

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta para renderizar la plantilla
app.get('/', (req, res) => {

    const datos = {
        titulo: 'Mi Página EJS',
        mensaje: '¡Bienvenido a mi página con datos, TONTO EL QUE LO LEA!',
        nombre: 'PAKITO'
    };

    // Renderiza la plantilla 'index' y pasa los datos como un objeto
    res.render('index', datos);
});
app.get('/generate-pdf', async (req, res) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // Renderiza la página EJS y espera a que se cargue completamente
    await page.goto('http://localhost:3005', { waitUntil: 'networkidle2' });
  
    // Genera el PDF
    const pdf = await page.pdf({ format: 'A4' });
  
    await browser.close();
  
    // Envía el PDF como respuesta
    res.contentType('application/pdf');
    res.send(pdf);
});
  

app.listen(port, () => {
  console.log(`La API está escuchando en el puerto ${port}`);
});