// Lista de urls permitidas
const allowedOrigins = [
    'https://mi-app.com',
]

// Configuración cors exclusión de origenes no permitidos
export const corsOptions = {
    origin: (origin: string | undefined, callback: Function) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    },
}