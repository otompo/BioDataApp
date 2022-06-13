const User = require("../models/users");
var cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "codesmart",
  api_key: "924552959278257",
  api_secret: "nyl74mynmNWo5U0rzF8LqzcCE8U",
});

exports.addUser = async (req, res) => {
  // console.log(req.body);
  try {
    const images = req.body.imageUris;

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "users",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;

    const user = await User.create({ ...req.body });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.uploadImage = async (req, res) => {
  try {
    // console.log("upload image", req.user._id);
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      public_id: nanoid(),
      folder: "linksdaily/img",
      // width: "150",
      // crop: "scale",
    });
    // console.log(result);
    // save image in database
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      },
      { new: true }
    );
    return res.json({
      name: user.name,
      email: user.email,
      image: user.image,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "-password -secret"
    );
    const userlinks = await Link.find({ postedBy: req.params.userId })
      .select("urlPreview views likes")
      .populate("postedBy", "_id")
      .sort({ createdAt: -1 });
    res.send({ user, userlinks });
  } catch (err) {
    console.log(err);
  }
};
