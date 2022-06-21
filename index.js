const {ApolloServer, gql} = require('apollo-server')

////////////////////// DATABASE ////////////////////////////////
const hotels = [
    {
        name: 'Embassy Suites NYC',
        price: 687.99,
        id: '1',
        phoneNumber: '6987562323',
        address: '21 affan ave',
        rating: 3,
    },
    {
        name: 'Marriot NYC',
        price: 650.99,
        id: '2',
        phoneNumber: '8845692313',
        address: '24 kobe bean lane',
        rating: 3,
    },
    {
        name: 'Vdara',
        price: 670.99,
        id: '3',
        phoneNumber: '5412365285',
        address: '30 steph curry ave',
        rating: 5,
    },
    {
        name: 'Aria',
        price: 590.99,
        id: '4',
        phoneNumber: '7458969636',
        address: '6 lebron blvd',
        rating: 5,
    },
    {
        name: 'Mandalay Bay',
        price: 577.99,
        id: '5',
        phoneNumber: '',
        address: '23 jordan goat lane',
        rating: 4,
    },
    {
        name: 'Holiday Inn',
        price: 577.99,
        id: '6',
        phoneNumber: '',
        address: '34 Giannis blvd',
        rating: 4,
    },
]

const cities = [
    {
        id: '1',
        name: 'New York',
        state: 'NY',
        province: '',
        countryCode: 'US'
    },
    {
        id: '2',
        name: 'Las Vegas',
        state: 'NV',
        province: '',
        countryCode: 'US'
    },
    {
        id: '3',
        name: 'Toronto',
        state: '',
        province: 'ON',
        countryCode: 'CA'
    },
]

//////////////////////// type defs /////////////////////

const typeDefs = gql`
    type Query{
        hotels: [Hotel!]!
        hotel(id: ID!): Hotel
        cities: [City!]!
        city(id: ID!): City

    }

    type Hotel {
        name: String!
        price: Float!
        id: ID!,
        phoneNumber: String,
        address: String,
        rating: Int
    }

    type City {
        id: ID!
        name: String!
        state: String
        province: String
        countryCode: String!
    }

`
//////////////////////// resolvers //////////////////////
const resolvers = {
    Query: {
        hotels: (parent, args, context) => {
            return hotels
        },
        hotel: (parent, args, context) => {
            const {id} = args
            return hotels.find(hotel => hotel.id === id)

        },
        cities: (parent, args, context) => {
            return cities
        },
        city: (parent, args, context) => {
            const {id} = args
            return cities.find(city => city.id === id)

        }
    }
}

/////////////////// app ////////////////////////////
const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`server is ready at ${url}`)

})

