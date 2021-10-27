const { expect } = require('chai');
require("dotenv").config();
    describe('Checking env variable', () => {
  it('Is variable define', () => {
      expect(process.env.MONGO_URI).to.be.a('string');
      
  });
});