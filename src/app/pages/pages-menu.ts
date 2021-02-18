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
    icon: 'settings-2-outline',
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
        link: '/pages/factures/factures-clients',
		icon: 'file-outline',
      },
      {
        title: 'Factures fournisseurs',
        link: '/pages/factures/factures-fournisseurs',
		icon: 'file-outline',
      },
    ],
  },
  {
    title: 'Gestion commercial',
    icon: 'collapse-outline',
    children: [
      {
        title: 'Produits',
        link: '/pages/gestion-commercial/list-produits',
		icon: 'cube-outline',
      },
      {
        title: 'Bons de livraisons',
       link: '/pages/gestion-commercial/list-bon-livraison',
		    icon: 'clipboard-outline',
      },
      {
        title: 'Factures génerées',
        link: '/pages/gestion-commercial/list-factures',
        icon: 'file-text-outline',
      },
      {
        title: 'Devis',
        link: '/pages/gestion-commercial/list-devis',
        icon: 'file-text-outline',
      },
      {
        title: 'Chiffre affaire',
        link: '/pages/gestion-commercial/chiffre-affaire',
        icon: 'code-download',
      },
    ],
  },
  {
    title: 'Saisie tresorerie',
    icon: 'keypad-outline',
    children: [
      {
        title: 'Règlements Clients',
        link: '/pages/saisie-tresorerie/reglement-client',
        icon: 'arrow-circle-down-outline',
      },
      {
        title: 'Paiements Fournisseurs',
        link: '/pages/saisie-tresorerie/paiement-fournisseur',
        icon: 'arrow-circle-up-outline',
      },
      {
        title: 'Encaissements',
        link: '/pages/saisie-tresorerie/encaissements',
        icon: 'arrow-downward-outline',
      },
      {
        title: 'Décaissements',
        link: '/pages/saisie-tresorerie/decaissements',
        icon: 'arrow-upward-outline',
      },
    ],
  },
  {
    title: 'Rapprochement',
    icon: 'calendar-outline',
    children: [
      {
        title: 'Rapprochement bancaire',
        link: '/pages/suivi-tresorerie/rapprochement-bancaire',
        icon: 'calendar-outline',
      },
      /*
      {
        title: 'Tréserorie previsionnel non engagé',
        link: '/pages/suivi-tresorerie/etat-non-engage',
      },*/
      /*{
        title: 'Tréserorie previsionnel engagé',
        link: '/pages/suivi-tresorerie/etat-engage',
        icon: 'browser-outline',
      },*/
      /*
      {
        title: 'Etat global de trésereorie',
        link: '/pages/suivi-tresorerie/etat-global',
      },*/
      /*
      {
        title: 'Escompte d\'effets',
        link: '/pages/modal-overlays/window',
      },
      {
        title: 'Simulation tréserorie',
        link: '/pages/modal-overlays/popover',
      },*/
    ],
  },
  {
    title: 'Simulation de tresorerie',
    icon: 'activity-outline',
    children: [
      {
        title: 'Etat engagé',
        link: '/pages/suivi-tresorerie/etat-engage',
        icon: 'activity-outline',
      },
      /*
      {
        title: 'Tréserorie previsionnel non engagé',
        link: '/pages/suivi-tresorerie/etat-non-engage',
      },*/
      /*{
        title: 'Tréserorie previsionnel engagé',
        link: '/pages/suivi-tresorerie/etat-engage',
        icon: 'browser-outline',
      },*/
      /*
      {
        title: 'Etat global de trésereorie',
        link: '/pages/suivi-tresorerie/etat-global',
      },*/
      /*
      {
        title: 'Escompte d\'effets',
        link: '/pages/modal-overlays/window',
      },
      {
        title: 'Simulation tréserorie',
        link: '/pages/modal-overlays/popover',
      },*/
    ],
  },
  /*{
    title: 'Edition',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Etat previsionnel de banque',
        link: '/pages/extra-components/calendar',
      },
      {
        title: 'Tréserorie previsionnel non engagé',
        link: '/pages/extra-components/progress-bar',
      },
      {
        title: 'Tréserorie previsionnel engagé',
        link: '/pages/extra-components/progress-bar',
      },
      {
        title: 'Etat global de trésereorie',
        link: '/pages/suivi-tresorerie/etat-global',
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
  },*/
];
