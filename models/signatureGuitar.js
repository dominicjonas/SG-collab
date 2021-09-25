import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const reviewSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 300 },
    rating: { type: Number, required: true, min: 1, max: 10 },
    // add more rating later for guitar performance , specs etc
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

const signatureGuitarSchema = new mongoose.Schema({
  signatureArtist: String,
  signatureArtistImgUrl: String,
  guitarModel: String,
  leftHanded: Boolean,
  stringNumber: Number,
  price: Number,
  brand: [{ type: mongoose.Types.ObjectId, ref: 'Brand' }],
  reviews: [reviewSchema],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
})

signatureGuitarSchema.plugin(mongooseUniqueValidator)

const Guitar = mongoose.model('Guitar', signatureGuitarSchema)

export default Guitar
