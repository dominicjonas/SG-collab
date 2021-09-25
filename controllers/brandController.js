import Brand from '../models/brand.js'
import Guitar from '../models/signatureGuitar.js'
import { removedAdded } from './helpers.js'

// How we get the colourPalette (from database or otherwise)
// is the responsibility of the controller
async function getAllBrands(req, res, next) {
  try {
    const brand = await Brand.find()
    return res.status(200).json(brand)
  } catch (err) {
    next(err)
  }
}

async function getAllGuitarsForBrand(req, res, next) {
  try {
    const { id } = req.params
    const brand = await Brand.findById(id).populate('signatureGuitars')
    return res.status(200).json(brand.signatureGuitars)
  } catch (err) {
    next(err)
  }
}

async function getBrand(req, res, next) {
  const { id } = req.params

  try {
    const brand = await Brand.findById(id)

    // this check is if the id is invalid
    if (!brand) {
      return res.status(404).send({ message: 'Brand does not exist' })
    }

    return res.status(200).json(brand)
  } catch (err) {
    next(err)
  }
}

async function createBrand(req, res, next) {
  try {
    const newBrand = await Brand.create({
      // for security, req.currentUser needs to
      // be used after the spread
      ...req.body,
      createdBy: req.currentUser
    })

    // create relationship with signatureGuitars, when we create the brand, we update the signatureGuitars -> push brand _id to signatureGuitar.brand
    await Guitar.updateMany(
      { _id: newBrand.signatureGuitars },
      { $push: { brand: newBrand._id } }
    )

    return res.status(201).json(newBrand)
  } catch (err) {
    next(err)
  }
}

async function updateBrand(req, res, next) {
  try {
    const { id } = req.params
    const { body } = req
    // const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
    //   new: true
    // })
    const brand = await Brand.findById(id)

    if (!brand) {
      return res.status(404).send({ message: 'Brand does not exist' })
    }

    // we want to ask mongoose if createdBy and currentUser match
    if (!brand.createdBy.equals(req.currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized action' })
    }

    const [removedGuitar, addedGuitar] = removedAdded(
      brand.signatureGuitars.map((guitar) => guitar.toString()),
      req.body.guitar
    )

    //set new fields
    brand.set(body)
    const savedBrand = await brand.save()

    await Guitar.updateMany(
      { _id: removedGuitar },
      { $pull: { signatureGuitars: savedBrand._id } }
    )

    await Guitar.updateMany(
      { _id: addedGuitar },
      { $push: { signatureGuitars: savedBrand._id } }
    )

    res.status(200).json(savedBrand)
  } catch (err) {
    next(err)
  }
}

async function deleteBrand(req, res, next) {
  const id = req.params.id
  try {
    const brand = await Brand.findById(id)

    if (!brand) {
      return res.status(404).send({ message: 'Brand does not exist' })
    }

    // we want to ask mongoose if createdBy and currentUser match
    if (!brand.createdBy.equals(req.currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized action' })
    }

    const guitarToRemove = brand.signatureGuitars.map((guitar) =>
      guitar.toString()
    )

    await Guitar.updateMany(
      { _id: guitarToRemove },
      { $pull: { brand: brand._id } }
    )

    return res.status(200).json(brand)
  } catch (err) {
    next(err)
  }
}

export default {
  getAllBrands,
  getAllGuitarsForBrand,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand
}
