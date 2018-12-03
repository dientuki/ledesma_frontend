module.exports = {
    getSetPage: (req, res) => {
        res.render('set.ejs', {
            title: "Setea tu empresa"
        });
    }
};