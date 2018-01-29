describe('Example', () => {
  beforeEach(async () => {
    await device.relaunchApp();
  });

  it('should always pass', async () => {
    await true;
  });

  it('should pass after relaunch', async () => {
    await true;
  });
})