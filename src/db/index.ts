import { Database, DataTypes, Model, MongoDBConnector } from "denodb";
import { env } from "../deps.ts";

const connection = new MongoDBConnector({
  uri: env.__MONGO_DB_URI__!,
  database: "fresh-start",
});

const db = new Database(connection);

class Users extends Model {
  static table = "flights";
  static timestamps = true;

  static fields = {
    _id: {
      primaryKey: true,
    },
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    visits: DataTypes.INTEGER,
  };

  static defaults = {
    flightDuration: 2.5,
  };
}

db.link([Users]);

await db.sync({ drop: true });

await Users.create({
  departure: "Paris",
  destination: "Tokyo",
});

// or

const flight = new Users();
flight.departure = "London";
flight.destination = "San Francisco";
await flight.save();

await Users.select("destination").all();
// [ { destination: "Tokyo" }, { destination: "San Francisco" } ]

await Users.where("destination", "Tokyo").delete();

const sfFlight = await Users.select("destination").find(2);
// { destination: "San Francisco" }

await Users.count();
// 1

await Users.select("id", "destination").orderBy("id").get();
// [ { id: "2", destination: "San Francisco" } ]

await sfFlight.delete();

await db.close();
