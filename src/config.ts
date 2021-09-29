const NODE_ENV: string = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8000;

const config = {
    NODE_ENV: NODE_ENV,
    PORT: PORT
}

export default config;
