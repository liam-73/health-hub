const R = require('ramda');

// modules
const { photoUpload } = require('../modules/photo');
const { getDatesInRange } = require('../modules/dates');

// schema
const UserModel = require('../models/user.model');

const addUser = async (userData, avatarData) => {
  try {
    const isUsedEmail = await UserModel.findOne({ email: userData.email });

    if (isUsedEmail) throw new Error('This email is already used!');

    let profile;

    if (avatarData) {
      profile = await photoUpload(avatarData);
    }

    const user = await UserModel.create({
      ...userData,
      profile,
    });

    return user;
  } catch (e) {
    throw e;
  }
};

const getUserById = async (user_id) => {
  try {
    const user = await UserModel.findById(user_id);

    if (!user) throw new Error('User not found!');

    return user;
  } catch (e) {
    throw e;
  }
};

const getUsers = async (query) => {
  const {
    skip,
    limit,
    sort,
    search,
    start_date,
    end_date,
    user_type,
    is_all_employees,
  } = query;

  let filter = {};

  if (search) {
    filter.name = new RegExp(search, 'i');
  }

  if (start_date && end_date) {
    filter.createdAt = { $gt: start_date, $lt: end_date };
  }

  if (user_type && !is_all_employees) {
    filter.user_type = user_type;
  }

  if (user_type == 'EMPLOYEE') {
    filter.user_type = {
      $nin: ['DOCTOR', 'PATIENT'],
    };
  }

  if (is_all_employees) {
    filter.user_type = { $ne: 'PATIENT' };
  }

  try {
    const users = await UserModel.find(filter)
      .limit(+limit)
      .skip(+skip)
      .sort(sort);

    return users;
  } catch (e) {
    throw e;
  }
};

const getUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error('User not found!');

  return user;
};

const getUsersByDate = async (start_date, end_date, user_type) => {
  try {
    // const days = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT' ];

    const dates = getDatesInRange(start_date, end_date);
    end_date.setHours(23, 59);

    const data = await UserModel.aggregate([
      {
        $match: {
          user_type: user_type ? 'PATIENT' : { $ne: 'PATIENT' },
          createdAt: {
            $gt: start_date,
            $lt: end_date,
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: '%m-%d-%Y',
              date: '$createdAt',
            },
          },
        },
      },
      {
        $group: {
          _id: '$date',
          count: { $sum: 1 },
        },
      },
    ]);

    const result = R.compose(
      R.mergeRight(R.zipObj(dates, new Array(7).fill(0))),
      R.mergeAll,
      R.map(({ _id, count }) => ({ [_id]: count })),
    );

    return result(data);
  } catch (e) {
    throw e;
  }
};

const editUser = async ({ userId, userData, avatarData }) => {
  try {
    const edits = Object.keys(userData);

    const user = await UserModel.findById(userId);

    if (!user) throw new Error('User not found!');

    if (avatarData) {
      const profile = await photoUpload(avatarData);

      user.profile = profile;
    }

    edits.forEach((edit) => (user[edit] = userData[edit]));

    return await user.save();
  } catch (e) {
    throw e;
  }
};

const deleteUser = async (user_id) => {
  try {
    const user = await UserModel.findById(user_id);

    if (!user) throw new Error('User not found!');

    return await user.remove();
  } catch (e) {
    throw e;
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  editUser,
  deleteUser,
  getUserByEmail,
  getUsersByDate,
};
