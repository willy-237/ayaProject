//je definis ici le modèle des tournées

import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
    city:{
        type: String,
        trim: true,
        required: "city name is required"
    },
    concertHall: {
        type: String,
        trim: true,
        required: "Concert Hall name is required"
    },
    country:{
        type: String,
        trim: true,
        required: "Country name is required"
    },
    time:{
        type: String,
        match: [/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, "Time is required at the format HH:mm"],
        required: "Time of the concert is required"
    },
    date:{
        type: String,
        match: [/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "Date is required at the format dd/mm/yyyy"],
        required: "Date of the concert is required "
    },
    imageConcertHall:{
        type: Buffer,
        
    }

})

tourSchema.pre("save", async function(next){
    const concert = await this.constructor.findOne({
        date: this.date,
        time: this.time,
        country: this.country,
        city: this.city,
        concertHall: this.concertHall
    });
    if (concert) {
        const err = new Error('Another concert is already scheduled at this time and place.');
        return next(err);
    }
    next();
})

export default mongoose.model("Tour", tourSchema)