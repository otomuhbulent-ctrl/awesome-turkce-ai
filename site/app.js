import { filtrele, readmeParse } from "./parse.js";

const REPO = "https://github.com/otomuhbulent-ctrl/awesome-turkce-ai";
const KAYNAKLAR = [
  "README.md",
  "https://raw.githubusercontent.com/otomuhbulent-ctrl/awesome-turkce-ai/main/README.md",
];

const $ara = document.getElementById("ara");
const $filtreler = document.getElementById("filtreler");
const $durum = document.getElementById("durum");
const $liste = document.getElementById("liste");

let tumu = [];
let seciliBolum = null;

async function readmeGetir() {
  for (const url of KAYNAKLAR) {
    try {
      const r = await fetch(url, { cache: "no-cache" });
      if (r.ok) return await r.text();
    } catch {
      // bir sonraki kaynağı dene
    }
  }
  throw new Error("README okunamadı");
}

function tamUrl(url) {
  return /^https?:\/\//.test(url) ? url : `${REPO}/blob/main/${url}`;
}

function el(etiket, ozellikler = {}, ...cocuklar) {
  const e = document.createElement(etiket);
  Object.assign(e, ozellikler);
  e.append(...cocuklar);
  return e;
}

function filtreleriCiz(bolumler) {
  const hepsi = [null, ...bolumler];
  $filtreler.replaceChildren(
    ...hepsi.map((b) => {
      const btn = el("button", { type: "button", textContent: b ?? "Tümü", className: "cip" });
      btn.setAttribute("aria-pressed", String(b === seciliBolum));
      btn.addEventListener("click", () => {
        seciliBolum = b;
        filtreleriCiz(bolumler);
        ciz();
      });
      return btn;
    }),
  );
}

function ciz() {
  const sonuc = filtrele(tumu, $ara.value, seciliBolum);
  $durum.textContent = sonuc.length
    ? `${sonuc.length} kaynak gösteriliyor`
    : "Aramanla eşleşen kaynak yok.";

  const gruplar = new Map();
  for (const k of sonuc) {
    if (!gruplar.has(k.bolum)) gruplar.set(k.bolum, []);
    gruplar.get(k.bolum).push(k);
  }

  $liste.replaceChildren(
    ...[...gruplar].map(([bolum, kaynaklar]) =>
      el(
        "section",
        { className: "grup" },
        el("h2", { textContent: bolum }),
        el(
          "ul",
          { className: "izgara" },
          ...kaynaklar.map((k) =>
            el(
              "li",
              {},
              el(
                "a",
                { className: "kart", href: tamUrl(k.url) },
                el("strong", { textContent: k.ad }),
                el("span", { textContent: k.aciklama }),
                el("span", { className: "alan", textContent: new URL(tamUrl(k.url)).hostname }),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

async function basla() {
  try {
    tumu = readmeParse(await readmeGetir());
    if (!tumu.length) throw new Error("README'de kaynak bulunamadı");
  } catch {
    $durum.replaceChildren(
      "Liste şu an yüklenemedi. Kaynakların tamamını ",
      el("a", { href: `${REPO}#readme`, textContent: "GitHub'daki README" }),
      " üzerinden görebilirsin.",
    );
    return;
  }
  filtreleriCiz([...new Set(tumu.map((k) => k.bolum))]);
  $ara.addEventListener("input", ciz);
  ciz();
}

basla();
