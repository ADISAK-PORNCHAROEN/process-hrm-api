import app from './src/app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
    console.log(`📝 Available endpoints:`);
    console.log(`   GET  http://localhost:${port}/api/v1/users`);
});