module.exports = {
  getGlobalPage: (req, res) => {
    let query = "SELECT company, SUM(point) as totalPoints FROM `points`  INNER JOIN company2team ON points.fk_c2t = company2team.id  INNER JOIN business ON company2team.fk_company = business.id group by fk_company order by totalPoints desc"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect('/');
      }
      res.render('global.ejs', {
        title: "Welcome to Socka | View Players",
        games: result
      });
    });
  },
};