export const natsWrapper = {
  client: {
    publish: jest
      .fn() // vytvorime mock
      .mockImplementation( // samotna implemnetace mocku
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
