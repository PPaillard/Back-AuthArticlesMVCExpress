const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
  constructor() {
    super({ table: "article" });
  }

  find(id) {
    return this.connection.query(
      `select ${this.table}.*,  
    user.lastname, user.firstname, category.title as category_title from  ${this.table}
    JOIN category ON category.id = ${this.table}.category_id
    JOIN user ON ${this.table}.user_id = user.id where ${this.table}.id = ?`,
      [id]
    );
  }

  // Override
  findAll() {
    return this.connection.query(`select ${this.table}.*,  
    user.lastname, user.firstname, category.title as category_title from  ${this.table}
    JOIN category ON category.id = ${this.table}.category_id
    JOIN user ON ${this.table}.user_id = user.id`);
  }

  insert(article) {
    return this.connection.query(
      `INSERT INTO ${this.table} (title, content, user_id, category_id) VALUES (?, ?, ?, ?)`,
      [article.title, article.content, article.user_id, article.category_id]
    );
  }

  update(article) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      article,
      article.id,
    ]);
  }
}

module.exports = ArticleManager;
