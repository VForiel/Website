import type { Locale } from './config';

export const strings: Record<Locale, {
  nav: {
    home: string;
    about: string;
    expertise: string;
    portfolio: string;
    cv: string;
    contact: string;
  };
  headerTagline: string;
}> = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      expertise: 'Expertise',
      portfolio: 'Portfolio',
      cv: 'CV',
      contact: 'Contact',
    },
    headerTagline: 'Doctorant en Astrophotonique',
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      expertise: 'Expertise',
      portfolio: 'Portfolio',
      cv: 'CV',
      contact: 'Contact',
    },
    headerTagline: 'PhD Candidate in Astrophotonics',
  },
};
