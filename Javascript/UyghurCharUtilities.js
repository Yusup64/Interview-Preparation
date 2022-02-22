class UyghurCharUtilities {
    BPAD = 1536;
    BMAX = 1791;
    EPAD = 64256;
    EMAX = 65279;
    CPAD = 1024;
    CMAX = 1279;
    CHEE = 1670;
    GHEE = 1594;
    NGEE = 1709;
    SHEE = 1588;
    SZEE = 1688;

    LA = 'ﻻ';
    _LA = 'ﻼ';
    HAMZA = 1574;

    cyrmap = [];
    cyrmapinv = [];
    pform = {};

    WDBEG = 0;
    INBEG = 1;
    NOBEG = 2;
    lsyn;
    cmap = {
        'A': 1575,
        'a': 1575,
        'B': 1576,
        'b': 1576,
        'C': 1603,
        'c': 1603,
        'D': 1583,
        'd': 1583,
        'E': 1749,
        'e': 1749,
        'F': 1601,
        'f': 1601,
        'G': 1711,
        'g': 1711,
        'H': 1726,
        'h': 1726,
        'I': 1609,
        'i': 1609,
        'J': 1580,
        'j': 1580,
        'K': 1603,
        'k': 1603,
        'L': 1604,
        'l': 1604,
        'M': 1605,
        'm': 1605,
        'N': 1606,
        'n': 1606,
        'O': 1608,
        'o': 1608,
        'P': 1662,
        'p': 1662,
        'Q': 1602,
        'q': 1602,
        'R': 1585,
        'r': 1585,
        'S': 1587,
        's': 1587,
        'T': 1578,
        't': 1578,
        'U': 1735,
        'u': 1735,
        'V': 1739,
        'v': 1739,
        'W': 1739,
        'w': 1739,
        'X': 1582,
        'x': 1582,
        'Y': 1610,
        'y': 1610,
        'Z': 1586,
        'z': 1586,
        'É': 1744,
        'é': 1744,
        'Ö': 1734,
        'ö': 1734,
        'Ü': 1736,
        'ü': 1736,
        ';': 1563,
        '?': 1567,
        ',': 1548,
    };
    constructor() {
        this.pform = {
            [this.cmap['a'] - this.BPAD]: [
                'ﺍ',
                'ﺍ',
                'ﺍ',
                'ﺎ',
                this.WDBEG
            ],
            [this.cmap['e'] - this.BPAD]: [
                'ﻩ',
                'ﻩ',
                'ﻩ',
                'ﻪ',
                this.WDBEG
            ],
            [this.cmap['b'] - this.BPAD]: [
                'ﺏ',
                'ﺑ',
                'ﺒ',
                'ﺐ',
                this.NOBEG
            ],
            [this.cmap['p'] - this.BPAD]: [
                'ﭖ',
                'ﭘ',
                'ﭙ',
                'ﭗ',
                this.NOBEG
            ],
            [this.cmap['t'] - this.BPAD]: [
                'ﺕ',
                'ﺗ',
                'ﺘ',
                'ﺖ',
                this.NOBEG
            ],
            [this.cmap['j'] - this.BPAD]: [
                'ﺝ',
                'ﺟ',
                'ﺠ',
                'ﺞ',
                this.NOBEG
            ],
            [this.CHEE - this.BPAD]: [
                'ﭺ',
                'ﭼ',
                'ﭽ',
                'ﭻ',
                this.NOBEG
            ],
            [this.cmap['x'] - this.BPAD]: [
                'ﺥ',
                'ﺧ',
                'ﺨ',
                'ﺦ',
                this.NOBEG
            ],
            [this.cmap['d'] - this.BPAD]: [
                'ﺩ',
                'ﺩ',
                'ﺪ',
                'ﺪ',
                this.INBEG
            ],
            [this.cmap['r'] - this.BPAD]: [
                'ﺭ',
                'ﺭ',
                'ﺮ',
                'ﺮ',
                this.INBEG
            ],
            [this.cmap['z'] - this.BPAD]: [
                'ﺯ',
                'ﺯ',
                'ﺰ',
                'ﺰ',
                this.INBEG
            ],
            [this.SZEE - this.BPAD]: [
                'ﮊ',
                'ﮊ',
                'ﮋ',
                'ﮋ',
                this.INBEG
            ],
            [this.cmap['s'] - this.BPAD]: [
                'ﺱ',
                'ﺳ',
                'ﺴ',
                'ﺲ',
                this.NOBEG
            ],
            [this.SHEE - this.BPAD]: [
                'ﺵ',
                'ﺷ',
                'ﺸ',
                'ﺶ',
                this.NOBEG
            ],
            [this.GHEE - this.BPAD]: [
                'ﻍ',
                'ﻏ',
                'ﻐ',
                'ﻎ',
                this.NOBEG
            ],
            [this.cmap['f'] - this.BPAD]: [
                'ﻑ',
                'ﻓ',
                'ﻔ',
                'ﻒ',
                this.NOBEG
            ],
            [this.cmap['q'] - this.BPAD]: [
                'ﻕ',
                'ﻗ',
                'ﻘ',
                'ﻖ',
                this.NOBEG
            ],
            [this.cmap['k'] - this.BPAD]: [
                'ﻙ',
                'ﻛ',
                'ﻜ',
                'ﻚ',
                this.NOBEG
            ],
            [this.cmap['g'] - this.BPAD]: [
                'ﮒ',
                'ﮔ',
                'ﮕ',
                'ﮓ',
                this.NOBEG
            ],
            [this.NGEE - this.BPAD]: [
                'ﯓ',
                'ﯕ',
                'ﯖ',
                'ﯔ',
                this.NOBEG
            ],
            [this.cmap['l'] - this.BPAD]: [
                'ﻝ',
                'ﻟ',
                'ﻠ',
                'ﻞ',
                this.NOBEG
            ],
            [this.cmap['m'] - this.BPAD]: [
                'ﻡ',
                'ﻣ',
                'ﻤ',
                'ﻢ',
                this.NOBEG
            ],
            [this.cmap['n'] - this.BPAD]: [
                'ﻥ',
                'ﻧ',
                'ﻨ',
                'ﻦ',
                this.NOBEG
            ],
            [this.cmap['h'] - this.BPAD]: [
                'ﻫ',
                'ﻫ',
                'ﻬ',
                'ﻬ',
                this.NOBEG
            ],
            [this.cmap['o'] - this.BPAD]: [
                'ﻭ',
                'ﻭ',
                'ﻮ',
                'ﻮ',
                this.INBEG
            ],
            [this.cmap['u'] - this.BPAD]: [
                'ﯗ',
                'ﯗ',
                'ﯘ',
                'ﯘ',
                this.INBEG
            ],
            [this.cmap['ö'] - this.BPAD]: [
                'ﯙ',
                'ﯙ',
                'ﯚ',
                'ﯚ',
                this.INBEG
            ],
            [this.cmap['ü'] - this.BPAD]: [
                'ﯛ',
                'ﯛ',
                'ﯜ',
                'ﯜ',
                this.INBEG
            ],
            [this.cmap['w'] - this.BPAD]: [
                'ﯞ',
                'ﯞ',
                'ﯟ',
                'ﯟ',
                this.INBEG
            ],
            [this.cmap['é'] - this.BPAD]: [
                'ﯤ',
                'ﯦ',
                'ﯧ',
                'ﯥ',
                this.NOBEG
            ],
            [this.cmap['i'] - this.BPAD]: [
                'ﻯ',
                'ﯨ',
                'ﯩ',
                'ﻰ',
                this.NOBEG
            ],
            [this.cmap['y'] - this.BPAD]: [
                'ﻱ',
                'ﻳ',
                'ﻴ',
                'ﻲ',
                this.NOBEG
            ],
            [this.HAMZA - this.BPAD]: [
                'ﺋ',
                'ﺋ',
                'ﺌ',
                'ﮌ',
                this.NOBEG
            ]
        }
        this.lsyn = this.pform[this.cmap['l'] - this.BPAD];
    }
    // 文字转到PS识别的文字
    getUyPFStr(str, reverse = true) {
        if (!str) {
            return str;
        }
        let syn = [];
        let tsyn = [];
        let bt = this.WDBEG;
        let strArray = str.split(''); //preg_split("//u", str, -1, PREG_SPLIT_NO_EMPTY);
        let pfstr = "";
        let n = strArray.length;
        let i = 0;
        let j = 0;
        let pfwc = '\0'; // presentation form char
        let prevwc = '\0'; // previous char
        let ppfwc = '\0'; // previous presenation form char
        let pfwp = [];
        for (let i = 0; i < n; i++) {
            let wc = strArray[i].codePointAt(0)//hexdec(json_encode(strArray[i]));

            if ((this.BPAD) <= wc && wc < (this.BMAX)) {

                if (this.pform[wc - this.BPAD]) {
                    syn = this.pform[wc - this.BPAD];
                } else {
                    syn = [];
                }
                if (syn) {
                    if (bt == this.WDBEG || bt == this.INBEG) {
                        pfwc = syn[0];

                    } else {
                        pfwc = syn[3];
                    }
                    // this means the previous letter was a joinable Uyghur
                    // letter
                    if (bt != this.WDBEG) {
                        tsyn = this.pform[prevwc - this.BPAD];

                        // special cases for LA and _LA
                        if (ppfwc == this.lsyn[0] && wc == this.cmap['a']) {
                            pfwp[j - 1] = this.LA;
                            bt = this.WDBEG;
                            continue;
                        } else if (ppfwc == this.lsyn[3] && wc == this.cmap['a']) {
                            pfwp[j - 1] = this._LA;
                            bt = this.WDBEG;
                            continue;
                        }

                        // update previous character
                        if (ppfwc == tsyn[0]) {
                            pfwp[j - 1] = tsyn[1];
                        } else if (ppfwc == tsyn[3]) {
                            pfwp[j - 1] = tsyn[2];
                        }
                    }
                    bt = syn[4]; // we will need this in next round
                } else { // a non-Uyghur char in basic range
                    pfwc = strArray[i];
                    bt = this.WDBEG;
                }
            } else { // not in basic Arabic range ( 0x0600-0x06FF )

                pfwc = strArray[i];
                bt = this.WDBEG;
            }

            pfwp[j] = pfwc;
            ppfwc = pfwc;
            prevwc = wc;
            j++;
        };
        if (reverse) {
            pfstr = pfwp.reverse().join('')
        } else {
            pfstr = pfwp.join('');
        }
        return pfstr;
    }
    GetUy0600Char(aChar) {
        switch (aChar) {
            case 'ﺏ':
            case 'ﺑ':
            case 'ﺒ':
            case 'ﺐ':
                return "ب";
            case 'ﭖ':
            case 'ﭗ':
            case 'ﭘ':
            case 'ﭙ':
                return "پ";
            case 'ﺕ':
            case 'ﺖ':
            case 'ﺗ':
            case 'ﺘ':
                return "ت";
            case 'ﺝ':
            case 'ﺞ':
            case 'ﺟ':
            case 'ﺠ':
                return "ج";
            case 'ﭺ':
            case 'ﭻ':
            case 'ﭼ':
            case 'ﭽ':
                return "چ";
            case 'ﺩ':
            case 'ﺪ':
                return "د";
            case 'ﺭ':
            case 'ﺮ':
                return "ر";
            case 'ﺯ':
            case 'ﺰ':
                return "ز";
            case 'ﺱ':
            case 'ﺲ':
            case 'ﺳ':
            case 'ﺴ':
                return "س";
            case 'ﺵ':
            case 'ﺶ':
            case 'ﺷ':
            case 'ﺸ':
                return "ش";
            case 'ﻑ':
            case 'ﻒ':
            case 'ﻓ':
            case 'ﻔ':
                return "ف";
            case 'ﻕ':
            case 'ﻖ':
            case 'ﻗ':
            case 'ﻘ':
                return "ق";
            case 'ﻙ':
            case 'ﻚ':
            case 'ﻛ':
            case 'ﻜ':
                return "ك";
            case 'ﮒ':
            case 'ﮓ':
            case 'ﮔ':
            case 'ﮕ':
                return "گ";
            case 'ﯓ':
            case 'ﯔ':
            case 'ﯕ':
            case 'ﯖ':
                return "ڭ";
            case 'ﻝ':
            case 'ﻞ':
            case 'ﻟ':
            case 'ﻠ':
                return "ل";
            case 'ﻡ':
            case 'ﻢ':
            case 'ﻣ':
            case 'ﻤ':
                return "م";
            case 'ﻥ':
            case 'ﻦ':
            case 'ﻧ':
            case 'ﻨ':
                return "ن";
            case 'ﯞ':
            case 'ﯟ':
                return "ۋ";
            case 'ﻱ':
            case 'ﻲ':
            case 'ﻳ':
            case 'ﻴ':
                return "ي";
            case 'ﮊ':
            case 'ﮋ':
                return "ژ";
            case 'ﺥ':
            case 'ﺦ':
            case 'ﺧ':
            case 'ﺨ':
                return "خ";
            case 'ﻍ':
            case 'ﻎ':
            case 'ﻏ':
            case 'ﻐ':
                return "غ";
            case 'ﯪ':
            case 'ﯫ':
                return "ئا";
            case 'ﺍ':
            case 'ﺎ':
                return "ا";
            case 'ﯬ':
            case 'ﯭ':
                return "ئە";
            case 'ﻩ':
            case 'ﻪ':
                return "ە";
            case 'ﯮ':
            case 'ﯯ':
                return "ئو";
            case 'ﻭ':
            case 'ﻮ':
                return "و";
            case 'ﯰ':
            case 'ﯱ':
                return "ئۇ";
            case 'ﯗ':
            case 'ﯘ':
                return "ۇ";
            case 'ﯲ':
            case 'ﯳ':
                return "ئۆ";
            case 'ﯙ':
            case 'ﯚ':
                return "ۆ";
            case 'ﯴ':
            case 'ﯵ':
                return "ئۈ";
            case 'ﯛ':
            case 'ﯜ':
                return "ۈ";
            case 'ﯶ':
            case 'ﯷ':
            case 'ﯸ':
                return "ئې";
            case 'ﯤ':
            case 'ﯥ':
            case 'ﯦ':
            case 'ﯧ':
                return "ې";
            case 'ﯹ':
            case 'ﯺ':
            case 'ﯻ':
                return "ئى";
            case 'ﻯ':
            case 'ﯨ':
            case 'ﯩ':
            case 'ﻰ':
                return "ى";
            case 'ﮪ':
            case 'ﮫ':
            case 'ﮬ':
            case 'ﮭ':
            case 'ﻫ':
            case 'ﻬ':
                return "ھ";
            case 'ﺋ':
            case 'ﺌ':
                return "ئ";
            case 'ﻻ':
            case 'ﻼ':
                return "لا";
            case '−':
                return "-";

        }

        return aChar;
    }
    getUyBRStr(text) {
        if (text) {
            let strArray = text.split(''); //preg_split("//u", str, -1, PREG_SPLIT_NO_EMPTY);
            let n = strArray.length;
            let res = "";
            for (let i = 0; i < n; i++) {
                let wc = strArray[i].codePointAt(0)//hexdec(json_encode(strArray[i]));
                if (wc < 255) {
                    res += strArray[i];

                } else {
                    res += this.GetUy0600Char(strArray[i]);
                }
            }
            return res;
        } else {
            return text;
        }

    }
    getUyULYStr(text) {
        if (!text) {
            return text;
        }
        let uyCharMap = {
            "ئ": "",
            "ا": "a",
            "ە": "e",
            "ې": "e",
            "ى": "i",
            "و": "o",
            "ۇ": "u",
            "ۆ": "o",
            "ۈ": "u",
            "ش": "sh",
            "ڭ": "ng",
            "غ": "gh",
            "چ": "ch",
            "ب": "b",
            "د": "d",
            "ف": "f",
            "گ": "g",
            "ھ": "h",
            "ج": "j",
            "ك": "k",
            "ل": "l",
            "م": "m",
            "ن": "n",
            "پ": "p",
            "ق": "q",
            "ر": "r",
            "س": "s",
            "ت": "t",
            "ۋ": "w",
            "ي": "y",
            "ز": "z",
            "خ": "x",
            "ژ": "J",
            "،": ",",
            "؟": "?",
            "!": "!",
            "؛": ";",
            "(": ")",
            ")": "(",
            " ": " "
        };
        text = text.split('').map(function (char, i) {
            return uyCharMap[char] != null ? uyCharMap[char] : char;
        }).join('')
        return text;
    }
}
let conveter = new UyghurCharUtilities();
console.log(conveter.getUyPFStr('ئىسىل')); //ﻞﯩﺴﯩﺋ
console.log(conveter.getUyULYStr('ياخشىمۇ سىز')); //yaxshimu siz

