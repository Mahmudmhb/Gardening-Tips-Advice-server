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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.varifyPayment = exports.initialPayment = void 0;
const config_1 = __importDefault(require("../../config"));
const axios_1 = __importDefault(require("axios"));
const initialPayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId, totalCost, customerName, custormarEmail, custormarPhone, } = paymentData;
    const response = yield axios_1.default.post(config_1.default.payment_url, {
        store_id: config_1.default.store_id,
        signature_key: config_1.default.signature_id,
        tran_id: transactionId,
        success_url: `https://assignment-6-server-steel.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
        fail_url: `https://assignment-6-server-steel.vercel.app/api/payment/confirmation?status=faild`,
        cancel_url: "https://rental-car-reservation.netlify.app/",
        amount: totalCost,
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: customerName,
        cus_email: custormarEmail,
        cus_add1: "House B-158 Road 22",
        cus_add2: "Mohakhali DOHS",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1206",
        cus_country: "Bangladesh",
        cus_phone: custormarPhone,
        type: "json",
    });
    //   console.log(response);
    return response.data;
});
exports.initialPayment = initialPayment;
const varifyPayment = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(config_1.default.payment_varifyUrl, {
        params: {
            store_id: config_1.default.store_id,
            signature_key: config_1.default.signature_id,
            type: "json",
            request_id: transactionId,
        },
    });
    return response.data;
});
exports.varifyPayment = varifyPayment;
