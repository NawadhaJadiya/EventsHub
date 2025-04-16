import mongoose from 'mongoose';

let isConnected = false;

export async function connect() {
    if (isConnected) {
        console.log('Already connected to MongoDB');
        return;
    }
    try {
        console.log('Attempting to connect to MongoDB with URL:', "mongodb+srv://nawadhajadiya:EventsHub%27sData23-08@eventshub.cu2irfy.mongodb.net/?retryWrites=true&w=majority&appName=EventsHub");
        await mongoose.connect("mongodb+srv://nawadhajadiya:EventsHub%27sData23-08@eventshub.cu2irfy.mongodb.net/?retryWrites=true&w=majority&appName=EventsHub");
        
        const connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log('Connected to MongoDB');
            isConnected = true;
        });

        connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            isConnected = false;
        });

        connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            isConnected = false;
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}