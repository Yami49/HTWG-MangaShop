/**
 * Policy: isAdmin
 * Erlaubt Zugriff nur für Admins.
 */
module.exports = async function (req, res, proceed) {
  const user = req.session.user;
  if (!user || !user.istAdmin) {
    return res.forbidden('🚫 Zugriff verweigert: Adminrechte erforderlich.');
  }
  return proceed();
};
