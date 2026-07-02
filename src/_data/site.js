// グローバルデータ `site`＝リポルート _data/site.json（機械可読SSOT・人間用正本は CLINIC_FACTS.md）
// 複製を持たずルートの正本を直接読む（CLAUDE.md §1: site.json 以外へのハードコード禁止）
const fs = require("node:fs");
const path = require("node:path");

module.exports = () =>
  JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "..", "_data", "site.json"), "utf-8")
  );
