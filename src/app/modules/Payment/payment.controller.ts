import catchAsync from "../../utilits/catchAsync";
import { paymentService } from "./payment.service";

const confirmtionController = catchAsync(async (req, res) => {
  const { transactionId, status } = req.query;
  const result = await paymentService.paymentUpdate(
    transactionId as string,
    status as string
  );
  res.send(result);
});
export const paymentController = {
  confirmtionController,
};
