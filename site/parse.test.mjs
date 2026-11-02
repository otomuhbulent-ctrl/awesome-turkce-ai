import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { aramaAnahtari, filtrele, readmeParse } from "./parse.js";

const ORNEK = `# Başlık

## İçindekiler

- [Yerli Platformlar](#yerli-platformlar)

## Yerli Platformlar

- [EVREN](https://evren.ssyz.org.tr) - Yerli platform. ([Rehber](rehberler/x.md))

## Veri Setleri

- [OSCAR](https://example.com/oscar) - Çok dilli **derlem**.
- bozuk satır [link yok
- [Eksik açıklama](https://example.com)

## Lisans

- [CC0](https://creativecommons.org) - Lisans satırı listeye girmez.
`;

test("bölümler ve maddeler ayrıştırılır, atlanan bölümler dahil edilmez", () => {
  const k = readmeParse(ORNEK);
  assert.deepEqual(
    k.map((x) => [x.bolum, x.ad]),
    [["Yerli Platformlar", "EVREN"], ["Veri Setleri", "OSCAR"]],
  );
});

test("açıklamadaki markdown sadeleşir", () => {
  const [evren, oscar] = readmeParse(ORNEK);
  assert.equal(evren.aciklama, "Yerli platform. (Rehber)");
  assert.equal(oscar.aciklama, "Çok dilli derlem.");
});

test("bozuk ya da boş girdi hata fırlatmaz", () => {
  assert.deepEqual(readmeParse(""), []);
  assert.deepEqual(readmeParse(null), []);
  assert.deepEqual(readmeParse("## Bölüm\n- [kırık](\n- ]["), []);
});

test("Türkçe harfler doğru eşleşir", () => {
  assert.equal(aramaAnahtari("İSTANBUL"), "istanbul");
  assert.equal(aramaAnahtari("IŞIK"), "isik");
  assert.equal(aramaAnahtari("Türkçe Doğal Dil"), "turkce dogal dil");
  assert.equal(aramaAnahtari("ĞÜŞÖÇ"), "gusoc");
});

test("filtre: Türkçe arama, çok kelime ve bölüm", () => {
  const k = readmeParse(ORNEK);
  assert.deepEqual(filtrele(k, "COK DILLI", null).map((x) => x.ad), ["OSCAR"]);
  assert.deepEqual(filtrele(k, "yerli platform", null).map((x) => x.ad), ["EVREN"]);
  assert.deepEqual(filtrele(k, "", "Veri Setleri").map((x) => x.ad), ["OSCAR"]);
  assert.deepEqual(filtrele(k, "evren", "Veri Setleri"), []);
});

test("gerçek README en az bir kaynak üretir ve her kaynak dolu", () => {
  const k = readmeParse(readFileSync(new URL("../README.md", import.meta.url), "utf8"));
  assert.ok(k.length >= 20, `beklenenden az kaynak: ${k.length}`);
  for (const x of k) assert.ok(x.bolum && x.ad && x.url && x.aciklama, JSON.stringify(x));
});
