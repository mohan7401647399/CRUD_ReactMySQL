const mySql = require("mysql");

// MYSQL

const con = mySql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})


// home page
exports.view = (req, res) => {
    // check db connection
    con.getConnection((err, connection) => {
        if (err) throw err
        // console.log("connection success");
        connection.query("select * from usersAll", (err, rows) => {
            connection.release();
            if (!err) {
                // console.log("Good");
                res.render("home", { rows });
            } else {
                console.log("Error" + err);

            }
        })
    });
};

// add user page
exports.addusers = (req, res) => {
    res.render("addusers")
};


// save user data
exports.save = (req, res) => {

    con.getConnection((err, connection) => {
        if (err) throw err

        const { name, age, city } = req.body;

        // console.log("connection success");
        connection.query("insert into usersall (name,age,city) values (?,?,?)", [name, age, city], (err, rows) => {
            connection.release();
            if (!err) {
                // console.log("Good");
                res.render("addusers", { msg: "user details added" });
            } else {
                console.log("Error in Listing Data" + err);

            }
        })
    })
};


// edit user
exports.edituser = (req, res) => {

    con.getConnection((err, connection) => {
        if (err) throw err

        let id = req.params.id;

        // console.log("connection success");
        connection.query("select * from usersall where id=?", [id], (err, rows) => {
            connection.release();
            if (!err) {
                // console.log("Good");
                res.render("edituser", { rows });
            } else {
                console.log("Error" + err);

            }
        })
    });
};


// save user data
exports.edit = (req, res) => {

    con.getConnection((err, connection) => {
        if (err) throw err

        let id = req.params.id;

        const { name, age, city } = req.body;

        // console.log("connection success");
        connection.query("update usersall set name=?,age=?,city=? where ID=?", [name, age, city, id], (err, rows) => {
            connection.release();
            if (!err) {

                con.getConnection((err, connection) => {
                    if (err) throw err

                    let id = req.params.id;

                    // console.log("connection success");
                    connection.query("select * from usersall where id=?", [id], (err, rows) => {
                        connection.release();
                        if (!err) {
                            // console.log("Good");
                            res.render("edituser", { rows, msg: "user details edited" });
                        } else {
                            console.log("Error in Listing Data" + err);

                        }
                    })
                });
            }
        })
    })
};

// delete
exports.delete = (req, res) => {
    con.getConnection((err, connection) => {

        if (err) throw err;

        // get Id from URL
        let id = req.params.id;

        connection.query("delete from usersall where id=?", [id], (err, rows) => {
            connection.release();
            if (!err) {
                res.redirect("/")
            } else {
                console.log(err);
            }
        })
    })
}