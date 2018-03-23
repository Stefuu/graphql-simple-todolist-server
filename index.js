const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 8080

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: require('./schemas'),
  graphiql: true
}))

app.listen(port, (err) => {
  if (err) {
    console.error('Error starting server: ', err)
  } else {
    console.log(`Server started at port: ${port}`)
  }
})
