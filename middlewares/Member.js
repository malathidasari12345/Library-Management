

const isMember = (req, res, next) => {
    const user = req.user; 
    console.log('Authenticated User:', user);

    if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    if (user.role === 'Member') {
        next(); 
    } else {
        res.status(403).json({ message: 'Access denied.' });
    }
};

module.exports = isMember;
