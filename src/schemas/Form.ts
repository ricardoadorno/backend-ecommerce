import { model, Schema } from 'mongoose';

const formSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export default model('Form', formSchema);
