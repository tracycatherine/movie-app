// In-memory database for testing
let watchlist = [];
let nextId = 1;

const db = {
  collection: (name) => ({
    insertOne: async (doc) => {
      doc._id = nextId++;
      watchlist.push(doc);
      return { acknowledged: true };
    },
    find: () => ({
      toArray: async () => watchlist
    }),
    deleteOne: async (filter) => {
      const index = watchlist.findIndex(item => item._id === filter._id);
      if (index > -1) {
        watchlist.splice(index, 1);
        return { deletedCount: 1 };
      }
      return { deletedCount: 0 };
    },
    updateOne: async (filter, update) => {
      const item = watchlist.find(item => item._id === filter._id);
      if (item) {
        Object.assign(item, update.$set);
        return { modifiedCount: 1 };
      }
      return { modifiedCount: 0 };
    }
  })
};

module.exports = db;