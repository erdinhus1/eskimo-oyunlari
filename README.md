# Eskimo Oyunları (inuit.tr) – Android uygulaması

## APK nasıl alınır (bilgisayara bir şey kurmadan)
1. github.com'da ücretsiz hesap aç → **New repository** (ad: eskimo-oyunlari, Private olabilir).
2. Bu klasörün **içindekileri** (klasörün kendisini değil) repoya yükle: "Add file → Upload files".
   Not: `.github` klasörü gizli olabilir; yüklendiğinden emin ol. 100'den fazla dosya/büyük PDF'lerde tarayıcı yüklemesi zorlarsa GitHub Desktop kullan.
3. Repo → **Actions** → "Android APK" → birkaç dakika sonra yeşil tik.
4. Çalışan iş akışına tıkla → en altta **Artifacts → eskimo-oyunlari-apk** → indir, zip'ten `app-debug.apk` çıkar.
5. APK'yı telefona gönder, aç ("bilinmeyen kaynaklardan yükle" iznini ver).

## İçerik ekleme / değiştirme
- Çizgi roman: `public/comics/` içine görsel koy, `src/data.js` → `comics` listesine ekle.
- 3D model: `public/models/` içine .glb koy, `models` listesine ekle (OBJ → GLB: `npx obj2gltf -i x.obj -b`).
- Kitap: `public/books/` içine PDF koy, `books` listesine ekle.
- Video: `src/data.js` → `videos` listesine link ekle.
