import { z } from "zod";

const LoginSuccessSchema = z.object({
  access_token: z.string(),
});

const LoginErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
});

export const LoginResponseSchema = LoginSuccessSchema.or(LoginErrorSchema);

export const TripSchema = z
  .object({
    tripId: z.number(),
    bikeId: z.number(),
    startTime: z.string().datetime(),
    startStationName: z.string(),
    startStationId: z.number(),
    endTime: z.string().datetime(),
    endStationName: z.string(),
    endStationId: z.number(),
    duration: z.number(),
    price: z.number(),
    open: z.boolean(),
    bikeQrCode: z.string(),
    bike: z.object({
      id: z.number(),
      obcn: z.string(),
      qrCode: z.string(),
      model: z.string(),
      propulsionType: z.string(),
      formFactor: z.string(),
      msnbc: z.string(),
    }),
  })
  .transform((trip) => {
    return {
      id: trip.tripId,
      bikeId: trip.bikeId,
      bikeType:
        trip.bike.propulsionType === "ELECTRIC_ASSIST"
          ? "ELECTRIC"
          : "MECHANICAL",
      startStationId: trip.startStationId,
      startStationName: trip.startStationName,
      startTime: trip.startTime,
      endStationId: trip.endStationId,
      endStationName: trip.endStationName,
      endTime: trip.endTime,
      duration: trip.duration,
      price: trip.price,
    };
  });

export type Trip = z.infer<typeof TripSchema>;
export type EnrichedTrip = Trip & {
  startStationLocation: [number, number];
  endStationLocation: [number, number];
  distance: number;
  elevationGain: number | null;
  speed: number;
};

export type ProcessedTrip = Trip | EnrichedTrip;
export const TripsResponseSchema = z.object({
  tripCount: z.number(),
  trips: z.array(TripSchema),
});

export const ProfileSchema = z.object({
  details: z.object({
    firstname: z.string(),
    lastname: z.string(),
  }),
  plan: z.object({
    planName: z.string(),
  }),
});

export type Station = {
  id: number;
  name: string;
  altitude: number | null;
  location: [number, number];
};
