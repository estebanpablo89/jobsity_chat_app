const server = require('../app');

const request = require('supertest');

const validMessage = {
  user: 'Esteban',
  message: 'Hello',
  room: 'Tests',
};

const postMessage = (message = validMessage) => {
  return request(server).post('/messages/create').send(message);
};

const deleteMessage = id => {
  return request(server).delete(`/messages/${id}`);
};

describe('Message', () => {
  it('returns 201 OK with data when a message is created', async () => {
    const response = await postMessage();
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    await deleteMessage(response.body.data._id);
  });
});
