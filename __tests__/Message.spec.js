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

  it('returns message data when a message is created', async () => {
    const response = await postMessage();
    expect(response.status).toBe(201);
    expect(response.body.data.user).toBeDefined();
    expect(response.body.data.message).toBeDefined();
    expect(response.body.data.room).toBeDefined();
    await deleteMessage(response.body.data._id);
  });

  it('returns 200 OK with data when message is searched and found', async () => {
    const response1 = await postMessage();
    const response2 = await request(server).get(
      `/messages/${response1.body.data._id}`
    );
    expect(response2.status).toBe(200);
    expect(response2.body.data.message).toBeDefined();
    await deleteMessage(response2.body.data._id);
  });

  it('returns 400 status with error when message is not found', async () => {
    const response = await request(server).get(
      '/messages/605a6d26b3275b25ecc07f42'
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
