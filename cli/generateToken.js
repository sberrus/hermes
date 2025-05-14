const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const yargs = require('yargs');

// Ruta absoluta del archivo .env
const envPath = path.resolve(__dirname, '.env');

// Verificar si el archivo .env existe
if (!fs.existsSync(envPath)) {
  console.error(`❌ Archivo .env no encontrado en: ${envPath}`);
  process.exit(1);
}

// Cargar variables desde .env
dotenv.config({ path: envPath });

// Verificar si JWT_SECRET está definido
const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  console.error(`❌ Variable JWT_SECRET no definida en el archivo .env ubicado en: ${envPath}`);
  process.exit(1);
}

// Procesar argumentos desde CLI
const argv = yargs
  .option('name', { alias: 'n', type: 'string', demandOption: true, describe: 'Nombre del usuario' })
  .option('expires', { alias: 'e', type: 'string', describe: 'Expiración del token (ej: 1h, 2d)' })
  .help(false)
  .argv;

// Crear el payload y opciones del token
const payload = {
  name: argv.name,
  createdAt: new Date().toISOString()
};

const options = argv.expires ? { expiresIn: argv.expires } : {};

try {
  const token = jwt.sign(payload, SECRET, options);

  // 👉 Salida compacta (máx. 5 líneas)
  console.log(`   Mostrando token JWT, guárdalo de forma segura.`);
  console.log(`🔐 Token: ${token}`);
  console.log(`👤 Usuario: ${payload.name}`);
  console.log(`⏳ Expira: ${argv.expires || 'Sin expiración'}`);
  console.log(`📌 ¡No compartas este token públicamente!`);
} catch (error) {
  if (error.name === 'Error') {
    console.error("❌ Ha ocurrido un error al generar el token.");
    console.log(error.message);
  } else {
    console.error("❌ Ha ocurrido un error inesperado.");
    console.error(error);
  }
}

