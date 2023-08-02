import mongoose from "mongoose";

//-*-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-*-
//-*-*-*-*-*-CONNECTION TO THE DATABASE-*-*-*-*-*-
//-*-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-*--*-*-*-*-*-
const databaseConnection = (URL) => {
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database is successfully connected"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
};

export default databaseConnection;
