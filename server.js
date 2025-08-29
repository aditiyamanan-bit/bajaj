const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Personal details (replace with your own)
const USER_DETAILS = {
    user_id: "bajajManan",
    email: "aaditiyamanan2022@vitstudent.ac.in", 
    roll_number: "22BCE2020"
};

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array"
            });
        }

        let oddNumbers = [];
        let evenNumbers = [];
        let alphabets = [];
        let specialCharacters = [];
        let numericSum = 0;

        // Process each element in the array
        data.forEach(item => {
            const str = String(item);
            
            // Check if it's a number
            if (!isNaN(str) && !isNaN(parseFloat(str)) && isFinite(str)) {
                const num = parseInt(str);
                numericSum += num;
                
                if (num % 2 === 0) {
                    evenNumbers.push(str);
                } else {
                    oddNumbers.push(str);
                }
            }
            // Check if it's alphabetic
            else if (/^[A-Za-z]+$/.test(str)) {
                alphabets.push(str.toUpperCase());
            }
            // Everything else is a special character
            else {
                specialCharacters.push(str);
            }
        });

        // Create concatenated string from alphabets in reverse order with alternating case
        let concatString = "";
        if (alphabets.length > 0) {
            // Flatten all alphabets into individual characters
            let allChars = alphabets.join('').split('');
            
            // Reverse the order
            allChars.reverse();
            
            // Apply alternating case (uppercase first, then lowercase)
            concatString = allChars.map((char, index) => {
                return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
            }).join('');
        }

        const response = {
            is_success: true,
            ...USER_DETAILS,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: String(numericSum),
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// GET endpoint for verification
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.listen(PORT, () => {
    console.log("Server running on port ${PORT}");
});

module.exports = app;