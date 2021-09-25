import Guitar from '../models/signatureGuitar.js'
import Brand from '../models/brand.js'
import { removedAdded } from './helpers.js'

// if you dont need one of your para , put an underscore before it -> signifies this to devs and linters. below , the request isnt used
async function getAllGuitars(_req, res, next) {
  try {
    const guitar = await Guitar.find()
    return res.status(200).json(guitar)
  } catch (err) {
    next(err)
  }
}

async function getAllBrandsForGuitar(req, res, next) {
  try {
    const { id } = req.params
    const guitar = await Guitar.findById(id).populate('brand')
    return res.status(200).json(guitar.brand)
  } catch (err) {
    next(err)
  }
}

async function createGuitar(req, res, next) {
  try {
    const newGuitar = await Guitar.create(req.body)

    await Brand.updateMany(
      { _id: newGuitar.brand },
      { $push: { signatureGuitars: newGuitar._id } }
    )
    return res.status(201).json(newGuitar)
  } catch (err) {
    next(err)
  }
}

async function getGuitar(req, res, next) {
  const { id } = req.params
  try {
    const guitar = await Guitar.findById(id)

    if (!guitar) {
      return res.status(404).send({ message: 'Guitar does not exist' })
    }

    return res.status(200).json(guitar)
  } catch (err) {
    next(err)
  }
}

async function deleteGuitar(req, res, next) {
  const { id } = req.params

  try {
    const guitar = await Guitar.findByIdAndDelete(id)

    if (!guitar) {
      return res.status(404).send({ message: 'Guitar does not exist' })
    }

    const brandToRemove = guitar.brand.map((brand) => brand.toString())

    await Brand.updateMany(
      { _id: brandToRemove },
      { $pull: { signatureGuitars: guitar._id } }
    )

    return res.status(204).json(guitar)
  } catch (err) {
    next(err)
  }
}

async function updateGuitar(req, res, next) {
  const id = req.params.id

  try {
    const guitar = await Guitar.findById(id)

    if (!guitar) {
      return res.status(404).send({ message: 'Guitar does not exist' })
    }

    const [removedBrand, addedBrand] = removedAdded(
      guitar.brand.map((brand) => brand.toString()),
      req.body.signatureGuitars
    )

    guitar.set(req.body)
    const savedGuitar = await guitar.save()

    await Brand.updateMany(
      { _id: removedBrand },
      { $pull: { signatureGuitars: guitar._id } }
    )

    await Guitar.updateMany(
      { _id: addedBrand },
      { $push: { signatureGuitars: savedGuitar._id } }
    )

    return res.status(200).json(guitar)
  } catch (err) {
    next(err)
  }
}

export default {
  getAllGuitars,
  getAllBrandsForGuitar,
  createGuitar,
  getGuitar,
  deleteGuitar,
  updateGuitar
}
