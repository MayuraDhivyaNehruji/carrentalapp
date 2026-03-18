var mysql = require('../database/mysql');

function getBookingForFeedback(userid, callback) {
    let query = "SELECT id, CONCAT(reservation_datetime, '-', location) AS 'reservation_details' FROM reservation WHERE user_id=" + userid + ";";
    mysql.executeQuery(query, function (err, result) {
        if (err){
            callback(err, null);
        }

        if (result.length > 0){
            callback(null, result);
        }else {
            let error = {};
            error["message"] = "No records found with userId " + userid;
            callback(error, false);
        }
    });
}

function saveFeedback(details, callback){
    let query = "INSERT INTO feedback(reservation_id, experience, car_condition, comments, user_id) VALUES(" + details.reservation_id + ", '" + details.experience + "', '" + details.car_condition + "', '" + details.comments + "', " + details.userid + ");";
    mysql.executeQuery(query, function (err) {
        if (err){
            callback(err);
        }

        callback(null);
    });
}

module.exports.getBookingForFeedback = getBookingForFeedback;
module.exports.saveFeedback = saveFeedback;