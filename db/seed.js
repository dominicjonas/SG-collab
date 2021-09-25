import Brand from '../models/brand.js'
import { brandSeedData } from './brandSeedData.js'
import { connectDb, disconnectDb, truncateDb } from './helpers.js'

async function seed() {
  try {
    await connectDb()
    console.log('✅ connected to database')

    await truncateDb()
    console.log('✅ database dropped')

    const brands = await Brand.create(brandSeedData)
    console.log(`✅ ${brands.length} brands added to the database`)

    console.log('🤖 goodbye')
  } catch (err) {
    console.log('🤖 something went wrong connecting to the database')
    console.log(err)
  }
  disconnectDb()
}

seed()
