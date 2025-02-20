const models = require("../models");

const browse = (req, res) => {
  models.article
    .findAll()
    .then(([articles]) => {
      res.send(articles);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.article
    .find(req.params.id)
    .then(([articles]) => {
      if (articles[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(articles[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = async (req, res) => {
  const article = req.body;

  // TODO validations (length, format...)

  article.id = parseInt(req.params.id, 10);

  try {
    const [dbArticles] = await models.article.find(req.params.id);

    // si article non trouvé
    if (!dbArticles[0] == null) return res.sendStatus(404);
    // Si pas autorisé
    console.log(dbArticles[0]);
    console.log(req.payloads.sub);
    if (dbArticles[0].user_id !== req.payloads.sub) return res.sendStatus(403);
    await models.article.update(article);
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const add = (req, res) => {
  const article = req.body;
  article.user_id = req.payloads.sub;

  // TODO validations (length, format...)

  models.article
    .insert(article)
    .then(([result]) => {
      res.location(`/articles/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const [dbArticles] = await models.article.find(id);
    // si article non trouvé
    if (dbArticles[0] == null) return res.sendStatus(404);
    // Si pas autorisé
    if (dbArticles[0].user_id !== req.payloads.sub) return res.sendStatus(403);
    // On delete
    await models.article.delete(id);
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
