export type MovieDetail = {
  Movies: {
    id: number;
    title: string;
    description: string;
    release_date: string;
    poster_url: string;
    age_rating: number;
    ticket_price: number;
  };
  Studio: StudioProps[];
};

export type StudioProps = {
  ID: number;
  Name: string;
  TimeMovie: Session[];
};

export type Session = {
  id: number;
  time: string;
  type: number;
};

export type ScheduleForm = {
  jam: string;
  studio: string;
};

export type ticketForm = {
  amount: number;
  nomor: number[];
  movie_id: string;
} & ScheduleForm;
