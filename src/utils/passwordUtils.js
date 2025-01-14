import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    return hashedPassword;
    };


export const comparePasswords = async (password, hashedPassword) => {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Generate JWT token if the credentials are valid
      const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: "1h" });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
    const isValid = await bcrypt.compare(password, hashedPassword);
    
    return isValid;
    }