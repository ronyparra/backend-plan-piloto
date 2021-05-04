import app from './server';
const port = 8001;

app.listen(port, () => {
  console.log("server started at http://localhost:8001");
});