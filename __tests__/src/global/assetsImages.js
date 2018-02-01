import Images from "../../../src/global/assetsImagesResources";


test('Image Assets', () => {

  expect(Images.background).toEqual({"testUri": "../../../src/assets/images/background-gray.jpg"});

});


test('Image Assets Logo', () => {

  expect(Images.privateKeyDemo).toBe(1);

});