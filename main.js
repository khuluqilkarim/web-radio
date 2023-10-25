const RadioBrowser = require("radio-browser");
const express = require("express");
const app = express();
const port = 3000;

let filter = {
  limit: 5, // list max 5 items
  by: "tag", // search in tag
  searchterm: "jazz", // term in tag
};
RadioBrowser.getStations(filter)
  .then((data) => {
    app.get("/", (req, res) => {
      let cards = ""; // Initialize an empty string to store the card HTML

      // Iterate over the data and generate a card for each item
      data.forEach((station, i) => {
        cards += `
          <div class="card">
            <img src="${station.favicon}" alt="Image ${i + 1}" />
            <h3>${station.name}</h3>
            <p>${station.tags}</p>
            <button class="play-button">Play</button>
          </div>`;
      });

      // Send the HTML containing all the cards
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Play Radio</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }

            .card {
              width: 300px;
              border: 1px solid #ccc;
              border-radius: 5px;
              padding: 15px;
              margin: 10px;
              text-align: center;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .card h3 {
              font-size: 1.5rem;
            }

            .card p {
              font-size: 1rem;
            }

            .play-button {
              background-color: #007bff;
              color: #fff;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
            }

            .card img {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          ${cards} <!-- Insert the generated cards here -->
        </body>
        </html>
      `);
    });
  })
  .catch((error) => console.error(error));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
