/**
 * Policy: isLoggedIn
 * Verhindert Zugriff, wenn der Nutzer nicht eingeloggt ist.
 */
module.exports = async function (req, res, proceed) {
  if (!req.session.userId) {
    return res.forbidden('⚠️ Zugriff verweigert: Du bist nicht eingeloggt.');
  }
  return proceed();
};
