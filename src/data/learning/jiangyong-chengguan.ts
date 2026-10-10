import type { AttestedWord, BranchLearning, LearningSource } from './types';

const localityId = 'jiangyong-chengguan';
const bookUrl = 'https://archive.org/details/jiangyong-fangyan-yanjiu-9787800503879';
const characterSource: LearningSource = {
  title: 'Huang Xuezhen 1993 · p. 41 · Chengguan character readings',
  url: `${bookUrl}/page/n55/mode/2up`,
};
const toneSource: LearningSource = {
  title: 'Huang Xuezhen 1993 · p. 9 · Chengguan tone key',
  url: `${bookUrl}/page/n23/mode/2up`,
};
const streetSource: LearningSource = {
  title: 'Liu Yue-bing · Xiaopu Street field report · Hunan Daily · 20 July 2022',
  url: 'https://m.voc.com.cn/xhn/news/202207/13980188.html',
};

// Bounded factual selection, manually checked against printed p. 41 and the p. 9 key.
// The book retains its original copyright. No scan or extended prose is reproduced.
const selectedReadings: [string, string, string, string?][] = [
  ['妈', 'Character 妈', 'ma⁴⁴'],
  ['弥', 'Character 弥', 'ma⁴²'],
  ['迷', 'Character 迷', 'ma⁴²'],
  ['眉', 'Character 眉', 'ma⁴²'],
  ['奶', 'grandmother; used in address', 'ma³⁵', 'The source explicitly glosses this as an address to one’s grandmother; it is not the meaning “milk”.'],
  ['美', 'Character 美', 'ma¹³'],
  ['媚', 'Character 媚', 'ma²¹'],
  ['蜜', 'Character 蜜', 'ma³³'],
  ['密', 'Character 密', 'ma³³'],
  ['肥', 'Character 肥', 'fa⁴²'],
  ['非', 'Character 非', 'fa⁴⁴'],
  ['飞', 'Character 飞', 'fa⁴⁴', 'The source illustrates this reading with 飞机 and cross-refers another reading elsewhere; fa44 is not claimed for every use of 飞.'],
];

const words: AttestedWord[] = selectedReadings.map(([han, english, ipa, qualification]) => ({
  id: `huang1993-chengguan-${han.codePointAt(0)!.toString(16)}`,
  learningKind: han === '奶' ? 'word' : 'character-reading',
  han,
  english,
  ipa: `[${ipa}]`,
  toneNotation: 'pitch-contour',
  localityId,
  reading: han === '奶' ? 'Published address term' : 'Published character reading',
  registerLabel: `Chengguan Tuhua · focused survey 1987 · published 1993 · ${han === '奶' ? 'address term' : 'character reading'}`,
  note: `${qualification ? `${qualification} ` : ''}${han === '奶' ? 'A local address term explicitly defined in the source.' : 'A homophone-table entry, not a complete everyday expression. The English label identifies the written character only.'} Pitch digits transcribe the source’s five-degree tone marks. No connected-speech form or recording is supplied.`,
  source: characterSource,
}));

export const jiangyongChengguanLearning: BranchLearning[] = [{
  branchId: 'tuhua/southern-hunan',
  words,
  soundNotes: [
    {
      title: 'One syllable, six tone contours',
      text: 'The selected ma readings distinguish 44, 42, 35, 13, 21 and 33: compare 妈, 眉, 奶, 美, 媚 and 蜜. These are pitch contours on a five-level scale, not numbered tone classes. Different characters can also share one pronunciation, as 密 and 蜜 do here.',
      localityIds: [localityId],
      source: characterSource,
    },
    {
      title: 'A short high entering tone',
      text: 'The full Chengguan key also lists a short high entering tone as 5, alongside 44, 42, 35, 13, 21 and 33. Short 5 is not rewritten as 55, and the tone label alone does not supply a final consonant. No example of this tone occurs in the twelve-reading starter.',
      localityIds: [localityId],
      source: toneSource,
    },
  ],
  culture: [
    {
      title: 'Handmade scales on Xiaopu Street',
      text: 'In a 2022 visit to the county town’s Xiaopu Street, Hunan Daily documented a maker shaping, calibrating and marking wooden steelyard balances, alongside shops repairing everyday tools. The report follows working shops within the old street, rather than treating county-wide traditions as one neighbourhood’s customs.',
      localityIds: [localityId],
      source: streetSource,
    },
    {
      title: 'Wenchang Pavilion by the river',
      text: 'Xiaopu Street’s lanes lead to shops along the Yongming River. The same field report describes the riverside Wenchang Pavilion as an eight-sided, five-storey brick-and-timber building dating to 1749. This is the county-town pavilion, not the similarly named landmark in Shanggantang village.',
      localityIds: [localityId],
      source: streetSource,
    },
  ],
  resources: [
    {
      title: 'Huang’s Chengguan survey',
      description: 'The 1993 monograph documents the focused 1987 Chengguan survey. See printed pp. 1, 9 and 41 for scope, tones and this small selection. Original-author copyright; HanLingo reproduces selected reading facts, not the book or its scans.',
      localityIds: [localityId],
      kind: 'Study',
      url: bookUrl,
    },
    {
      title: 'Chengguan and Xiaopu',
      description: 'Jiangyong County’s administrative history records the June 1995 return from the town name Chengguan to Xiaopu. Today’s wider administrative area does not define the reach of the 1987 speech sample.',
      localityIds: [localityId],
      kind: 'Culture',
      url: 'https://www.jiangyong.gov.cn/jiangyong/xzqh/list_tt.shtml',
    },
    {
      title: 'A walk through Xiaopu Street',
      description: 'A 2022 reported visit to the county town’s historic streets, workshops and riverside pavilion. This is cultural context, not a recording or proof of the interviewees’ speech variety.',
      localityIds: [localityId],
      kind: 'Culture',
      url: streetSource.url,
    },
  ],
}];
