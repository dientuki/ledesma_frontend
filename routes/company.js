module.exports = {
  getCompanyResultPage: (req, res) => {
    let company = req.params.company;
    let bestCompany = "SELECT color, team, sum(point) as teamPoint FROM `points` INNER JOIN company2team ON points.fk_c2t = company2team.id INNER JOIN teams ON company2team.fk_team = teams.id where fk_company = " + company + " group by fk_team order by teamPoint desc limit 1"; // query database to get all the players
    let bestTeam = "SELECT color, company, sum(point) as teamPoint FROM `points`   INNER JOIN company2team ON points.fk_c2t = company2team.id   INNER JOIN teams ON company2team.fk_team = teams.id   INNER JOIN business ON company2team.fk_company = business.id   group by fk_team, fk_company order by teamPoint desc limit 1";
    let bestGlobal = "SELECT company, SUM(point) as totalPoints FROM `points`  INNER JOIN company2team ON points.fk_c2t = company2team.id  INNER JOIN business ON company2team.fk_company = business.id group by fk_company order by totalPoints desc limit 1"; // query database to get all the players

    // execute query
    db.query(bestCompany, (err, resultBestCompany) => {
      if (err) {
        res.redirect('/');
      }

      db.query(bestTeam, (err, resultBestTeam) => {
        if (err) {
          res.redirect('/');
        }

        db.query(bestGlobal, (err, resultBestGlobal) => {
          if (err) {
            res.redirect('/');
          }

          res.render('companyscore.ejs', {
            title: "Ganadores del juego",
            company: resultBestCompany,
            team: resultBestTeam,
            business: resultBestGlobal,
            css: css
          });

        });

      });
    });
  },
};