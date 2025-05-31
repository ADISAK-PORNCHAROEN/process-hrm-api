// import { describe, expect, test } from '@jest/globals';
// import request from 'supertest';
// import app from './app';

// describe('API Test', () => {
//   test('POST /users should return created user', async () => {
//     const userData = { firstname: 'John', lastname: 'Doe', age: 20, gender: 'male' };
//     const res = await request(app)
//       .post('/users')
//       .set("Content-Type", "application/json")
//       .send(JSON.stringify(userData));
//     expect(res.status).toBe(201);
//     expect(res.body).toEqual(expect.objectContaining({
//       message: 'User created successfully',
//       data: expect.objectContaining(userData),
//     }));
//   });

//   test('GET /user should return obj data', async () => {
//     const userData = [{ id: 1, firstname: 'John', lastname: 'Doe', age: 20, gender: 'male' }];
//     const filterUser = userData.map(user => ({
//       id: user.id,
//       firstname: user.firstname,
//       lastname: user.lastname,
//       fullname: user.firstname + ' ' + user.lastname
//     }));
//     const res = await request(app)
//       .get('/users')
//       .set("Content-Type", "application/json")
//       .send(JSON.stringify(filterUser));
//     expect(res.status).toBe(200);
//     expect(res.body).toEqual(expect.objectContaining({
//       message: "get user success",
//       data: expect.arrayContaining(filterUser),
//     }))
//   });

//   test('GET /user/:id should return obj data 1', async () => {
//     const userData = { id: 1, firstname: 'John', lastname: 'Doe' };
//     const res = await request(app)
//       .get(`/user/${userData.id}`)
//       .set("Content-Type", "application/json")
//       .send(JSON.stringify(userData));
//     expect(res.status).toBe(200);
//     expect(res.body).toEqual(expect.objectContaining({
//       message: "get user success",
//       data: expect.objectContaining(userData),
//     }));
//   });

//   test('PUT /user/:id should return updated successfully', async () => {
//     const userData = { id: 1, firstname: 'John', lastname: 'Doe', age: 20, gender: 'male' };
//     const res = await request(app)
//       .put(`/user/${userData.id}`)
//       .set("Content-Type", "application/json")
//       .send(JSON.stringify(userData));
//     expect(res.status).toBe(200);
//     expect(res.body).toEqual(expect.objectContaining({
//       message: 'User updated successfully',
//       data: expect.objectContaining(userData),
//     }));
//   })

//   test('PUT /user/:id should return user not found', async () => {
//     //id not founded
//     const userData = { id: 2, firstname: 'John', lastname: 'Doe', age: 20, gender: 'male' };
//     const res = await request(app)
//       .put(`/user/${userData.id}`)
//       .set("Content-Type", "application/json")
//       .send(JSON.stringify(userData));
//     expect(res.status).toBe(404);
//     expect(res.body).toEqual(expect.objectContaining({
//       message: 'User not found',
//     }));
//   })

//   test('PUT /user/:id should return error updating user', async () => {
//     const userData = { id: 1, firstName: 'John', lastName: 'Doeeee' };
//     const res = await request(app)
//       .put(`/user/${userData.id}`)
//       .set("Content-Type", "application/json")
//       .send(JSON.stringify(userData));
//     expect(res.status).toBe(500);
//     expect(res.body).toEqual(expect.objectContaining({
//       message: 'Error updating user',
//     }));
//   })

//   test('PATCH /user/:id should return updated successfully', async () => {
//     const userData = { id: 1, firstname: 'Johnnn', lastname: 'Doeee', age: 20, gender: 'male' };
//     const res = await request(app)
//       .patch(`/user/${userData.id}`)
//       .set("Content-Type", "application/json")
//       .send(JSON.stringify(userData));
//     expect(res.status).toBe(200);
//     expect(res.body).toEqual(expect.objectContaining({
//       message: 'User updated successfully',
//       data: expect.objectContaining(userData),
//     }));
//   })

//   test('PATCH /user/:id should return user not found', async () => {
//     const userData = { id: 2, firstname: 'Johnnn', lastname: 'Doeee', age: 20, gender: 'male' };
//     const res = await request(app)
//       .patch(`/user/${userData.id}`)
//       .set("Content-Type", "application/json")
//       .send(JSON.stringify(userData));
//     expect(res.status).toBe(404);
//     expect(res.body).toEqual(expect.objectContaining({
//       message: 'User not found',
//     }));
//   })

//   test('PATCH /user/:id should return error updating user', async () => {
//     const userData = { id: 1, firstName: 'John', lastName: 'Doe', age: 20, gender: 'male' };
//     const res = await request(app)
//       .patch(`/user/${userData.id}`)
//       .set("Content-Type", "application/json")
//       .send(JSON.stringify(userData));
//     expect(res.status).toBe(500);
//     expect(res.body).toEqual(expect.objectContaining({
//       message: 'Error updating user',
//     }));
//   })

//   test('PATCH /user/:id should return user deleted successfully', async () => {
//     const userData = { id: 1, firstName: 'John', lastName: 'Doe' };
//     const res = await request(app)
//       .delete(`/user/${userData.id}`)
//       .set("Content-Type", "application/json")
//       .send(JSON.stringify(userData));
//     expect(res.status).toBe(200);
//     expect(res.body).toEqual(expect.objectContaining({
//       message: 'User deleted successfully',
//     }));
//   })

//   test('PATCH /user/:id should return user not found', async () => {
//     const userData = { id: 1, firstName: 'John', lastName: 'Doe' };
//     const res = await request(app)
//       .delete(`/user/${userData.id}`)
//       .set("Content-Type", "application/json")
//       .send(JSON.stringify(userData));
//     expect(res.status).toBe(404);
//     expect(res.body).toEqual(expect.objectContaining({
//       message: 'User not found',
//     }));
//   })
// });