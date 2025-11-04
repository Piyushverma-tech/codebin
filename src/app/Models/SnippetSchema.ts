import mongoose, { Schema } from 'mongoose';

const SingleTagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    clerkUserId: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const SingleSnippetSchema = new Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true,
      default: false,
    },
    tags: {
      type: [SingleTagSchema],
      required: true,
      default: [],
    },
    description: {
      type: String,
      default: '',
    },
    code: {
      type: String,
      default: '',
    },
    timeComplexity: {
      type: String,
      default: '',
    },
    optimizationPercent: {
      type: Number,
      default: undefined,
    },
    language: {
      type: String,
      default: '',
    },
    creationDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    isTrash: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const SingleSnippet =
  mongoose.models.SingleSnippet ||
  mongoose.model('SingleSnippet', SingleSnippetSchema);

export default SingleSnippet;
