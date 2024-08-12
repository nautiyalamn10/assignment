const app = require('./app');
const { seedData } = require('./store/inMemoryStore');

const PORT = process.env.PORT || 5000;
seedData();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});