# EVREN'e Başlangıç Rehberi: İlk Yapay Zekâ İsteğini 10 Dakikada Gönder

> **Kimin için?** Yerli yapay zekâ altyapısını denemek isteyen öğrenciler, geliştiriciler ve meraklılar.
> **Ne öğreneceksin?** EVREN'e giriş yapmayı, tarayıcıda model denemeyi, API anahtarı almayı, kullanım şartlarını kabul etmeyi ve Python ile ilk isteğini göndermeyi.

*Bu, topluluk tarafından hazırlanmış resmî olmayan bir rehberdir. Rakamlar ve model listesi 2 Kasım 2026 tarihinde [EVREN'in herkese açık sayfalarından](https://evren.ssyz.org.tr/llm-inference) alınmıştır; platform geliştikçe değişebilir.*

---

## EVREN nedir?

[EVREN](https://evren.ssyz.org.tr), Savunma Sanayii Başkanlığı bünyesinde geliştirilen uçtan uca yerli bir yapay zekâ platformu. Tek çatı altında şunları sunuyor:

- **LLM çıkarımı:** Açık ağırlıklı büyük dil modellerine OpenAI uyumlu tek bir API ile erişim
- **Veri yönetimi ve etiketleme:** Veri seti versiyonlama, SAM 3 ve YOLO ile otomatik ön etiketleme
- **Model eğitimi:** 64× NVIDIA H200 GPU'luk küme üzerinde dağıtık eğitim
- **Görüntü çıkarımı:** Webcam, görüntü ve video üzerinde gerçek zamanlı nesne tespiti

En önemli farkı: EVREN'in [LLM Çıkarımı sayfasına](https://evren.ssyz.org.tr/llm-inference) göre istemler, yanıtlar ve kullanım kayıtları **Türkiye'deki altyapıda işleniyor, yurt dışına aktarılmıyor.** Verilerin nasıl işlendiğine dair bağlayıcı metin, API'yi kullanmadan önce kabul ettiğin [kullanım şartlarıdır](#adım-4-kullanım-şartlarını-oku-ve-kabul-et).

## Adım 1: e-Devlet ile giriş yap

1. [evren.ssyz.org.tr](https://evren.ssyz.org.tr) adresine git.
2. **e-Devlet ile Giriş Yap** butonuna tıkla ve e-Devlet bilgilerinle giriş yap.
3. [Ana sayfaya](https://evren.ssyz.org.tr) göre ilk girişte başlangıç kredisi tanımlanır.

Ayrı bir kayıt formu yok; e-Devlet hesabın yeterli.

## Adım 2: Tarayıcıda bir model dene

Kod yazmadan önce modelleri tanımanın en kolay yolu sohbet ekranı.

1. Sol menüden **LLM Çıkarım → LLM Sohbet**'i aç.
2. Model olarak **auto**'yu seç. EVREN isteğine göre en uygun modeli kendisi seçer.
3. Türkçe bir soru sor, örneğin: *"Bana Python'da bir listeyi tersine çevirmenin üç yolunu açıkla."*

Farklı modelleri karşılaştırmak için aynı soruyu birkaç modele sor. Hangi model ne için iyi, kısaca:

| İhtiyacın | Önerilen model | Neden |
|---|---|---|
| Ne seçeceğini bilmiyorsan | `auto` | İsteği analiz edip uygun modele yönlendirir |
| Kod yazma, ajan görevleri | `deepseek-v4.1-flash` | 1M bağlam, filoda en çok kullanılan model |
| Derin akıl yürütme, uzun belge | `glm-5.3` | Filonun "amiral" modeli |
| Hızlı, yüksek hacimli sohbet | `qwen3.8-flash-next` | Düşük gecikme, en yüksek eşzamanlılık |
| Görsel / belge anlama | `qwen3-vl-30b`, `gemma-4-31b` | Grafik, ekran görüntüsü ve belge yorumlama |

## Adım 3: API anahtarı oluştur

1. Sol menüden **LLM Çıkarım → API Anahtarları**'na git ve **Yeni Anahtar**'a tıkla.
2. Formu doldur:
   - **Anahtar adı:** Hangi proje için olduğunu anlatan bir ad (ör. `ilk-deneme`).
   - **Sınıf:** `LLM Çıkarım`.
   - **Günlük token tavanı:** İsteğe bağlı ama önerilir. Kodundaki bir hata döngüye girerse günlük kotanın tamamını harcamasını önler (ör. `2000000`).
   - **Son kullanma tarihi:** İsteğe bağlı; unutulan anahtarların sonsuza kadar geçerli kalmaması için bir tarih koymak iyi bir alışkanlıktır.
3. **Oluştur**'a bas ve anahtarı hemen bir yere kaydet. LLM anahtarları `evren_llm_` ile başlar.

LLM API'sinin taban adresi (base URL): **`https://evren-llmapi.ssyz.org.tr/v1`**

> ⚠️ API anahtarını kimseyle paylaşma ve GitHub'a yükleme; anahtar paylaşımı kullanım şartlarınca da yasaktır. Aşağıdaki örnekte olduğu gibi ortam değişkeninde sakla.

## Adım 4: Kullanım şartlarını oku ve kabul et

Yeni bir hesapla yapılan ilk API çağrısı `403` ve `terms_not_accepted` hatası döner. EVREN, LLM geçidini kullanmadan önce kullanım şartlarını açıkça kabul etmeni ister.

Önce şartları oku (yasaklı kullanımlar, faturalama, KVKK kapsamında veri işleme, fesih koşulları):

```bash
curl -H "Authorization: Bearer $EVREN_LLM_API_KEY" https://evren-llmapi.ssyz.org.tr/v1/terms/text
```

Okuyup kabul ediyorsan, hatadaki `required_terms_version` değeriyle onayla (2 Kasım 2026 itibarıyla `1`):

```bash
curl -X POST -H "Authorization: Bearer $EVREN_LLM_API_KEY" -H "Content-Type: application/json" \
     -d '{"version": 1}' https://evren-llmapi.ssyz.org.tr/v1/terms/accept
```

Bu, hesabın adına yapılan bir onaydır; metni okumadan kabul etme. Şartlar esaslı biçimde değişirse yeniden kabul istenir.

## Adım 5: Python ile ilk isteğini gönder

EVREN, OpenAI SDK ile uyumlu olduğu için standart `openai` kütüphanesini kullanabilirsin:

```bash
pip install openai
```

Anahtarını ortam değişkeni olarak tanımla:

```bash
# macOS / Linux
export EVREN_LLM_API_KEY="evren_llm_..."

# Windows (PowerShell)
$env:EVREN_LLM_API_KEY = "evren_llm_..."
```

Ve ilk isteğin:

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["EVREN_LLM_API_KEY"],
    base_url="https://evren-llmapi.ssyz.org.tr/v1",
)

response = client.chat.completions.create(
    model="auto",
    messages=[{"role": "user", "content": "Türkiye'nin en uzun nehri hangisidir? Kısaca açıkla."}],
)

print(response.choices[0].message.content)
```

Yanıtı kelime kelime akış hâlinde almak istersen `stream=True` ekle:

```python
stream = client.chat.completions.create(
    model="auto",
    messages=[{"role": "user", "content": "Bana kısa bir İstanbul şiiri yaz."}],
    stream=True,
)

for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

### Alternatif: resmî EVREN SDK'sı

EVREN'in resmî Python SDK'sı [evren-sdk](https://github.com/speker/evren-sdk), embedding, rerank, OCR ve ses gibi uçlar için hazır yöntemler sunar. Anahtarı aynı `EVREN_LLM_API_KEY` ortam değişkeninden okur:

```bash
pip install evren-sdk
```

```python
from evren_sdk import EvrenLLMClient

with EvrenLLMClient() as llm:
    print(llm.list_models())
```

## Türkçe için öne çıkan modeller

Sohbet modellerinin yanında, Türkçe projelerde işine yarayacak özel modeller de var:

- **`qwen3-embedding-8b`:** Metni vektöre çevirir. Türkçe gömme ölçütü TR-TEB'de birinci sırada; Türkçe arama ve RAG projeleri için.
- **`laya`:** EVREN'in Türkçe için ince ayar yaptığı karar modeli. Metin üretmez; bir metni sınıflandırır (şikâyet mi, acil mi, iptal riski var mı gibi). `/v1/systemone` ucundan çağrılır.
- **`qwen3-asr-1.7b`:** Konuşmayı metne çevirir, Türkçe destekli. Toplantı ve altyazı için.
- **`voxcpm2`:** Metni sese çevirir. Türkçe sayı, tarih ve kısaltmaları doğru okur; dört hazır Türkçe ses sunar (deniz, ece, emre, kaan). `/v1/audio/speech` ucundan çağrılır.

## Kota ve limitler

EVREN'in [LLM Çıkarımı sayfasındaki](https://evren.ssyz.org.tr/llm-inference) "Kota ve Limitler" bölümünde 2 Kasım 2026 itibarıyla ilan edilen değerler (güncel değerler için sayfayı kontrol et):

| Limit | Değer |
|---|---|
| Günlük toplam kota | 15.000.000 token (her gün 03:00'te yenilenir) |
| Dakikalık hacim | 500.000 token |
| Eşzamanlı istek | 32 |
| Ücret | 1 Aralık 2026'ya kadar tüm çıkarım istekleri **ücretsiz** |

Kalan kotanı her yanıtın `x-ratelimit-*` başlıklarında görebilirsin.

## Kredi kazanmak

EVREN'de GPU kullanımı kredi (CR) ile yapılıyor. Kredi kazanmanın yolu platforma katkı vermek: veri yüklemek, etiketlemek, model paylaşmak. Örneğin ilk 100 veriyi yüklediğinde +2 CR, 1.000 veride +15 CR kazanırsın. Tüm kazanım yolları için menüdeki **Kredi Merkezi**'ne bakabilirsin.

## Sonraki adımlar

- Uçtan uca çalışan bir örnek için [EVREN Cookbook](https://github.com/otomuhbulent-ctrl/evren-cookbook)'a bak: taranmış Türkçe PDF'e kaynak göstererek soru-cevap.
- **Kullanımım** sayfasından ne kadar token harcadığını takip et.
- Kendi veri setini yükleyip **Veri Setleri** bölümünü keşfet.
- Türkçe yapay zekâ kaynaklarının tamamı için [Awesome Türkçe Yapay Zekâ](../README.md) listesine göz at.

---

Bu rehberde bir hata ya da eksik mi gördün? [Issue aç](https://github.com/otomuhbulent-ctrl/awesome-turkce-ai/issues) veya Pull Request gönder.
