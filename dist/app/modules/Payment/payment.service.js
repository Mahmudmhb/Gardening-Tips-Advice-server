"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const user_model_1 = require("../user/user.model");
const payment_utlis_1 = require("./payment.utlis");
const paymentUpdate = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(transactionId, status);
    const varifyResponse = yield (0, payment_utlis_1.varifyPayment)(transactionId);
    let result;
    if (varifyResponse && varifyResponse.pay_status === "Successful") {
        result = yield user_model_1.User.findOneAndUpdate({ transactionId }, {
            verified: true,
        }, { new: true });
    }
    return ` <div style="text-align: center; margin-top: 50px;">
  <h1 style="color: green;">Payment ${status}</h1>
  <p style="font-size: 18px; color: #333;">
    Thank you for your purchase. You will be redirected to the home page shortly.
  </p>
  <button style="padding: 10px 20px; text-align: center; background-color: #4CAF50; border: none; color: white; cursor: pointer;">
    <a href="http://localhost:3000/" style="color: white; text-decoration: none;">Home</a>
  </button>
</div>
`;
});
exports.paymentService = {
    paymentUpdate,
};
