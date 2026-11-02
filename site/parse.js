// README.md'deki "## Bölüm" başlıklarını ve "- [Ad](url) - açıklama" satırlarını kaynak listesine çevirir.
// Biçime uymayan satırlar atlanır; parser hiçbir girdide hata fırlatmaz.

const ATLANAN_BOLUMLER = new Set(["İçindekiler", "Katkıda Bulun", "Lisans"]);
const MADDE = /^\s*[-*]\s+\[([^\]]+)\]\((https?:\/\/[^)\s]+|[^)\s:]+)\)\s*[-–—]\s*(.+?)\s*$/;
const BASLIK = /^##\s+(.+?)\s*$/;
const MD_LINK = /\[([^\]]+)\]\([^)]*\)/g;

export function readmeParse(md) {
  const kaynaklar = [];
  let bolum = null;
  for (const satir of String(md ?? "").split(/\r?\n/)) {
    const b = BASLIK.exec(satir);
    if (b) {
      bolum = ATLANAN_BOLUMLER.has(b[1]) ? null : b[1];
      continue;
    }
    if (!bolum) continue;
    const m = MADDE.exec(satir);
    if (!m) continue;
    kaynaklar.push({
      bolum,
      ad: m[1].trim(),
      url: m[2],
      aciklama: m[3].replace(MD_LINK, "$1").replace(/[`*_]/g, "").trim(),
    });
  }
  return kaynaklar;
}

// Türkçe duyarlı arama anahtarı: tr-TR küçük harf, ardından aksanlar sadeleşir
// ("Türkçe", "TURKCE" ve "türkçe" aynı anahtara iner; "İ" doğru biçimde "i" olur).
const SADE = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };

export function aramaAnahtari(metin) {
  return String(metin ?? "")
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşüâîû]/g, (h) => SADE[h])
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function filtrele(kaynaklar, sorgu, bolum) {
  const kelimeler = aramaAnahtari(sorgu).split(/\s+/).filter(Boolean);
  return kaynaklar.filter((k) => {
    if (bolum && k.bolum !== bolum) return false;
    const metin = aramaAnahtari(`${k.ad} ${k.aciklama} ${k.bolum}`);
    return kelimeler.every((w) => metin.includes(w));
  });
}
