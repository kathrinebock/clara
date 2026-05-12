const designTokens = {
  // PRIMITIVES - Base farver
  colors: {
    primitives: {
      red: {
        100: '#FFF2F2',
        200: '#FFE6E6',
        300: '#FFBEBE',
        400: '#FF8C8C',
        500: '#FF5F5F',
        600: '#FF3C3C',
        700: '#8C0000',
        800: '#460019',
        900: '#23000D'
      },
      grey: {
        0: '#FFFFFF',
        100: '#FFFAF7',
        200: '#F7EFEB',
        300: '#F2E7E1',
        400: '#E6D9D2',
        500: '#BFB1AA',
        600: '#998C85',
        700: '#736761',
        800: '#4C433E',
        900: '#26211F',
        1000: '#000000'
      },
      green: {
        100: '#EAFAE8',
        200: '#D2FACD',
        300: '#87EB9B',
        400: '#37D27D',
        500: '#30B66E',
        600: '#289B5F',
        700: '#055523',
        800: '#00280F',
        900: '#001809'
      },
      yellow: {
        100: '#FFFAE5',
        200: '#FFF2C2',
        300: '#FFE696',
        400: '#FFC85A',
        500: '#FDAD44',
        600: '#FA912D',
        700: '#BB4410',
        800: '#550A00',
        900: '#1C0300'
      },
      pink: {
        100: '#FFF2FF',
        200: '#FFE6FF',
        300: '#FFCDFF',
        400: '#FFAAFF',
        500: '#FF80FF',
        600: '#FF55FF',
        700: '#BC2CBC',
        800: '#460F46',
        900: '#1C021C'
      },
      blue: {
        100: '#F2F9FF',
        200: '#E5F2FF',
        300: '#CDEBFF',
        400: '#AADCFF',
        500: '#7AC8FF',
        600: '#4BB4FF',
        700: '#0071C2',
        800: '#002D4B',
        900: '#000F19'
      }
    },
 
    // SEMANTIC TOKENS - Brugt i UI
    semantic: {
      content: {
        default: '#23000D',
        inverted: '#FFFFFF',
        subtle: '#4C433E',
        display: '#460019',
        'display-variant': '#FF3C3C'
      },
      actions: {
        button: {
          'primary-background': '#460019',
          'primary-text': '#FFFFFF',
          'secondary-background': '#FFFAF7',
          'secondary-text': '#460019'
        },
        link: {
          default: '#460019',
          focus: '#BC2CBC'
        }
      },
      border: {
        bold: '#460019',
        subtle: '#E6D9D2',
        focus: '#FF55FF'
      },
      backgrounds: {
        default: '#FFFFFF',
        elevated: '#FFFAF7',
        subdued: '#F7EFEB'
      },
      feedback: {
        success: {
          bold: '#289B5F',
          subtle: '#EAFAE8'
        },
        error: {
          bold: '#8C0000',
          subtle: '#FFF2F2'
        },
        warning: {
          bold: '#FDAD44',
          subtle: '#FFFAE5'
        },
        info: {
          bold: '#26211F',
          subtle: '#F2E7E1'
        }
      },
      overlay: {
        black: {
          10: '#1A16141A',
          50: '#1A161480'
        },
        white: {
          10: '#FFFFFF1A',
          50: '#FFFFFF80'
        }
      }
    }
  },
 
  // SPACING - Afstande mellem elementer
  spacing: {
    tiny: 4,
    xxs: 8,
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
    '4xl': 64
  },
 
  // SIZING - Størrelser
  sizing: {
    tiny: 4,
    xxs: 6,
    xs: 8,
    sm: 10,
    md: 12,
    lg: 14,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    '4xl': 32,
    '5xl': 40,
    '6xl': 48,
    '7xl': 56,
    huge: 64
  },
 
  // FONTS - Typografi
  fonts: {
    'ok-family': 'OK family',
    'fellix': 'Fellix',
    'fallback-ok-family': 'Georgia',
    'fallback-fellix': 'Arial'
  },
 
  // TEXT STYLES - Typografi styles
  textStyles: {
    headings: {
      h1: {
        fontFamily: 'OK family',
        fontWeight: 'Bold',
        fontSize: 40,
        lineHeight: 48,
        letterSpacing: 0
      },
      h2: {
        fontFamily: 'OK family',
        fontWeight: 'Semibold',
        fontSize: 32,
        lineHeight: 40,
        letterSpacing: 0
      },
      h3: {
        fontFamily: 'Fellix',
        fontWeight: 'SemiBold',
        fontSize: 24,
        lineHeight: 32,
        letterSpacing: 0
      },
      h4: {
        fontFamily: 'Fellix',
        fontWeight: 'SemiBold',
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: 0
      }
    },
    body: {
      default: {
        fontFamily: 'Fellix',
        fontWeight: 'Regular',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0
      },
      small: {
        fontFamily: 'Fellix',
        fontWeight: 'Regular',
        fontSize: 14,
        lineHeight: 16,
        letterSpacing: 0
      },
      caption: {
        fontFamily: 'Fellix',
        fontWeight: 'Medium',
        fontSize: 14,
        lineHeight: 16,
        letterSpacing: 0
      }
    },
    actions: {
      'button-small': {
        fontFamily: 'Fellix',
        fontWeight: 'Medium',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0
      },
      'button-large': {
        fontFamily: 'Fellix',
        fontWeight: 'Medium',
        fontSize: 20,
        lineHeight: 'auto',
        letterSpacing: 0
      }
    },
    input: {
      label: {
        fontFamily: 'Fellix',
        fontWeight: 'Medium',
        fontSize: 14,
        lineHeight: 16,
        letterSpacing: 0
      },
      content: {
        fontFamily: 'Fellix',
        fontWeight: 'Medium',
        fontSize: 14,
        lineHeight: 16,
        letterSpacing: 0
      },
      'helper-text': {
        fontFamily: 'Fellix',
        fontWeight: 'Regular',
        fontSize: 12,
        lineHeight: 12,
        letterSpacing: 0
      }
    }
  },
 
  // EFFECTS - Skygger og effekter
  effects: {
    buttons: {
      'drop-shadow': {
        type: 'DROP_SHADOW',
        radius: 8,
        offsetX: 0,
        offsetY: 0,
        color: '#00000033'
      }
    },
    'option-tile': {
      default: {
        type: 'DROP_SHADOW',
        radius: 5,
        offsetX: 0,
        offsetY: 0,
        color: '#00000026'
      }
    }
  }
};

module.exports = designTokens;
