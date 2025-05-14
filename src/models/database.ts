import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({ override: true });

const mariadbUsername = process.env.MARIADB_USERNAME;
const mariadbPassword = process.env.MARIADB_PASSWORD;
const mariadbHostname = process.env.MARIADB_HOSTNAME;

export class DatabaseConnector {
  private db: Sequelize;
  // initializers
  constructor() {
    // init DB
    this.db = new Sequelize({
      dialect: "mariadb",
      host: mariadbHostname,
      username: mariadbUsername,
      password: mariadbPassword,
    });
  }

  public init = async () => {
    try {
      await this.db.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };
}
