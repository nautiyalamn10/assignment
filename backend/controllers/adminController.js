const { instance: store } = require('../store/inMemoryStore');

exports.getStats = async (req, res) => {
  try {
    const stats = store.getStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin stats', error: error.message });
  }
};