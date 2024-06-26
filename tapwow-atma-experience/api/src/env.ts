import { resolve } from "path";
import { config } from "dotenv";
import * as rootPath from "app-root-path";

const env = () => {
  config({ path: resolve(__dirname, `${rootPath}/.env`) });
}

env();