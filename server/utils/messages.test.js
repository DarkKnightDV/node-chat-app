const expect = require('expect');

const {generateMessage} = require('./messages');

describe('Generate Message', (done) => {

    it('Should generate a message', ()=>{
        var from = "Admin";
        var text = "Welcome to chat app";
        var message = generateMessage(from, text);

        expect(message).toMatchObject({from, text});
        expect(typeof message.completedAt).toBe('string');
    });
});