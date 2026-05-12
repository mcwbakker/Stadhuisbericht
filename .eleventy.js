module.exports = function(eleventyConfig) {

  // Kopieer assets (CSS, eventueel images) naar de output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // Datum-filters voor in templates
  eleventyConfig.addFilter("nlDatum", function(date) {
    const maanden = ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"];
    const d = new Date(date);
    return `${d.getDate()} ${maanden[d.getMonth()]} ${d.getFullYear()}`;
  });

  eleventyConfig.addFilter("maandJaar", function(date) {
    const maanden = ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"];
    const d = new Date(date);
    return `${maanden[d.getMonth()]} ${d.getFullYear()}`;
  });

  // Sorteer edities op datum, nieuwste eerst
  eleventyConfig.addCollection("edities", function(collection) {
    return collection.getFilteredByGlob("src/edities/*.md").sort((a, b) => {
      return new Date(b.data.datum) - new Date(a.data.datum);
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
