// Ici je definis le modèle de ceux qui vont gérer le site

import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required",
    },
    email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        required: "Email is required"
    },
    created: {
        type: Date,
        default: Date.now
    },

    //On ne va pas stocker le mot de passe directement dans la base de données
    //On va plutot stocker le mot de passe encryptée

    hashed_password: {
        type: String,
        required: "Password is required"
    },
    salt: String,
    updated: Date,
    status: {
        type: String,
        default: "Collaborator"
    }
});


//propriété virtuelle pour le mot de passe 
userSchema.virtual("password").set(function(password){
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function(){
    return this._password;
});


userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password){
        if(!password) return '';
        
        try{
            return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
        }catch(err){
            return "";
        }
    },
    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random())) + ""
    }
}

//fonction pour valider le mot de passe
userSchema.path("hashed_password").validate(function(v){
    if(this._password && this._password.length < 6){
        this.invalidate("password", "password must be at least 6 characters.")
    }
    if(this.isNew && !this._password){
        this.invalidate("password", "Password is required")
    }
});

//fonction pour verifier si il y a des champs dupliqués
userSchema.pre("save", async function(next){
    const name = await this.constructor.findOne({
        name: this.name,
    });
    const email = await this.constructor.findOne({
        email: this.email,
    });
    const name_email =  await this.constructor.findOne({
        name: this.name,
        email: this.email,
    });
    
    let message = "";
    
    if(name_email){
        message = 'This account already exists';
        return next(new Error(message));
    }else if(name){
        message = 'This name already exists';
        return next(new Error(message));
    }else if(email){
        message = 'This email already exists'
        return next(new Error(message));
    }
    
    return next();
        
})

//fonction pour verifier qu'il reste au moins 1 admin avant de supprimer un compte admin
userSchema.pre("deleteOne", { document: true } ,async function(next){
    const users = await this.constructor.find({
        status: this.status
    })
    if(users[0].status === "Admin"){
        if(users.length === 1){
            return next(new Error("There must be at least one Admin available"))
        }
    }
    
    return next();
        
})

export default mongoose.model("User", userSchema)