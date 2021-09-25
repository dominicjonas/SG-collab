import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const brandSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  brandLogoUrl: String,
  placeOfOrigin: String,
  manufactredIn: String,
  signatureGuitars: [{ type: mongoose.Types.ObjectId, ref: 'Guitar' }],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
})

brandSchema.plugin(mongooseUniqueValidator)

const Brand = mongoose.model('Brand', brandSchema)

export default Brand
