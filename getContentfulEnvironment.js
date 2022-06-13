const contentfulManagement = require("contentful-management")

module.exports = function() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: 'CFPAT-rrp_gCvCc1WT9lZ5QIUkC-M04tdRl0TsMXuAjoStxAc',
  })

  return contentfulClient
    .getSpace('8floi4izir4h')
    .then(space => space.getEnvironment('master'))
}