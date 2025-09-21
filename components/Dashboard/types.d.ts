import { NavigationScreenProp } from "react-navigation";
import { TripDocument } from "../../types/trip";

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
