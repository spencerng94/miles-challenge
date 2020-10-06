import axios from 'axios';

describe('API GET Request for getCategoriesRewards', () => {
  it('should receive a 200 response from GET request for getCategoriesRewards', () => {
    return axios('http://localhost:3000/api/categories_rewards')
      .then(result => {
        expect(result.status).toBe(200);
        expect(result.data.length).toBe(5);
      });
  });
});

describe('API GET Request for getCategories', () => {
  it('should receive a 200 response from GET request for getCategories', () => {
    return axios('http://localhost:3000/api/categories')
      .then(result => {
        expect(result.status).toBe(200);
        expect(result.data.length).toBe(5);
      });
  });
});

describe('API GET Request for getRewards', () => {
    it('should receive a 200 response from GET request for getRewards', () => {
      return axios('http://localhost:3000/api/rewards')
        .then(result => {
          expect(result.status).toBe(200);
          expect(result.data.length).toBe(5);
        });
    });
});