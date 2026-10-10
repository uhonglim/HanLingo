import type { AttestedWord, BranchLearning } from './types';
import ledger from '../../../docs/qiyang-xiang-provenance.json';

const localityId = 'qiyang-study';
const paper = { title: 'Zhu Xiaonong & Zhang Caicai · Qiyang acoustic study · 2008', url: ledger.source.url };
const classification = {
  title: 'Wang Zhongli · Phonetic Study of Qiyang Dialect · 2020',
  url: ledger.scope.classificationSource,
};
const opera = { title: 'China Intangible Cultural Heritage · Qiju · project IV-128', url: 'https://www.ihchina.cn/project_details/13539/' };
const inscriptions = { title: 'Hunan Provincial Archives · Wuxi cliff inscriptions · 2006', url: 'https://sdaj.hunan.gov.cn/wszt/xxsl/msgj/200609/t20060927_1977756.html' };

const words: AttestedWord[] = ledger.records.map(record => ({
  id: record.id, han: record.han, english: record.english, ipa: record.ipa,
  localityId, writingStatus: 'attested',
  learningKind: record.learningKind === 'word' ? 'word' : 'character-reading',
  toneNotation: 'pitch-contour', reading: 'Published elicitation example',
  registerLabel: 'Qiyang County study · published 2008 · town and collection date unspecified',
  note: `${record.note} These are the paper’s supplied pitch contours, not its T1–T7 category numbers. The publication does not supply a playable recording for this selection.`,
  source: { ...paper, title: 'Zhu & Zhang 2008 · p. 1113 · Table 1' },
}));

export const qiyangXiangLearning: BranchLearning[] = [{
  branchId: 'xiang/yongquan', words,
  soundNotes: [
    {
      title: 'A fall, a rise, and another fall',
      text: '霸 [pa³²⁴³] and 帝 [ti³²⁴³] illustrate the study’s falling–rising–falling contour. The four digits follow the supplied pitch sequence; reducing it to three would remove one turn. The paper discusses whether the final fall is linguistically significant, so this is its published description rather than a settled account of every Qiyang variety.',
      localityIds: [localityId], source: { ...paper, title: 'Zhu & Zhang 2008 · pp. 1113–1115 · Table 1 and §5' },
    },
    {
      title: 'Voice quality belongs in the transcription',
      text: 'For 爬, 离, 罢 and 白, the authors describe slack-voiced obstruents. Their table places two dots above p and below the following a, while both t and i carry dots below. HanLingo retains those printed marks and the source’s description; the marks are not tone accents. The study recorded twelve middle-aged speakers and analyzed nine, without identifying their towns or the collection date.',
      localityIds: [localityId], source: { ...paper, title: 'Zhu & Zhang 2008 · pp. 1113–1114 · §2, Table 1, §§4.1.1 and 4.1.3' },
    },
  ],
  culture: [
    {
      title: 'Qiju’s voices and painted faces',
      text: 'Qiju takes its name from Qiyang. The national heritage record describes its Gao, Kun and Tan vocal styles, accompanying drums and qihu, and faces painted around red, black and white. It calls the stage language Qiyang guanhua; a theatrical register should not be equated with the conversational sample in this acoustic study.',
      localityIds: [localityId], source: opera,
    },
    {
      title: 'Calligraphy cut into Wuxi’s cliffs',
      text: 'Beside the Xiang River near Qiyang, Wuxi preserves inscriptions carved into exposed rock. The Hunan Provincial Archives describes the Great Tang Restoration Ode, written by Yuan Jie and rendered in Yan Zhenqing’s calligraphy, carved there in 771. Later inscriptions made the site a layered record of literary visits. The cliffs are regional cultural context, not a documented recording site.',
      localityIds: [localityId], source: inscriptions,
    },
  ],
  resources: [
    { title: 'The original acoustic study', description: 'Three-page ISCA paper with the selected Han forms, IPA and English meanings in Table 1. Its supplied four-target contours and voice-quality marks remain intact. Copyright 2008 ISCA; no open reuse licence is stated.', kind: 'Study', url: paper.url, localityIds: [localityId] },
    { title: 'Qiyang’s linguistic classification', description: 'Wang Zhongli’s 2020 publisher abstract places Qiyang in Yong–Quan Xiang, Dong–Qi. This book and the 2008 acoustic study are separate investigations, with no established identity between their consultants.', kind: 'Study', url: classification.url, localityIds: [localityId] },
    { title: 'Qiju heritage record', description: 'The national entry for Qiyang’s theatre tradition documents its vocal styles, instruments and performance language.', kind: 'Culture', url: opera.url, localityIds: [localityId] },
    { title: 'Wuxi cliff inscriptions', description: 'A provincial archive account identifies the riverside site and the authorship and carving of its Tang inscription.', kind: 'Culture', url: inscriptions.url, localityIds: [localityId] },
  ],
}];
