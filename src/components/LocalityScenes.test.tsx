import { describe, expect, it } from 'vitest';
import { wordsForPhoto } from './LocalityScenes';
import { getLocalGallery } from '../data/galleries';
import { getLocalLearning } from '../data/learning';
import { mapPoints } from '../data/languages';

describe('photo reading relevance', () => {
  it('does not attach unrelated town or body words to every street photo', () => {
    const point = mapPoints.find((place) => place.id === 'wenchang')!;
    const photo = getLocalGallery(point.id).find((entry) => entry.id === 'wenchang-old-street')!;
    expect(wordsForPhoto(photo, getLocalLearning(point).words)).toEqual([]);
  });
  it('matches an attested object in a caption without matching a substring', () => {
    const point = mapPoints.find((place) => place.id === 'wenchang')!;
    const photo = getLocalGallery(point.id)[0];
    const word = getLocalLearning(point).words.find((entry) => entry.english === 'book')!;
    expect(wordsForPhoto({ ...photo, title: 'Books on a table' }, [word])).toEqual([word]);
    expect(wordsForPhoto({ ...photo, title: 'A booking office' }, [word])).toEqual([]);
  });
});
