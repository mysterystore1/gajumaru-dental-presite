// DEC-015: Eleventy(SSG) + _data/site.json 参照方式（CLAUDE.md §1/§6）
// ソース=src/ 出力=dist/。既存の /honban/・ルート index.html には関与しない
module.exports = function (eleventyConfig) {
  // 静的アセット（design-tokens.css 等）をそのまま dist/assets/ へ
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
  };
};
