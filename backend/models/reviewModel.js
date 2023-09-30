 const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
      },
      
      name: {
        type: String,
        required: true,
      },

      avatar: {
        type: String,
        default:
          'https://res.cloudinary.com/muttakinhasib/image/upload/v1611336104/avatar/user_qcrqny.svg',
      },

      rating: {
        type: Number,
        required: true,
      },

      comment: {
        type: String,
        default: " ",
      },

    },
    { timestamps: true }
  );


  return mongoose.model("Review", reviewSchema);