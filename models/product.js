export default class Product {
  constructor() {
    console.log('Product module');
  }
  static getAll() {
    return [1,2,3,4,5];
  }
  static getOne(id) {
    return {id: id};
  }
  static getAllReviews(id) {
    return {reviewId: id};
  }
};