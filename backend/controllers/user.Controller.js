import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
  try {
     const userId = req.userId; // Provided by isAuth middleware
     const user = await User.findById(userId).select("-password");

     if (!user) {
       return res.status(404).json({ 
         success: false, 
         message: "User not found" 
       });
     }

     // Success: Send the user data
     return res.status(200).json({
       success: true,
       user 
     });

  } catch (error) {
     console.error(error);
     return res.status(500).json({ 
       success: false, 
       message: "Error fetching current user" 
     });
  }
}