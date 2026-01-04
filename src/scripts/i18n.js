/**
 * Lightweight i18n engine for Linguistic Guide
 * Handles language switching and content replacement from CSV source
 */

class Translator {
    constructor() {
        this.currentLang = this.getInitialLanguage();
        this.translations = {};
        this.csvPath = '/assets/translations.csv';
    }

    getInitialLanguage() {
        // 1. Check localStorage
        const stored = localStorage.getItem('site_lang');
        if (stored) return stored;

        // 2. Check browser settings
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.split('-')[0].toLowerCase();

        // Supported: en, de, ro
        if (['en', 'de', 'ro'].includes(shortLang)) {
            return shortLang;
        }

        // 3. Fallback to English
        return 'en';
    }

    async init() {
        await this.loadTranslations();
        this.applyTranslations();
        this.updateLangAttributes();
        this.setupSwitchers();
    }

    async loadTranslations() {
        try {
            const response = await fetch(this.csvPath);
            const csvText = await response.text();
            this.translations = this.parseCSV(csvText);
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }

    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const translations = { en: {}, de: {}, ro: {} };
        const headers = ['key', 'en', 'de', 'ro'];

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;

            const row = this.parseCSVRow(lines[i]);
            if (row.length < 4) {
                console.warn(`Row ${i} in CSV is invalid (less than 4 columns):`, lines[i]);
                continue;
            }

            const [key, en, de, ro] = row;
            translations.en[key] = en;
            translations.de[key] = de;
            translations.ro[key] = ro;
        }
        return translations;
    }

    parseCSVRow(row) {
        const result = [];
        let startValueIndex = 0;
        let inQuotes = false;

        for (let i = 0; i < row.length; i++) {
            if (row[i] === '"') {
                inQuotes = !inQuotes;
            } else if (row[i] === ',' && !inQuotes) {
                let value = row.substring(startValueIndex, i).trim();
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.substring(1, value.length - 1).replace(/""/g, '"');
                }
                result.push(value);
                startValueIndex = i + 1;
            }
        }

        let lastValue = row.substring(startValueIndex).trim();
        if (lastValue.startsWith('"') && lastValue.endsWith('"')) {
            lastValue = lastValue.substring(1, lastValue.length - 1).replace(/""/g, '"');
        }
        result.push(lastValue);

        return result;
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        const langData = this.translations[this.currentLang];

        if (!langData) return;

        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (langData[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.hasAttribute('placeholder')) {
                        el.placeholder = langData[key];
                    }
                } else if (el.tagName === 'META') {
                    el.content = langData[key];
                } else {
                    el.innerHTML = langData[key];
                }
            }
        });

        if (this.translations[this.currentLang]['meta_title']) {
            document.title = this.translations[this.currentLang]['meta_title'];
        }
    }

    updateLangAttributes() {
        document.documentElement.lang = this.currentLang;
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    setLanguage(lang) {
        if (lang === this.currentLang) return;
        this.currentLang = lang;
        localStorage.setItem('site_lang', lang);
        this.applyTranslations();
        this.updateLangAttributes();
    }

    setupSwitchers() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.setLanguage(btn.getAttribute('data-lang'));
            });
        });
    }
}

export const translator = new Translator();
