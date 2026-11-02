<div align="center">

# 🇹🇷 Awesome Türkçe Yapay Zekâ

**Türkçe yapay zekâ ve doğal dil işleme için derlenmiş açık kaynak modeller, veri setleri, araçlar ve platformlar.**

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Link Kontrolü](https://github.com/otomuhbulent-ctrl/awesome-turkce-ai/actions/workflows/link-check.yml/badge.svg)](https://github.com/otomuhbulent-ctrl/awesome-turkce-ai/actions/workflows/link-check.yml)
[![Katkılar Açık](https://img.shields.io/badge/katk%C4%B1lar-a%C3%A7%C4%B1k-brightgreen.svg)](CONTRIBUTING.md)
[![Lisans: CC0](https://img.shields.io/badge/lisans-CC0-lightgrey.svg)](LICENSE)

**[🔎 Aranabilir sürüm: otomuhbulent-ctrl.github.io/awesome-turkce-ai](https://otomuhbulent-ctrl.github.io/awesome-turkce-ai/)**

</div>

Türkçe kaynaklar dağınık ve bulması zor. Bu liste, Türkçe ile çalışan yapay zekâ modellerini, veri setlerini ve araçlarını tek bir yerde topluyor. Yeni başlayan öğrenciden araştırmacıya kadar herkes için.

> ⭐ İşine yaradıysa yıldız vererek daha çok kişiye ulaşmasına yardım edebilirsin.

## İçindekiler

- [Rehberler](#rehberler)
- [Yerli Platformlar](#yerli-platformlar)
- [Büyük Dil Modelleri (LLM)](#büyük-dil-modelleri-llm)
- [Encoder Modelleri (BERT ve benzerleri)](#encoder-modelleri-bert-ve-benzerleri)
- [Konuşma ve Ses](#konuşma-ve-ses)
- [NLP Kütüphaneleri ve Araçlar](#nlp-kütüphaneleri-ve-araçlar)
- [Veri Setleri](#veri-setleri)
- [Değerlendirme ve Benchmark](#değerlendirme-ve-benchmark)
- [Katkıda Bulun](#katkıda-bulun)

## Rehberler

Bu repoda hazırlanan adım adım Türkçe rehberler:

- [EVREN'e Başlangıç Rehberi](rehberler/evren-baslangic-rehberi.md) - e-Devlet ile girişten Python ile ilk API isteğine kadar 10 dakikada EVREN.
- [EVREN Cookbook](https://github.com/otomuhbulent-ctrl/evren-cookbook) - EVREN için çalışan, test edilmiş örnekler; ilki taranmış Türkçe PDF'e kaynak göstererek soru-cevap.

## Yerli Platformlar

- [EVREN](https://evren.ssyz.org.tr) - Savunma Sanayii Başkanlığı bünyesinde geliştirilen yerli yapay zekâ platformu. Veri etiketleme, H200 GPU kümesinde model eğitimi ve açık ağırlıklı LLM'lere OpenAI uyumlu API ile erişim sunar; veri yurt içinde kalır. ([Başlangıç rehberi](rehberler/evren-baslangic-rehberi.md))

## Büyük Dil Modelleri (LLM)

- [Turkish-Llama-8b-Instruct](https://huggingface.co/ytu-ce-cosmos/Turkish-Llama-8b-Instruct-v0.1) - YTÜ COSMOS ekibinin Llama 3 tabanlı, Türkçe talimat takibi için eğitilmiş modeli.
- [Trendyol LLM](https://huggingface.co/Trendyol/Trendyol-LLM-7b-chat-v0.1) - Trendyol'un Türkçe sohbet için ince ayar yaptığı 7B parametreli model.
- [TURNA](https://huggingface.co/boun-tabi-LMG/TURNA) - Boğaziçi Üniversitesi TABILAB'ın Türkçe için sıfırdan eğittiği encoder-decoder dil modeli.
- [Kanarya](https://huggingface.co/asafaya/kanarya-750m) - Türkçe metin üzerinde sıfırdan eğitilmiş 750M parametreli GPT tarzı model.
- [Turkish GPT-2](https://huggingface.co/ytu-ce-cosmos/turkish-gpt2) - YTÜ COSMOS'un Türkçe GPT-2 modeli; küçük boyutuyla deneme ve öğrenme için ideal.

## Encoder Modelleri (BERT ve benzerleri)

- [BERTurk](https://huggingface.co/dbmdz/bert-base-turkish-cased) - Türkçe için en yaygın kullanılan BERT modeli; sınıflandırma, NER ve benzeri görevler için başlangıç noktası.
- [Turkish BERT ailesi](https://github.com/stefan-it/turkish-bert) - BERTurk, ConvBERTurk ve ELECTRA Türkçe modellerinin tamamı, eğitim detayları ve sonuçları.

## Konuşma ve Ses

- [Whisper](https://github.com/openai/whisper) - Türkçe dahil çok dilli açık kaynak konuşma tanıma modeli.

## NLP Kütüphaneleri ve Araçlar

- [Zemberek-NLP](https://github.com/ahmetaa/zemberek-nlp) - Türkçe morfolojik analiz, kök bulma, yazım denetimi ve normalizasyon için Java kütüphanesi.
- [VNLP](https://github.com/vngrs-ai/vnlp) - VNGRS'in Türkçe için hazırladığı Python NLP kütüphanesi: varlık tanıma, duygu analizi, bağımlılık ayrıştırma ve daha fazlası.
- [Turkish NLP Suite](https://github.com/turkish-nlp-suite) - Türkçe için spaCy modelleri, veri setleri ve araçlar.
- [Stanza](https://stanfordnlp.github.io/stanza/) - Stanford'un Türkçe modeli de bulunan çok dilli NLP kütüphanesi.

## Veri Setleri

- [OSCAR](https://huggingface.co/datasets/oscar-corpus/OSCAR-2301) - Web'den derlenmiş büyük çok dilli metin derlemi; Türkçe alt kümesi dil modeli eğitimi için kullanılır.
- [Türkçe Wikipedia](https://huggingface.co/datasets/wikimedia/wikipedia) - Wikipedia'nın temizlenmiş metin dökümleri (`20231101.tr` alt kümesi).
- [Turkish NLP Suite Veri Setleri](https://huggingface.co/turkish-nlp-suite) - Türkçe NER, duygu analizi ve diğer görevler için etiketli veri setleri.

## Değerlendirme ve Benchmark

- [Mukayese](https://github.com/alisafaya/mukayese) - Türkçe NLP görevleri için kapsamlı benchmark ve karşılaştırma çalışması.
- [TurkishMMLU](https://github.com/ArdaYueksel/TurkishMMLU) - Türkçe dil modellerinin bilgi ve muhakeme yeteneğini ölçen çoktan seçmeli soru seti.

## Katkıda Bulun

Bu liste toplulukla büyüyor. Bildiğin bir kaynak eksikse ekleyebilirsin: [katkı rehberini](CONTRIBUTING.md) okuyup bir Pull Request aç ya da [issue](https://github.com/otomuhbulent-ctrl/awesome-turkce-ai/issues) ile öner.

## Lisans

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

Bu liste [CC0 1.0](LICENSE) ile kamu malıdır. Listelenen her kaynak kendi lisansına tabidir.
