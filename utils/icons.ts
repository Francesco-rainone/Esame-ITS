import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRightToCity,
  faArrowsDownToPeople, 
  faBuilding,
  faPaintBrush,
  faBone,
  faDog,
  faScrewdriverWrench,
  faMap,
  faStar,
  faCalendarDays,
  faFileLines,
  faCircleCheck,
  faBullhorn as faPartyHorn,
  faLocationDot,
  faCow,
  faEnvelope,
  faPhone,
  faJar,
  faBirthdayCake,
  faCheckCircle,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export type IconName =
  | "city"
  | "collaboration"
  | "building"
  | "toolbox"
  | "brush"
  | "builder"   
  | "bone"      
  | "dog"     
  | "map"       
  | "star"       
  | "calendar"   
  | "memo"      
  | "check"     
  | "email"      
  | "phone"      
  | "party"      
  | "location"  
  | "cow"       
  | "honey"      
  | "age"   
  | "approve"    
  | "reject"    
  | "delete";    

export const ICON_MAP: Record<IconName, IconDefinition> = {
  city: faArrowRightToCity,
  collaboration: faArrowsDownToPeople,
  building: faBuilding,
  toolbox:  faScrewdriverWrench,
  builder:  faScrewdriverWrench,
  bone:     faBone,
  dog:      faDog,
  brush:    faPaintBrush,
  map:      faMap,
  star:     faStar,
  calendar: faCalendarDays,
  email:    faEnvelope,    
  phone:    faPhone,         
  memo:     faFileLines,
  check:    faCircleCheck,
  party:    faPartyHorn,
  location: faLocationDot,   
  cow:      faCow,          
  honey:    faJar,           
  age:      faBirthdayCake,  
  approve:  faCheckCircle,   
  reject:   faXmark,         
  delete:   faTrash,         
};


export const getIcon = (name: IconName): IconDefinition => {
  return ICON_MAP[name];
};