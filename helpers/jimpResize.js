const Jimp = require("jimp");

const resizeImg = async (imgPath) => {
    const image = await Jimp.read(imgPath);
    image.resize(250, 250);
    await image.writeAsync(imgPath);
  };
  
  module.exports = resizeImg;