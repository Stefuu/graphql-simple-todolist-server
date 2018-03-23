const { makeExecutableSchema } = require('graphql-tools')
const Loki = require('lokijs')
const shortid = require('shortid')

const db = new Loki()
const collection = db.addCollection('tasks')

const typeDefs = `
    type Task {
        id: ID!
        name: String!
        done: Boolean
    }
    type Query {
        task(id: ID): Task
        tasks: [Task]
    }
    type Mutation {
        createTask(name: String, done: Boolean): Task
        updateTask(id: ID, name: String, done: Boolean): Task
        deleteTask(id: ID): Boolean
    }
`

const resolvers = {
    Query: {
        task: (_, { id }) => {
            return collection.findOne({ id })
        },
        tasks: () => {
            return collection.find()
        }
    },
    Mutation: {
        createTask: (_, data) => {
            return collection.insert({
                id: shortid.generate(),
                name: data.name,
                done: data.done
            })
        },
        updateTask: async (_, data) => {
            const task = await collection.findOne({ id: data.id })
            task.name = data.name
            task.done = data.done
            await collection.update(task)
            return task
        },
        deleteTask: async (_, data) => {
            const task = await collection.findOne({ id: data.id })
            await collection.remove(task)
            return true
        }
    }
}

module.exports = makeExecutableSchema({
    typeDefs, resolvers
})