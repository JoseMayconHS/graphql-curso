import dotenv from 'dotenv'
import { ApolloServer } from 'apollo-server'

import resolvers from './graphs/resolvers'
import typeDefs from './graphs/typeDefs'
import context from './config/context'

dotenv.config()

class App {
  private server: ApolloServer

  constructor({ PORT = +process.env.PORT } = {}) {
    this.server = new ApolloServer({
      resolvers,
      typeDefs,
      context
    })

    this.server.listen(PORT)
    .then(({ url }) => console.log(url))
  }

}

new App()
