const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/debug', (req, res) => {
  const code = req.body.code;

  const tempFilePath = path.join(__dirname, 'tempCode.js');
  fs.writeFileSync(tempFilePath, code);

  exec(`node ${tempFilePath}`, (error, stdout, stderr) => {
    fs.unlinkSync(tempFilePath); // Clean up temp file

    if (error) {
      return res.status(200).send({ result: `Error: ${stderr}` });  // Still return 200 so frontend can display
    }

    res.send({ result: stdout });
  });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
