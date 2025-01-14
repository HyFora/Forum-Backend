// ================= VERIFY EMAIL ==================
// E-Mail-Verifizierung
export const verifyEmail = async (req, res, next) => {
    try {
      const { userId } = req.params;
  
      // Benutzer suchen und als verifiziert markieren
      const user = await User.findByIdAndUpdate(userId, { verified: true }, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found or already verified." });
      }
      res.status(200).json({ message: "Email successfully verified." });
    } catch (error) {
      next(error);
    }
  };
  