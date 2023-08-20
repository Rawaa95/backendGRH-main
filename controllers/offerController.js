import Offer from "../models/offerModel.js";

export const createOffer = async (req, res, next) => {
  try {
    const offer = await Offer.create(req.body);
    res.status(201).json({
      status: "success",
      data: { data: offer },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "failure",
      error: "Error creating document",
    });
  }
};




//getOffreById 

export const getOfferById = async (req, res, next) => {
  try {
    const offerId = req.params.id; // Supposons que vous passiez l'ID dans les paramètres de la requête.
    const offer = await Offer.findById(offerId);
    
    if (!offer) {
      return res.status(404).json({
        status: "failure",
        error: "Offer not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { data: offer },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failure",
      error: "Internal server error",
    });
  }
};

// getAllOffers

export const getAllOffers = async (req, res, next) => {
  try {
    const offers = await Offer.find();

    res.status(200).json({
      status: "success",
      data: { data: offers },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failure",
      error: "Internal server error",
    });
  }
};

//searchOffers


export const searchOffers = async (req, res, next) => {
  try {
    const searchTerm = req.query.q; // Supposons que vous passiez le terme de recherche dans les paramètres de la requête.
    const offers = await Offer.find({ $text: { $search: searchTerm } });

    res.status(200).json({
      status: "success",
      data: { data: offers },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failure",
      error: "Internal server error",
    });
  }
};



