import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Acceuil',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  /*{
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Fichier',
    group: true,
  },*/
  {
    title: 'Fichier',
    icon: 'file-outline',
    children: [
      {
        title: 'Sociétés',
        link: '/pages/fichier/societes',
        icon: 'briefcase-outline',
      },
      {
        title: 'Clients',
        link: '/pages/fichier/clients',
        icon: 'award-outline',
      },
      {
        title: 'Fournisseurs',
        link: '/pages/fichier/fournisseurs',
        icon: 'car-outline',
      },
      {
        title: 'Comptes bancaires',
        link: '/pages/fichier/comptes',
        icon: 'activity-outline',
      },
      {
        title: 'echeanciers',
        link: '/pages/fichier/echeanciers',
        icon: 'calendar-outline',
      },
      {
        title: 'tarifs-bancaires',
        link: '/pages/fichier/tarifs-bancaires',
        icon: 'percent-outline',
      },
    ],
  },
  {
    title: 'Factures',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Factures clients',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Factures fournisseurs',
        link: '/pages/forms/layouts',
      },
    ],
  },
  {
    title: 'Saisie tresorerie',
    icon: 'keypad-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Règlements Clients',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Paiements Fournisseurs',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Encaissements',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Décaissements',
        link: '/pages/ui-features/search-fields',
      },
    ],
  },
  {
    title: 'Suivi tresorerie',
    icon: 'browser-outline',
    children: [
      {
        title: 'Rapprochement bancaire',
        link: '/pages/modal-overlays/dialog',
      },
      {
        title: 'Escompte d\'effets',
        link: '/pages/modal-overlays/window',
      },
      {
        title: 'Simulation tréserorie',
        link: '/pages/modal-overlays/popover',
      },
    ],
  },
  {
    title: 'Edition',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Etat previsionnel de banque',
        link: '/pages/extra-components/calendar',
      },
      {
        title: 'Etat de tréserorie previsionnel non engagé',
        link: '/pages/extra-components/progress-bar',
      },
      {
        title: 'Etat de tréserorie previsionnel engagé',
        link: '/pages/extra-components/progress-bar',
      },
      {
        title: 'Etat global de trésereorie',
        link: '/pages/extra-components/progress-bar',
      },
      {
        title: 'Effets à l\'encaissements',
        link: '/pages/extra-components/spinner',
      },
      {
        title: 'Effets à l\'escompte',
        link: '/pages/extra-components/alert',
      },
    ],
  },
  {
    title: 'Gestion de caisse',
    icon: 'map-outline',
    children: [
      {
        title: 'Alimentation',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Dépenses',
        link: '/pages/maps/leaflet',
      },
    ],
  },
];
