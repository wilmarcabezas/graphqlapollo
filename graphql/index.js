const { makeExecutableSchema } = require('graphql-tools');
const movies = require('../data');

const { readFileSync } = require('fs')
const { join } = require('path')

// definiendo el esquema
const typeDefs = readFileSync(
  join(__dirname, './', 'schema.graphql'),
  'utf-8'
)


const resolvers = {
   Query:{
      async movies(_,srgs){
         return await movies;
      },
      async movie(_, { id }){
         return await movies.find((movie)=> movie.id===id);
      },
   },
   Mutation:{
      async createMovie(_, { input }){
         let newMovie = {
            id: movies.length,
            title: input.title,
            director: input.director,
            topic: input.topic,

            
         };

         return await movies.push(newMovie);
      }
   }
}

const schema = makeExecutableSchema({
   typeDefs,
   resolvers,
   graphql:true,
})

module.exports=schema;