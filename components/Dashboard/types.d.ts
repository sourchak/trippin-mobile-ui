import { TripDocument } from "../../types/documents/collections/trip";
import { NavigationScreenProp } from "react-navigation";

type DashboardProps = {
  navigation: NavigationScreenProp<any, any>;
  route: any;
};

type TopBannerProps = {
  name: string;
};

type TripsProps = {
  id: string;
  navigateToTripDetails: any;
};

type TripProps = {
  trip: TripDocument;
  navigateToTripDetails: any;
};
