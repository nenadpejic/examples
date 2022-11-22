module.exports = function (migration) {
  // Create a new category field in the blog post content type.
  // id = "category", name = "Category", type = "Symbol" ("Short text")
  migration
    .editContentType("blogPost")
    .createField("category")
    .name("Category")
    .type("Symbol");
};
