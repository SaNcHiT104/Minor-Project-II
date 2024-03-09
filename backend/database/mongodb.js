import { MongoClient} from "mongodb";

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "healthhub";

MongoClient.connect(
  connectionURL,
  {
    useNewUrlParser: true,
  },
  (error, client) => {
    if (error) {
      return console.log("Failed to connect to database!");
    }
  }
);

const db = client.db(databaseName);
