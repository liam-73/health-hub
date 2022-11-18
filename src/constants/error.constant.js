const badRequests = [
    "Invalid Input",
    "Invalid Email!",
    "Wrong Password!",
    "You must provide user id!",
    "You must provide doctor id!",
    "You must provide appointment id!",
    "Out of tokens, try again later!",
    "You must provide start date and end date!",
    "You must provide a name and role!",
    "You must provide a name(string)!",
    "You must provide role(string)!",
    "You must only provide 7 days!",
    "You must provide a email(string)!"
];

const notFoundErrors = [
    "There's no admin with this user id!",
    "Doctor not found!",
    "Patient not found!",
    "Appointment not found!",
    "User not found!",
];

module.exports = {
    badRequests,
    notFoundErrors,
};