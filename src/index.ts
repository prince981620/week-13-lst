require('dotenv').config();
import express from 'express';
import { burnTokens, mintTokens, sendNativeTokens } from './mintTokens';

const app = express();
app.use(express.json());
app.get('/helius',(req,res)=>{
    console.log("working");
    res.status(400).json({
        msg: "working"
    })
})
 
// "nativeTransfers": [
//     {
//       "amount": 1000000000,
//       "fromUserAccount": "7MBcR9GQs94CWwL2SwzgSuhTa8guzb1dAVTDPCpnFzr9",
//       "toUserAccount": "BYq5RpPNPa4WEHJgNtapdP2Re5wtyzNSTLbcNwtdguM8"
//     }

app.post('/helius', async(req, res) => {
    // const body = req.body.json();
    console.log(req.body);

    const fromAddress = req.body.nativeTransfers[0].fromUserAccount;
    const toAddress = req.body.nativeTransfers[0].toUserAccount;
    const amount = req.body.nativeTransfers[0].amount;
    const type = "received_native_sol";

    if (type === "received_native_sol") {
        await mintTokens(fromAddress, toAddress, amount);
    } else {
        // What could go wrong here?
        await burnTokens(fromAddress, toAddress, amount);
        await sendNativeTokens(fromAddress, toAddress, amount);
    }

    res.send('Transaction successful');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});