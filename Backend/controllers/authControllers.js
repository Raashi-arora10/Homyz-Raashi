const User = require('../models/user');
const PaymentDetails = require('../models/PaymentDetails');
const Hotel = require('../models/hotel');
const ConfirmData = require('../models/Confirm');
// const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Username is not available' });
    }
    const newUser = new User({ username, email, password, confirmPassword });
    await newUser.save();

    // const data = {
    //   newUser:{
    //     id: newUser.id
    //   }
    // }

    // const token = jwt.sign(data, 'secret_token');
    // res.json({success: true, token})

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'No account found' });
    }

    if (user && (await user.comparePassword(password))) {
      // const data = {
      //   newUser:{
      //     id: newUser.id
      //   }
      // }
  
      // const token = jwt.sign(data, 'secret_token');
      // res.json({success: true, token});

      
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Wrong Password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addHotels = async (req, res) => {
  try {
    const hotels = req.body; 

    const savedHotels = await Hotel.insertMany(hotels);

    res.status(201).json(savedHotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteAllHotels = async (req, res) => {
  try {
    await Hotel.deleteMany({});
    
    return res.status(200).json({ success: true, message: 'All hotels deleted successfully.' });
  } catch (error) {
    console.error('Error deleting all hotels:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const filterHotelsByPriceRange = async (req, res) => {
  try {
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);

    if (isNaN(minPrice) || isNaN(maxPrice) || minPrice < -1 || maxPrice < -1 || minPrice > maxPrice) {
      return res.status(400).json({ error: 'Invalid price range' });
    }
    console.log('Valid price range. Filtering hotels...');

    const filteredHotels = await Hotel.find({
      price: { $gte: minPrice, $lte: maxPrice }
    });

    console.log('Filtered hotels:', filteredHotels);

    res.json(filteredHotels);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const searchHotels = async (req, res) => {
  const { query } = req.query;

  try {
    const filteredHotels = await Hotel.find({
      $or: [
        { city: { $regex: new RegExp(query, 'i') } },
        { name: { $regex: new RegExp(query, 'i') } }
      ]
    });
    res.json(filteredHotels);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedHotel = await Hotel.findByIdAndUpdate(id, updatedData, {
      new: true, 
      runValidators: true,
    });

    if (!updatedHotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.json(updatedHotel);
  } catch (error) {
    console.error('Error updating hotel:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await Hotel.findOne({ id }); 
    
    if (!details) {
      return res.status(404).json({ message: 'Details not found' });
    }

    res.json(details);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const addConfirmData = async (req, res) => {
  try {
    const confirmData = req.body;
    const savedConfirmData = await ConfirmData.insertMany(confirmData);
    res.status(201).json(savedConfirmData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getConfirmData = async (req, res) => {
  try {
    const confirmData = await ConfirmData.find();
    res.json(confirmData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addPaymentDetails = async (req, res) => {
  console.log('Attempting to add payment details...');
  try {
    const { resortName, roomType, checkInDate, checkOutDate, name, email, phone, totalCharges } = req.body;
    const newRegister = new PaymentDetails({ resortName, roomType, checkInDate, checkOutDate, name, email, phone, totalCharges });
    await newRegister.save();
    console.log('Payment details added successfully');
    res.json({ message: 'Booking Successful' });
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getPaymentDetails = async (req, res) => {
  try {
    const paymentDetails = await PaymentDetails.find();
    res.json(paymentDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// const deleteUser = async (req,res,next) => {
//   const id = req.params.id;
//   let user;
//   try{
//       user = await User.findByIdAndDelete(id);
//   }
//   catch(err){
//       console.log(err)
//   }
//   if(!user){
//       return res.status(404).json({message:"Failed to delete"})
//   }
//   return res.status(200).json({ message:"Successfully deleted" })
// }

const getUser = async(req,res,next) => {
  let users;
  try{
      users = await User.find();
  }
  catch(err){
      console.log(err)
  }

  if(!users){
      return res.status(404).json({message:"No User found"})
  }
  return res.status(200).json({ users })
}



module.exports = { signup, login, getUser, addHotels, getAllHotels, searchHotels, filterHotelsByPriceRange, deleteAllHotels, getDetails, addConfirmData, getConfirmData , addPaymentDetails, getPaymentDetails, updateHotel };
