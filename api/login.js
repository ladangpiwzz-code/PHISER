// api/login.js
module.exports = (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method === 'POST') {
        const { username, password } = req.body;
        
        // Valid credentials (in production, use database)
        const validUsers = [
            { user: 'piwzsky', pass: 'piwzsky30' },
            { user: 'admin', pass: 'devil666' }
        ];
        
        const isValid = validUsers.some(u => u.user === username && u.pass === password);
        
        if (isValid) {
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                user: username,
                token: 'devil_token_' + Date.now()
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
};
