const routes = require('next-routes')()
//add(pattern,pathActual)
routes
  .add('campaigns/new', '/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show')

module.exports = routes
