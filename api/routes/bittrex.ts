import express from 'express';
import axios from 'axios';

const router = express.Router();

interface IParams {
    req: express.Request;
    res: express.Response;
    next: express.NextFunction;
}

router.get('/', async ({req, res, next}: IParams) => {
    const result = await axios.get("https://api.bittrex.com/v3/markets/ETH-BTC/orderbook");
    res.send(result.data);
})

export default router;