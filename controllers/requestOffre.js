import Offer from "../models/requestOfferModel.js";

export const updateOfferStatus = async (req, res, next) => {
  try {
    const offerId = req.params.id;
    const newStatus = req.body.status;

    if (!["accepted", "pending", "refused", "withdraw"].includes(newStatus)) {
      return res.status(400).json({
        status: "failure",
        error: "Invalid status value",
      });
    }

    let updatedOffer;

    if (newStatus === "accepted") {

      updatedOffer = await Offer.findByIdAndUpdate(
      offerId,
        { status: newStatus },
        { new: true }
      );

    } else if (newStatus === "refused") {

      updatedOffer = await Offer.findByIdAndUpdate(
        offerId,
        { status: newStatus },
        { new: true }
      );
      

    } else if (newStatus === "pending" || newStatus === "withdraw") {

      updatedOffer = await Offer.findByIdAndUpdate(
        offerId,
        { status: newStatus },
        { new: true }
      );
   
    } else {
      return res.status(400).json({
        status: "failure",
        error: "Invalid status value",
      });
    }

    res.status(200).json({
      status: "success",
      data: { data: updatedOffer },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failure",
      error: "Internal server error",
    });
  }
};
