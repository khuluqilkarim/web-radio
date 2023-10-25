const RadioBrowser = require("radio-browser");
const express = require("express");
const app = express();
const port = 3000;

app.get("/radio/:limit/:by/:tag", (req, res) => {
  const limit = req.params.limit;
  const by = req.params.by;
  const tag = req.params.tag;

  let filter = {
    limit: parseInt(limit),
    by: by,
    searchterm: tag,
  };

  RadioBrowser.getStations(filter)
    .then((data) => {
      const stations = data.map((stations) => ({
        nama: stations.name,
        url: stations.url,
        url_resolve: stations.url_resolved,
        favicon: stations.favicon,
      }));
      res.send(stations);
      console.log(stations.length);
    })
    .catch((error) => console.error(error));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/radio/5/tag/jazz`);
});
