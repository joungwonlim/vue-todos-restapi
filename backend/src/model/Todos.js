import mongoose from 'mongoose';

const todosSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Todos', todosSchema);
