const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!")
        console.log(err)
    });

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price= Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author: '6814fa653389da8160c676a3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dignissimos libero dolore sit optio eaque doloribus officiis beatae, nam unde numquam reprehenderit sunt sed explicabo quia accusamus sequi. Dolore, illo!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dvdagayss/image/upload/v1746432737/YelpCamp/ovk9fa3hvgcivggq0azf.jpg',
                  filename: 'YelpCamp/ovk9fa3hvgcivggq0azf',
                },
                {
                  url: 'https://res.cloudinary.com/dvdagayss/image/upload/v1746432741/YelpCamp/zgeb8i9tnaktaqrfebhq.jpg',
                  filename: 'YelpCamp/zgeb8i9tnaktaqrfebhq',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})