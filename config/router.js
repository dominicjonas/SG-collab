import express from 'express'
import brandController from '../controllers/brandController.js'
import signatureGuitarController from '../controllers/signatureGuitarController.js'
import reviewController from '../controllers/reviewController.js'
import userController from '../controllers/userController.js'
import secureRoute from '../middleware/secureRoute.js'

const Router = express.Router()

//* brands
Router.route('/brands')
  .get(brandController.getAllBrands)
  .post(secureRoute, brandController.createBrand)

Router.route('/brands/:id')
  .get(brandController.getBrand)
  .put(secureRoute, brandController.updateBrand)
  .delete(secureRoute, brandController.deleteBrand)

//* reviews
Router.route('/guitars/:id/review').post(reviewController.createReview)

Router.route('/guitars/:id/review/:reviewId')
  .put(secureRoute, reviewController.updateReview)
  .delete(secureRoute, reviewController.deleteReview)

//*  guitars
Router.route('/guitars')
  .get(signatureGuitarController.getAllGuitars)
  .post(secureRoute, signatureGuitarController.createGuitar)

Router.route('/guitars/:id')
  .get(signatureGuitarController.getGuitar)
  .put(secureRoute, signatureGuitarController.updateGuitar)
  .delete(secureRoute, signatureGuitarController.deleteGuitar)

//* relational
Router.route('/guitars/:id/brands').get(
  signatureGuitarController.getAllBrandsForGuitar
)
Router.route('/brands/:id/guitars').get(
  brandController.getAllGuitarsForBrand
)

//* users
Router.route('/register').post(userController.registerUser)

Router.route('/login').post(userController.loginUser)

export default Router
