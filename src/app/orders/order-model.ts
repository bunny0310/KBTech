export interface Order {
  _id: string;
  products: Array<{}>;
  delivery_person_id: string;
  order_stage: string;
  user_id: string;
  pickup_locations: Array<string>;
}
