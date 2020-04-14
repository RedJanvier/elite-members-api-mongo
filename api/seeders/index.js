import seeder from 'mongoose-seed';
import { config } from 'dotenv';

config();

const data = [
  {
    model: 'Member',
    documents: [
      {
        _id: '5e95cca11c9d4400008f1cce',
        name: 'Alain NIYONEMA',
        email: 'alainyern@gmail.com',
        password: 'electrotech',
        committee: 'IT Manager',
        shares: 9,
        gender: 'male',
        location: 'ETE - Y3',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
      },
    ],
  },
];

seeder.connect(process.env.MONGO_URI, () => {
  seeder.loadModels(['./api/models/members']);
  seeder.populateModels(data, (err, done) => {
    if (err) return console.log('seed error', err);
    if (done) return console.log('seed done', done);
    seeder.disconnect();
  });
});
