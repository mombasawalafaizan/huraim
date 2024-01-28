import { ITest } from "@/types";
import mongoose, { Schema, Model } from "mongoose";

// Define the schema
const testSchema = new Schema<ITest>({
  name: {
    type: String,
    required: true,
  },
});

// Define the model
const TestModel: Model<ITest> =
  mongoose.models.Tests || mongoose.model<ITest>("Tests", testSchema);

export default TestModel;
