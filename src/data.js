// İçerik burada. Yeni çizgi roman / model / kitap eklemek için sadece bu listeleri düzenleyin.
// Dosyalar public/comics, public/models, public/books klasörlerinde durur.

export const comics = [
  { id: 'ijuttaut', file: 'comics/ijuttaut.jpg', title: 'Ijuttaut', tools: { tr: 'Kamçı, top', en: 'Whip, ball' } },
  { id: 'bench-reach', file: 'comics/bench-reach.jpg', title: 'Bench Reach', sub: { tr: 'Bank üzerinde uzanma', en: 'Reaching from a bench' }, tools: { tr: 'Tahta blok, bank', en: 'Wooden block, bench' } },
  { id: 'stick-jump', file: 'comics/stick-jump.jpg', title: 'Stick Jump', sub: { tr: 'Sopa üstünden atlama', en: 'Jumping over a stick' }, tools: { tr: 'Süpürge sapı', en: 'Broomstick' } },
  { id: 'twist-around-stick', file: 'comics/twist-around-stick.jpg', title: 'Twist Around Stick', sub: { tr: 'Sopa etrafında dönme', en: 'Twisting around a stick' }, tools: { tr: 'Süpürge sapı', en: 'Broomstick' } },
  { id: 'tunummijuk', file: 'comics/tunummijuk.jpg', title: 'Tunummijuk', tools: { tr: 'Tebeşir', en: 'Chalk' } },
];

export const models = [
  { id: 'bench-reach', file: 'models/bench-reach.glb', icon: '🪑', title: 'Bench Reach' },
  { id: 'ear-lift', file: 'models/ear-lift.glb', icon: '👂', title: 'Ear Lift' },
  { id: 'hand-pull', file: 'models/hand-pull.glb', icon: '🪪', title: 'Hand Pull' },
  { id: 'imilugtaq', file: 'models/imilugtaq.glb', icon: '❄️', title: 'Imilugtaq' },
  { id: 'nuqluqtuk', file: 'models/nuqluqtuk.glb', icon: '🎯', title: 'Nuqluqtuk' },
];

export const books = [
  { id: 'rapor', file: 'books/proje-raporu.pdf', title: { tr: 'Proje Raporu', en: 'Project Report' }, desc: { tr: 'İnuit oyun kültürü araştırma raporu', en: 'Inuit game culture research report' } },
  { id: 'g2', file: 'books/inuit-games-2.pdf', title: { tr: 'Inuit Games 2', en: 'Inuit Games 2' }, desc: { tr: 'Oyun kitabı – Cilt 2', en: 'Games book – Vol. 2' } },
  { id: 'g3', file: 'books/inuit-games-3.pdf', title: { tr: 'Inuit Games 3', en: 'Inuit Games 3' }, desc: { tr: 'Oyun kitabı – Cilt 3', en: 'Games book – Vol. 3' } },
  { id: 'g4', file: 'books/inuit-games-4.pdf', title: { tr: 'Inuit Games 4', en: 'Inuit Games 4' }, desc: { tr: 'Oyun kitabı – Cilt 4', en: 'Games book – Vol. 4' } },
  { id: 'g5', file: 'books/inuit-games-5.pdf', title: { tr: 'Inuit Games 5', en: 'Inuit Games 5' }, desc: { tr: 'Oyun kitabı – Cilt 5', en: 'Games book – Vol. 5' } },
];

export const videos = [
  // Örnek: { title: { tr: 'Animasyon', en: 'Animation' }, url: 'https://youtu.be/XXXX' }
];

export const i18n = {
  tr: {
    appTitle: 'Eskimo Oyunları',
    home: 'Ana Sayfa', comics: 'Çizgi Roman', models: '3D Model', books: 'Kitaplar',
    heroTitle: 'İnuit Oyun Kültürü',
    heroText: 'İnuit/Eskimo oyun kültürünün sınıflandırılması, 3D modelleme, dijital animasyon ve çizgi romanın oluşturulması.',
    stGames: 'İnuit Oyunu', stComics: 'Çizgi Roman', stModels: '3D Model', stBooks: 'Kitap',
    summaryT: 'Proje Özeti',
    summary: 'Bu projede Inuit Games ve Eskimo Games kaynaklarında bulunan 137 geleneksel İnuit oyunu incelenmiş, sınıflandırılmış ve kültürel açıdan değerlendirilmiştir. Seçilen oyunların 3B modelleri hazırlanmış, dijital animasyonları ve çizgi romanları oluşturulmuştur.',
    resultT: 'Araştırma Sonuçları',
    result: 'İnuit oyunları yalnızca eğlence aracı değil, aynı zamanda kültürel aktarım, fiziksel gelişim ve toplumsal dayanışmanın önemli bir parçasıdır. Bu çalışma ile 137 oyun incelenmiş, oyunlar dijital ortama aktarılmış ve görünür hale getirilmiştir.',
    tools: 'Araçlar', modelHint: 'Sürükle: döndür • İki parmak: yakınlaştır',
    loading: 'Yükleniyor…', page: 'Sayfa', close: 'Kapat', open: 'Aç', videosT: 'Videolar', site: 'inuit.tr web sitesi',
    pdfError: 'Kitap açılamadı.', modelError: 'Model yüklenemedi.',
  },
  en: {
    appTitle: 'Eskimo Games',
    home: 'Home', comics: 'Comics', models: '3D Models', books: 'Books',
    heroTitle: 'Inuit Game Culture',
    heroText: 'Classification of Inuit/Eskimo game culture, 3D modelling, digital animation and comics.',
    stGames: 'Inuit games', stComics: 'Comics', stModels: '3D models', stBooks: 'Books',
    summaryT: 'Project Summary',
    summary: 'In this project, 137 traditional Inuit games found in Inuit Games and Eskimo Games sources were examined, classified and evaluated culturally. 3D models of selected games were built, and digital animations and comics were created.',
    resultT: 'Research Results',
    result: 'Inuit games are not only entertainment, but also an important part of cultural transmission, physical development and social solidarity. This study examined 137 games and brought them into the digital world.',
    tools: 'Equipment', modelHint: 'Drag: rotate • Pinch: zoom',
    loading: 'Loading…', page: 'Page', close: 'Close', open: 'Open', videosT: 'Videos', site: 'inuit.tr website',
    pdfError: 'Could not open the book.', modelError: 'Could not load the model.',
  },
};
