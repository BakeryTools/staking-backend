
const liquidityPools = require('./liquidityPools.js');
const tokenHandler = require('./tokenHandler');

exports.assignRoutes = (app) => {

    app.get("/api/getTVL", liquidityPools.getTVL);
    app.get("/api/getTotalSupply", tokenHandler.getTotalSupply);
    app.get("/api/getCirculatingSupply", tokenHandler.getCirculatingSupply);

}