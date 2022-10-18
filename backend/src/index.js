import app from './app';

// listening serve
const port = process.env.PORT || 1017;

app.listen(port, () => {
  console.log(`Listen http://localhost:${port}`);
});
