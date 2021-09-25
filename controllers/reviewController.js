import Guitar from '../models/signatureGuitar.js'

async function createReview(req, res, next) {
  try {
    const { id } = req.params
    const guitar = await Guitar.findById(id)

    if (!guitar) {
      return res
        .status(404)
        .send({ message: 'That guitar does not exist' })
    }

    const newReview = {
      ...req.body,
      createdBy: req.currentUser
    }

    guitar.reviews.push(newReview)
    const savedReview = await guitar.save()

    return res.send(savedReview)
  } catch (err) {
    next(err)
  }
}

async function deleteReview(req, res, next) {
  const { id, reviewId } = req.params

  try {
    const guitar = await Guitar.findById(id)

    if (!guitar) {
      return res.status(404).send({ message: 'Guitar does not exist' })
    }

    const review = guitar.reviews.id(reviewId)
    if (!review.createdBy.equals(req.currentUser)) {
      return res.status(401).send({ message: 'Unauthorized action' })
    }

    review.remove()

    const savedGuitar = await guitar.save()

    res.send(savedGuitar)
  } catch (err) {
    next(err)
  }
}

async function updateReview(req, res, next) {
  const { reviewId, id } = req.params

  try {
    const guitar = await Guitar.findById(id)
    // .populate('comments.user')

    if (!guitar) {
      return res.status(404).send({ message: 'Not found' })
    }

    const review = guitar.reviews.id(reviewId)

    review.set(req.body)

    const savedGuitar = await guitar.save()

    res.send(savedGuitar)
  } catch (err) {
    next(err)
  }
}

export default {
  createReview,
  deleteReview,
  updateReview
}
