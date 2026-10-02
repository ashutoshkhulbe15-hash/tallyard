const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname,"..");

function normalize(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,"")
    .replace(/<[^>]+>/g, "").replace(/&#x([0-9a-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16)))
    .replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)))
    .replace(/&(?:quot|apos|amp|lt|gt|nbsp);/g,n=>({"&quot;":'"',"&apos;":"'","&amp;":"&","&lt;":"<","&gt;":">","&nbsp;":" "}[n]))
    .replace(/\s+/g,"");
}
function inventory(html) {
  const chunks = [];
  for (const tag of ["h2","h3","p","li","figcaption","td","th","svg"]) {
    for(const m of html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`,"g"))) {
      const text=normalize(m[1]);
      if(text)chunks.push({tag,text});
    }
  }
  const links=[...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]);
  return {chunks,links};
}
function verify() {
  const baseline=JSON.parse(fs.readFileSync(path.join(root,"tests/editorial-baseline.json"),"utf8"));
  const results=[];
  let blocks=0, links=0;
  for(const page of baseline.pages) {
    const file=path.join(root,".next/server/app",page.route.slice(1)+".html");
    assert.ok(fs.existsSync(file),`${page.route}: missing built page`);
    const html=fs.readFileSync(file,"utf8");
    const text=normalize(html);
    for(const chunk of page.chunks)assert.ok(text.includes(chunk.text),`${page.route}: missing original ${chunk.tag}: ${chunk.text.slice(0,110)}`);
    for(const link of page.links)assert.ok(html.includes(`href="${link}"`),`${page.route}: missing original link ${link}`);
    blocks+=page.chunks.length; links+=page.links.length;
    results.push({route:page.route,originalWords:page.originalWords,originalBlocks:page.chunks.length,retained:true});
  }
  console.log(`Verified original editorial content on ${results.length} routes: ${blocks} text/diagram/table blocks and ${links} links retained in built HTML.`);
  const heat=results.find(page=>page.route==='/heat-pump-calculator');
  console.log(`Heat pump article: ${heat.originalWords} original words; every original text/diagram/table block retained.`);
  return results;
}
module.exports={normalize,inventory,verify};
if(require.main===module)verify();
