const initializeDB = (mongoose) => {
  for (var i in mongoose.connection.collections) {
    mongoose.connection.collections[i].remove(function() {});
  }
}

module.exports = { initializeDB }