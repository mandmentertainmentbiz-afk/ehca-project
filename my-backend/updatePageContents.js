import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const PageContent = mongoose.model(
  "PageContent",
  new mongoose.Schema({}, { strict: false }),
  "pagecontents"
);

const result = await PageContent.updateMany(
  {},
  {
    $rename: {
      isVisible: "isActive"
    }
  }
);

console.log(result);

await mongoose.disconnect();