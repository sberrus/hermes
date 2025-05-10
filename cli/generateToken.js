require('dotenv').config();
const jwt = require('jsonwebtoken');
const yargs = require('yargs');

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  console.error('❌ SECRET no definido en .env'); process.exit(1);
}

const argv = yargs
  .option('name', { alias: 'n', type: 'string', demandOption: true, describe: 'Nombre del usuario' })
  .option('expires', { alias: 'e', type: 'string', describe: 'Expiración del token (ej: 1h, 2d)' })
  .help(false).argv;

const payload = { name: argv.name, createdAt: new Date().toISOString() };
const options = argv.expires ? { expiresIn: argv.expires } : {};
try {
  const token = jwt.sign(payload, SECRET, options);
  // 👉 Salida compacta (máx. 5 líneas)
  console.log(`⚠️  Mostrando token JWT, guárdalo de forma segura.`);
  console.log(`🔐 Token: ${token}`);
  console.log(`👤 Usuario: ${payload.name}`);
  console.log(`⏳ Expira: ${argv.expires || 'Sin expiración'}`);
  console.log(`📌 ¡No compartas este token públicamente!`);
} catch (error) {
  if (error.name == "Error") {
    console.error("Ha ocurrido un error al generar el token")
    console.log(error.message);
  }
  else {
    console.error("Ha ocurrido un error inesperado");
  }
}
