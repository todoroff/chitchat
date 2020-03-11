module.exports = function setSession(session, key, value) {
  session[key] = value;
  session.touch();
  return new Promise((resolve, reject) => {
    session.save(function(err) {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
}