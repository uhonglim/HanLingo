import { createServer } from "vite";
import { writeFile } from "node:fs/promises";
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { placeLabel, placeReadingName, placeDisplayName } = await vite.ssrLoadModule("/src/data/language-names.ts");
  const { mapPoints } = await vite.ssrLoadModule("/src/data/languages.ts");
  const { getLocalLearning } = await vite.ssrLoadModule(
    "/src/data/learning/index.ts",
  );
  const places = {
    amoy: "xiamen",
    beijing: "beijing-city",
    shanghai: "shanghai",
    guangzhou: "guangzhou",
    meixian: "meixian",
  };
  const data = Object.fromEntries(
    Object.entries(places).map(([target, id]) => {
      const point = mapPoints.find((p) => p.id === id);
      return [
        target,
        getLocalLearning(point).words.filter(word => word.learningKind !== "character-reading" && word.han).map((word) => ({
          recordId: word.id,
          localityId: word.localityId,
          han: word.han,
          meaning: word.english,
          scope: word.registerLabel || word.reading,
          note: word.note || "",
          source: word.source,
        })),
      ];
    }),
  );
  await writeFile("server/evidence.json", JSON.stringify(data, null, 2) + "\n");
  const languages = {amoy:"nan",beijing:"cmn",shanghai:"wuu",guangzhou:"yue",meixian:"hak"};
  const targetNames = Object.entries(places).map(([id, localityId]) => {
    const point = mapPoints.find(p => p.id === localityId);
    return {id, localityId, commonName:placeLabel(point), localName:placeReadingName(point) ?? null,
      name:placeDisplayName(point), lang:languages[id]};
  });
  targetNames.push({id:"written",localityId:null,commonName:"Standard Written Chinese",localName:null,name:"Standard Written Chinese",lang:"zh"});
  await writeFile("src/data/translation-targets.json", JSON.stringify(targetNames, null, 2) + "\n");
  console.log(
    "Built locality-specific translation grounding; no neighbouring locality substitutions.",
  );
} finally {
  await vite.close();
}
