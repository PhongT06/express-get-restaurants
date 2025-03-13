const request = require('supertest');
const app = require('./src/app');

describe('Restaurants API', () => {
   describe('GET /restaurants', () => {
      test('should return status 200', async () => {
         const response = await request(app).get('/restaurants');
         expect(response.status).toBe(200);
      });

      test('should return an array of restaurants', async () => {
         const response = await request(app).get('/restaurants');
         expect(Array.isArray(response.body)).toBe(true);
      });

      test('should return the correct number of restaurants', async () => {
         const response = await request(app).get('/restaurants');
         expect(response.body.length).toBe(3);
      });

      test('should return the correct restaurant data', async () => {
         const response = await request(app).get('/restaurants');
         expect(response.body).toEqual(
            expect.arrayContaining([
               expect.objectContaining({
                  id: 1,
                  name: 'AppleBees',
                  location: 'Texas',
                  cuisine: 'FastFood'
               }),
               expect.objectContaining({
                  id: 2,
                  name: 'LittleSheep',
                  location: 'Dallas',
                  cuisine: 'Hotpot'
               }),
               expect.objectContaining({
                  id: 3,
                  name: 'Spice Grill',
                  location: 'Houston',
                  cuisine: 'Indian'
               })
            ])
         );
      });
   });

   describe('GET /restaurants/:id', () => {
      test('should return the correct restaurant data', async () => {
         const response = await request(app).get('/restaurants/1');
         expect(response.status).toBe(200);
         expect(response.body).toEqual(
            expect.objectContaining({
               id: 1,
               name: 'AppleBees',
               location: 'Texas',
               cuisine: 'FastFood'
            })
         );
      });
   });

   describe('POST /restaurants', () => {
      test('should add a new restaurant and return updated data', async () => {
         const newRestaurant = {
            name: 'Torchy\'s Tacos',
            location: 'Texas',
            cuisine: 'Mexican'
         };
         const response = await request(app)
            .post('/restaurants')
            .send(newRestaurant);
         expect(response.status).toBe(200);
         expect(response.body).toEqual(
            expect.objectContaining({
               id: 4,
               name: 'Torchy\'s Tacos',
               location: 'Texas',
               cuisine: 'Mexican'
            })
         );

         const getResponse = await request(app).get('/restaurants');
         expect(getResponse.body).toEqual(
            expect.arrayContaining([
               expect.objectContaining({
                  name: 'Torchy\'s Tacos',
                  location: 'Texas',
                  cuisine: 'Mexican'
               })
            ])
         );
      });
   });

   describe('PUT /restaurants/:id', () => {
      test('should update the restaurant', async () => {
         const updatedRestaurant = {
            name: 'AppleBees',
            location: 'Texas',
            cuisine: 'American'
         };
         const response = await request(app)
            .put('/restaurants/1')
            .send(updatedRestaurant);
         expect(response.status).toBe(200);
         expect(response.body).toEqual(
            expect.objectContaining({
               id: 1,
               name: 'AppleBees',
               location: 'Texas',
               cuisine: 'American'
            })
         );

         const getResponse = await request(app).get('/restaurants/1');
         expect(getResponse.body).toEqual(
            expect.objectContaining({
               id: 1,
               name: 'AppleBees',
               location: 'Texas',
               cuisine: 'American'
            })
         );
      });
   });

   describe('DELETE /restaurants/:id', () => {
      test('should delete the restaurant', async () => {
         const response = await request(app)
         .delete('/restaurants/3')
         expect(response.status).toBe(200);
      });
   });
});

