import Guitar from '../models/signatureGuitar.js'
import User from '../models/user.js'
import { connectDb, disconnectDb } from './helpers.js'

async function cleanupReviews() {
  try {
    await connectDb()
    console.log('🤖 Database Connected')

    const guitars = await Guitar.find()
    // Get all guitars
    const user = await User.findOne({
      email: 'user@community.wiki'
    })

    // Get all reviews of each guitar
    for (let guitar of guitars) {
      guitar.reviews.forEach((review) => {
        // Set the createdBy to the "community" user
        review.set({
          createdBy: user._id
        })
      })
      if (guitar.createdBy) {
        const createdByUser = await User.findById(guitar.createdBy)
        if (createdByUser) {
          console.log('guitar', guitar, 'created by', createdByUser)
          // in this case, there is already a valid user
          continue
        }
      }
      guitar.set({ createdBy: user._id })
      await guitar.save()
    }
  } catch (err) {
    console.log('🤖 Something went wrong')
    console.log(err)
  }
  disconnectDb()
}

cleanupReviews()
