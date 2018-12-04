module.exports = {
    getWelcomePage: (req, res) => {
        res.render('static.ejs', {
            title: "Bienvenidos",
            css: css
        });
    },
    getPausePage: (req, res) => {
        res.render('static.ejs', {
            title: "Volvemos en pocos minutos",
            css: css
        });
    },
    getFinishPage: (req, res) => {
        res.render('static.ejs', {
            title: "Gracias por particiar",
            css: css
        });
    },
};