import OpeningCurtain from '../components/OpeningCurtain';
import WeddingHeroSection from '../components/WeddingHeroSection';
import InvitationCard from '../components/InvitationCard';
import MeetCouple from '../components/MeetCouple';
import LoveStory from '../components/LoveStory';
import FamilySection from '../components/FamilySection';
import MainEvents from '../components/MainEvents';
import BaraatSimulator from '../components/BaraatSimulator';
import PhotoAlbum from '../components/PhotoAlbum';
import VenueSection from '../components/VenueSection';
import FoodSection from '../components/FoodSection';
import RsvpSection from '../components/RsvpSection';
import GuestbookSection from '../components/GuestbookSection';
import FinalCelebration from '../components/FinalCelebration';

/**
 * Wedding Invitation Sections Configuration
 * 
 * Each section is an independent component.
 * Toggle any section on/off with `enabled: true / false` or change the order here!
 */
export const sectionsConfig = [
  // {
  //   id: 'curtains',
  //   name: 'Opening Curtains',
  //   Component: OpeningCurtain,
  //   enabled: true,
  // },
  {
    id: 'hero',
    name: 'Vedic Mandap Hero Scene',
    Component: WeddingHeroSection,
    enabled: true,
  },
  // {
  //   id: 'invitation',
  //   name: 'Invitation Card',
  //   Component: InvitationCard,
  //   enabled: false,
  // },
  // {
  //   id: 'couple',
  //   name: 'Meet The Couple',
  //   Component: MeetCouple,
  //   enabled: false,
  // },
  // {
  //   id: 'story',
  //   name: 'Love Story',
  //   Component: LoveStory,
  //   enabled: false,
  // },
  // {
  //   id: 'family',
  //   name: 'Family Blessings',
  //   Component: FamilySection,
  //   enabled: false,
  // },
  // {
  //   id: 'events',
  //   name: 'Main Events',
  //   Component: MainEvents,
  //   enabled: false,
  // },
  // {
  //   id: 'baraat',
  //   name: 'Baraat Simulator',
  //   Component: BaraatSimulator,
  //   enabled: false,
  // },
  // {
  //   id: 'photos',
  //   name: 'Photo Album',
  //   Component: PhotoAlbum,
  //   enabled: false,
  // },
  // {
  //   id: 'venue',
  //   name: 'Venue & Directions',
  //   Component: VenueSection,
  //   enabled: false,
  // },
  // {
  //   id: 'food',
  //   name: 'Food & Menu',
  //   Component: FoodSection,
  //   enabled: false,
  // },
  // {
  //   id: 'rsvp',
  //   name: 'RSVP Form',
  //   Component: RsvpSection,
  //   enabled: false,
  // },
  // {
  //   id: 'guestbook',
  //   name: 'Guestbook & Blessings',
  //   Component: GuestbookSection,
  //   enabled: false,
  // },
  // {
  //   id: 'celebration',
  //   name: 'Final Celebration & Fireworks',
  //   Component: FinalCelebration,
  //   enabled: false,
  // },
];
