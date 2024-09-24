import mongoose from 'mongoose';

const documentUri = process.env.DOCUMENT_DB_URI || '';

const initialize = async () => {
  await mongoose
    .connect(documentUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));
};

export default {
  initialize,
};
