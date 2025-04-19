const { determineWinner } = require('./winnerController');

describe('determineWinner', () => {
  const mockRes = () => {
    const res = {};
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const options = ['rock', 'paper', 'scissors'];

  it.each(options)('should return tie if both user and computer choose the same option', (option) => {
    // Mock Math.random to always return the current index for tie
    jest.spyOn(Math, 'random').mockReturnValue(options.indexOf(option) / options.length);

    const req = { body: { userOption: option } };
    const res = mockRes();

    determineWinner(req, res);

    expect(res.json).toHaveBeenCalledWith({
      computerOption: option,
      result: 'tie',
    });

    Math.random.mockRestore();
  });

  it('should return user win if user picks rock and computer picks scissors', () => {
    jest.spyOn(Math, 'random').mockReturnValue(2 / 3); // scissors

    const req = { body: { userOption: 'rock' } };
    const res = mockRes();

    determineWinner(req, res);

    expect(res.json).toHaveBeenCalledWith({
      computerOption: 'scissors',
      result: 'user',
    });

    Math.random.mockRestore();
  });

  it('should return computer win if user picks rock and computer picks paper', () => {
    jest.spyOn(Math, 'random').mockReturnValue(1 / 3); // paper

    const req = { body: { userOption: 'rock' } };
    const res = mockRes();

    determineWinner(req, res);

    expect(res.json).toHaveBeenCalledWith({
      computerOption: 'paper',
      result: 'computer',
    });

    Math.random.mockRestore();
  });
});
