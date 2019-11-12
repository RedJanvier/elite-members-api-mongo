const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Member = require('../models/members');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/profile/');
    },
    filename: function(req, file, cb){
        cb(null, new Date() + " - " + file.originalname);
    }
})
const upload = multer({ storage });

router.get('/', (req, res, next) => {
    Member.find()
        .then(members => {
            const total_members = members.length;
            const total_shares = members.map(item => item.shares).reduce((prev, next) => prev + next);
            if(members.length){
                res.status(200).json({ 
                    total_shares, 
                    total_members, 
                    members: members.map(member => {
                       return ({
                            _id: member._id,
                            name: member.name,
                            email: member.email,
                            shares: member.shares,
                            image: member.image,
                            other_requests: [
                                {
                                    type: 'POST',
                                    endpoint: 'http://localhost:3000/members',
                                    payload: {
                                        name: 'HERE_GOES_THE_FULL_NAME',
                                        email: 'HERE_GOES_THE_EMAIL',
                                        shares: 'HERE_GOES_THE_SHARES_NUMBER_AS_NUMBER',
                                        location: 'HERE_GOES_THE_LOCATION_NAME',
                                        committee: 'HERE_GOES_THE_COMMITTEE_ROLE',
                                    }
                                },
                                {
                                    type: 'GET',
                                    endpoint: 'http://localhost:3000/members/' + member._id
                                },
                                {
                                    type: 'PATCH',
                                    endpoint: 'http://localhost:3000/members/' + member._id,
                                    payload: [
                                        {
                                            propName: "HERE_GOES_THE_PROPERTY_YOU_NAME",
                                            value: "HERE_GOES_THE_NEW_VALUE_FOR_PROPNAME"
                                        }
                                    ],
                                    comment: "YOU_CAN_ALSO_CHANGE_MORE_PROPERTIES_BY_ADDING_MORE_OBJECTS_TO_PAYLOAD_ARRAY_AS_IN_THE_EXAMPLE"
                                }
                            ]
                        })
                    })
                });
            } else {
                res.status(404).json({ message: 'there is no member yet!'});
            }
        })
        .catch(err => res.status(500).json({ error: err }));
});

router.post('/', upload.single('memberImage'), (req, res, next) => {
    
    const member = new Member({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        location: req.body.location,
        shares: req.body.shares,
        committee: req.body.committee,
        image: req.file.path
    });

    member
        .save()
        .then(user => {
            return res.status(201).json({
                message: 'member successfully created',
                member: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    location: user.location,
                    shares: user.shares,
                    committee: user.committee,
                    image: user.image
                }
            })
        })
        .catch(err => res.status(500).json({ error: err }))
        
});

router.get('/:memberId', (req, res, next) => {
    Member.findById(req.params.memberId)
        .select('_id name email location committee shares image')
        .exec()
        .then(user => {
           if(user){
                res.status(200).json({
                    member: user
                })
            } else {
                res.status(404).json({ message: 'member not found!'})
            }
        })
        .catch(err => res.status(500).json({ error: err }))
});

router.patch('/:memberId', (req, res, next) => {
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Member.update({ _id: req.params.memberId }, { $set: updateOps })
        .exec()
        .then(result => {
            Member.findById(req.params.memberId).exec()
                .then(memb => res.status(200).json({ member: memb }))
                .catch(err => res.status(404).json({ message: 'user not found!', error: err }))
        })
        .catch(err => res.status(500).json({ error: err }));
});

router.delete('/:memberId', (req, res, next) => {
    Member.remove({ _id: req.params.memberId})
        .exec()
        .then(result => res.status(200).json({ message: 'member successfully deleted' }))
        .catch(err => res.status(500).json({ error: err }))
});

module.exports = router;