import { Types } from 'mongoose';
import Member from '../models/members';

export const getAll = async (req, res, next) => {
  try {
    let total_members = 0;
    let total_shares = 0;
    const members = await Member.find();

    if (members.length) {
      total_members = members.length;
      total_shares = members
        .map((item) => item.shares)
        .reduce((prev, next) => prev + next);
    }
    return res.status(200).json({
      success: true,
      total_shares,
      total_members,
      members: members,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
export const getSingle = async (req, res, next) => {
  try {
    const user = await Member.findById(req.params.memberId)
      .select('_id name email location committee shares image')
      .exec();
    return res
      .status(200)
      .json({ success: true, data: user || 'member not found!' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
export const create = async (req, res, next) => {
  try {
    const member = new Member({
      ...req.body,
      _id: new Types.ObjectId(),
      image: req.file.path,
    });
    const user = await member.save();
    return res.status(201).json({
      success: true,
      data: {
        message: 'member successfully created',
        member: user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
export const edit = async (req, res, next) => {
  try {
    const changes = {};
    for (const op of req.body) {
      changes[op.propName] = op.value;
    }
    await Member.update(
      { _id: req.params.memberId },
      { $set: updateOps }
    ).exec();

    const member = await Member.findById(req.params.memberId).exec();
    return res.status(200).json({
      success: true,
      data: { message: 'Member successfully edited', member },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
export const deleteOne = async (req, res, next) => {
  try {
    await Member.remove({ _id: req.params.memberId });
    return res
      .status(200)
      .json({ success: true, data: 'member successfully deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
