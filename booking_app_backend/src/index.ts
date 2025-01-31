import app from "./app";
import config from "./helpers/config";

(async () => {
  app.listen(config.port, () =>
    console.log(`Server is live @ ${config.hostUrl}`)
  );
})();
