module.exports = {
  getPerTeamPage: (req, res) => {
    let numberPattern = /\d+/g;
    let company = req.params.company.match( numberPattern )
    let queryTeam = "SELECT team, color, sum(point) as teamPoints FROM `points` INNER JOIN company2team ON points.fk_c2t = company2team.id INNER JOIN teams ON company2team.fk_team = teams.id where fk_company = " + company + "  group by fk_team order by teamPoints desc"; // query database to get all the players
    let queryGlobal = "SELECT color, company, sum(point) as teamPoint FROM `points`   INNER JOIN company2team ON points.fk_c2t = company2team.id   INNER JOIN teams ON company2team.fk_team = teams.id   INNER JOIN business ON company2team.fk_company = business.id   group by fk_team, fk_company order by teamPoint desc limit 10";
    let companyName = "SELECT company FROM business WHERE id =" + company;

    // execute query
    db.query(queryTeam, (err, resultCompany) => {
      if (err) {
        res.redirect('/');
      }

      db.query(queryGlobal, (err, resultGlobal) => {
        if (err) {
          res.redirect('/');
        }

        db.query(companyName, (err, cname) => {
          if (err) {
            res.redirect('/');
          }

          res.render('company.ejs', {
            title: "Posiciones por equipos",
            company: resultCompany,
            globalres: resultGlobal,
            cname: cname,
            css: css
          });
        });


      });
    });
  }
};