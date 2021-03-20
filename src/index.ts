import app from "./app";
import { __port__ } from "./config";

app.listen(__port__, () => {
  console.log(`Server started on PORT: ${__port__}`);
});
