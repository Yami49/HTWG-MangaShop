/**
 * Policy: isOwnerOrAdmin
 * Erlaubt Zugriff nur, wenn der eingeloggte Benutzer selbst betroffen ist oder Admin ist.
 * Erwartet: `req.params.id` (z. B. Benutzer-ID)
 */
module.exports = async function (req, res, proceed) {
  const sessionUser = req.session.user;
  const targetId = req.params.id;

  if (!sessionUser) {
    return res.forbidden('⚠️ Zugriff verweigert: Nicht eingeloggt.');
  }

  if (sessionUser.istAdmin || String(sessionUser.id) === String(targetId)) {
    return proceed();
  }

  return res.forbidden('🚫 Zugriff verweigert: Nur eigene Daten oder Admin.');
};
